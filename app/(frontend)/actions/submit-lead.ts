"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { leadSchema } from "@/lib/leads/schema";
import { deliverLead } from "@/lib/leads/transport";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "consent", string>>;
};

export const initialLeadState: LeadState = { status: "idle" };

const CONSENT_TEXT =
  "I agree that aiio may contact me about my request. I can withdraw consent at any time.";

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: bots fill hidden fields. Pretend success without doing anything.
  if (String(formData.get("company_url") ?? "").length > 0) {
    return { status: "success", message: "Thank you — we will be in touch." };
  }

  const parsed = leadSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") || undefined,
    topic: formData.get("topic") || undefined,
    message: formData.get("message") || undefined,
    consent: formData.get("consent") === "on",
    source: formData.get("source") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: LeadState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "consent") {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  const lead = parsed.data;
  let persisted = false;
  let delivered = false;

  // Persist (best-effort): keep the form working even before the database is
  // provisioned. overrideAccess is required because public REST create is off.
  try {
    const payload = await getPayload({ config });
    await payload.create({
      collection: "leads",
      overrideAccess: true,
      data: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        topic: lead.topic,
        message: lead.message,
        source: lead.source,
        consent: true,
        consentText: CONSENT_TEXT,
      },
    });
    persisted = true;
  } catch (error) {
    console.error("[lead] persistence failed:", error);
  }

  try {
    await deliverLead(lead);
    delivered = true;
  } catch (error) {
    console.error("[lead] delivery failed:", error);
  }

  if (!persisted && !delivered) {
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again or email info@aiio.de.",
    };
  }

  return {
    status: "success",
    message: "Thank you — we will be in touch shortly.",
  };
}
