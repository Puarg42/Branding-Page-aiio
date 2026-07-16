import { assertLocale } from "@/lib/i18n/config";

type Context = { params: Promise<{ locale: string }> };

export async function GET(_request: Request, context: Context) {
  const locale = assertLocale((await context.params).locale);
  const text =
    locale === "de"
      ? `# aiio

Sprache: Deutsch
Kategorie: Organizational Intelligence

aiio hilft Organisationen, sich kontinuierlich selbst zu verstehen, Fähigkeiten aufzubauen und resilienter zu werden.

Wichtige Bereiche:
- /de — Start
- /de/plattform — Plattform
- /de/denken — Denken und Theorie
- /de/blog — Veröffentlichungen
- /de/gespraech — Kontakt
`
      : `# aiio

Language: English
Category: Organizational Intelligence

aiio helps organizations continuously understand themselves, build capabilities and become more resilient.

Key areas:
- /en — Home
- /en/platform — Platform
- /en/thinking — Thinking and theory
- /en/blog — Publications
- /en/conversation — Contact
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
