import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Unit tests only; Playwright e2e specs live under tests/e2e and run via
    // `npm run test:e2e`.
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
  },
});
