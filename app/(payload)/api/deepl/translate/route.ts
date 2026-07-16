import config from "@payload-config";
import { getPayload } from "payload";

const MAX_TEXT_LENGTH = 100_000;

function endpoint(apiKey: string) {
  if (process.env.DEEPL_API_URL) {
    return `${process.env.DEEPL_API_URL.replace(/\/$/, "")}/v2/translate`;
  }
  return apiKey.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";
}

export async function POST(request: Request) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({
    headers: request.headers,
    canSetHeaders: false,
  });
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "DeepL is not configured. Add DEEPL_API_KEY in Vercel." },
      { status: 503 },
    );
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const body = input as {
    text?: unknown;
    targetLocale?: unknown;
    field?: unknown;
  };
  if (
    typeof body.text !== "string" ||
    body.text.trim().length === 0 ||
    body.text.length > MAX_TEXT_LENGTH
  ) {
    return Response.json(
      { error: `Text must contain 1–${MAX_TEXT_LENGTH} characters.` },
      { status: 400 },
    );
  }
  if (body.targetLocale !== "en" && body.targetLocale !== "de") {
    return Response.json({ error: "Unsupported target locale" }, { status: 400 });
  }

  const targetLang = body.targetLocale === "de" ? "DE" : "EN-US";
  const response = await fetch(endpoint(apiKey), {
    method: "POST",
    headers: {
      authorization: `DeepL-Auth-Key ${apiKey}`,
      "content-type": "application/json",
      "user-agent": "aiio-website/1.0",
    },
    body: JSON.stringify({
      text: [body.text],
      target_lang: targetLang,
      preserve_formatting: true,
      context:
        "Website content for aiio, a B2B Organizational Intelligence platform. Preserve the brand name aiio in lowercase.",
    }),
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    const retryAfter = response.headers.get("retry-after");
    const status =
      response.status === 429 ? 429 : response.status >= 500 ? 502 : 400;
    return Response.json(
      {
        error:
          response.status === 429
            ? `DeepL rate limit reached${retryAfter ? `; retry after ${retryAfter}s` : ""}.`
            : `DeepL translation failed (${response.status}).`,
      },
      { status },
    );
  }

  const result = (await response.json()) as {
    translations?: Array<{
      text?: string;
      detected_source_language?: string;
    }>;
  };
  const translation = result.translations?.[0];
  if (!translation?.text) {
    return Response.json(
      { error: "DeepL returned no translation." },
      { status: 502 },
    );
  }

  return Response.json({
    text: translation.text,
    detectedSourceLanguage: translation.detected_source_language,
  });
}
