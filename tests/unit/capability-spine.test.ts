import { describe, expect, it } from "vitest";
import { capabilitySpine } from "../../content/capability-spine";

describe("capabilitySpine", () => {
  it("has exactly four levels", () => {
    expect(capabilitySpine).toHaveLength(4);
  });

  it("uses a unique tone per step", () => {
    const tones = new Set(capabilitySpine.map((step) => step.tone));
    expect(tones.size).toBe(capabilitySpine.length);
  });

  it("labels levels sequentially", () => {
    capabilitySpine.forEach((step, index) => {
      expect(step.level).toBe(`Level ${index + 1}`);
    });
  });

  it("names a product for every step", () => {
    for (const step of capabilitySpine) {
      expect(step.product).toBeTruthy();
    }
  });
});
