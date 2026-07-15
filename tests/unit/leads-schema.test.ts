import { describe, expect, it } from "vitest";
import { leadSchema } from "../../lib/leads/schema";

describe("leadSchema", () => {
  it("accepts a valid submission", () => {
    const result = leadSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
      consent: true,
    });
    expect(result.success).toBe(true);
  });

  it("requires a name", () => {
    const result = leadSchema.safeParse({ name: "", email: "a@b.com", consent: true });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = leadSchema.safeParse({ name: "A", email: "not-an-email", consent: true });
    expect(result.success).toBe(false);
  });

  it("requires explicit consent", () => {
    const result = leadSchema.safeParse({ name: "A", email: "a@b.com", consent: false });
    expect(result.success).toBe(false);
  });

  it("trims and allows optional fields to be omitted", () => {
    const result = leadSchema.safeParse({ name: "  A  ", email: "a@b.com", consent: true });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("A");
  });
});
