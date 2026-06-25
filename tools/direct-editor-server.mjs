import { createServer } from "node:http";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const port = Number.parseInt(process.env.AIIO_EDITOR_PORT ?? "4179", 10);
const contentPath = resolve(process.cwd(), "app/editor/content-store.json");
const versionPath = resolve(process.cwd(), "app/editor/content-version.ts");
const allowedKeyPattern = /^(about|footer|home|layer|navigation|resource)\.[a-z0-9.-]+$/;

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

async function readStore() {
  const raw = await readFile(contentPath, "utf8");
  return JSON.parse(raw);
}

async function writeStore(store) {
  await writeFile(contentPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

async function writeContentVersion() {
  const version = new Date().toISOString();
  await writeFile(
    versionPath,
    `export const editableContentVersion = ${JSON.stringify(version)};\n`,
    "utf8",
  );
}

createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (request.method === "POST" && request.url === "/save") {
    try {
      const chunks = [];

      for await (const chunk of request) {
        chunks.push(chunk);
      }

      const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      const changes = body.changes;

      if (!changes || typeof changes !== "object" || Array.isArray(changes)) {
        sendJson(response, 400, { error: "changes object is required" });
        return;
      }

      const store = await readStore();
      const rejected = Object.keys(changes).filter((key) => !allowedKeyPattern.test(key));

      if (rejected.length > 0) {
        sendJson(response, 400, { error: "unknown content key format", rejected });
        return;
      }

      for (const [key, value] of Object.entries(changes)) {
        if (typeof value !== "string") {
          sendJson(response, 400, { error: `value for ${key} must be a string` });
          return;
        }

        store[key] = value;
      }

      await writeStore(store);
      await writeContentVersion();
      sendJson(response, 200, { ok: true, saved: Object.keys(changes) });
    } catch (error) {
      sendJson(response, 500, {
        error: error instanceof Error ? error.message : "unknown error",
      });
    }

    return;
  }

  sendJson(response, 404, { error: "not found" });
}).listen(port, "127.0.0.1", () => {
  console.log(`aiio direct editor save server listening on http://127.0.0.1:${port}`);
});
