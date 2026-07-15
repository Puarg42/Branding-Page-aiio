/*
 * Provider-neutral lead delivery. Select the transport with LEAD_TRANSPORT:
 *   - "log"    (default) — writes to the server log; good for local/dev.
 *   - "resend" — sends an email via the Resend HTTP API (no SDK dependency).
 *
 * The UI never imports this directly, so swapping providers (SMTP, HubSpot,
 * etc.) means adding a case here — no component changes.
 */

export type LeadRecord = {
  name: string;
  email: string;
  company?: string;
  topic?: string;
  message?: string;
  source?: string;
};

function renderText(lead: LeadRecord): string {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company ? `Company: ${lead.company}` : null,
    lead.topic ? `Topic: ${lead.topic}` : null,
    lead.source ? `Source: ${lead.source}` : null,
    "",
    lead.message ?? "",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

async function sendViaResend(lead: LeadRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_TO;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (!apiKey || !to || !from) {
    throw new Error("Resend transport is missing RESEND_API_KEY / LEAD_NOTIFICATION_TO / LEAD_NOTIFICATION_FROM.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      text: renderText(lead),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}`);
  }
}

/** Deliver a lead notification. Throws on transport failure. */
export async function deliverLead(lead: LeadRecord): Promise<void> {
  const transport = process.env.LEAD_TRANSPORT ?? "log";

  switch (transport) {
    case "resend":
      await sendViaResend(lead);
      return;
    case "log":
    default:
      // Never log the full message body at info level in production dashboards;
      // keep it to the minimum needed to follow up.
      console.info(`[lead] ${lead.name} <${lead.email}> via ${lead.source ?? "unknown"}`);
      return;
  }
}
