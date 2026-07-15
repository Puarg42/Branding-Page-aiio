import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverLead } from "../../lib/leads/transport";

const lead = { name: "Ada", email: "ada@example.com", source: "/live-demo/kontakt" };

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.LEAD_TRANSPORT;
  delete process.env.RESEND_API_KEY;
});

describe("deliverLead", () => {
  it("logs and resolves with the default (log) transport", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    await expect(deliverLead(lead)).resolves.toBeUndefined();
    expect(info).toHaveBeenCalledOnce();
  });

  it("throws when the resend transport is misconfigured", async () => {
    process.env.LEAD_TRANSPORT = "resend";
    await expect(deliverLead(lead)).rejects.toThrow();
  });
});
