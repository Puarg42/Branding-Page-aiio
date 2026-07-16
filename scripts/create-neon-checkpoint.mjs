#!/usr/bin/env node
const projectId = process.env.NEON_PROJECT_ID;
const apiKey = process.env.NEON_API_KEY;

if (!projectId || !apiKey) {
  console.error(
    "NEON_PROJECT_ID and NEON_API_KEY are required. Create a Neon API key, " +
      "set it locally/CI, then rerun npm run db:checkpoint.",
  );
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const name = process.argv[2] || `pre-content-release-${timestamp}`;
const response = await fetch(
  `https://console.neon.tech/api/v2/projects/${projectId}/branches`,
  {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ branch: { name } }),
  },
);

if (!response.ok) {
  console.error(`Neon checkpoint failed (${response.status}): ${await response.text()}`);
  process.exit(1);
}

const result = await response.json();
console.log(`Neon checkpoint created: ${result.branch?.name || name}`);
console.log(`Branch ID: ${result.branch?.id || "unknown"}`);
