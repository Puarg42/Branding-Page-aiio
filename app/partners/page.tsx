import type { Metadata } from "next";
import Link from "next/link";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Partners | aiio",
  description:
    "The partner architecture for organizations building Organizational Intelligence.",
};

const partnerRoles = [
  {
    title: "Develop understanding",
    purpose:
      "Help organizations turn fragmented knowledge into shared Organizational Understanding.",
  },
  {
    title: "Build capabilities",
    purpose:
      "Enable customers to move from temporary projects toward continuously improving organizational capabilities.",
  },
  {
    title: "Support evolution",
    purpose:
      "Guide organizations as decision quality, resilience and self-enablement become operating principles.",
  },
] as const;

export default function PartnersPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Partners"
      intro="Organizational Intelligence creates a new partner opportunity: helping customers build durable capability instead of isolated project outcomes."
      title="Build the capability era with aiio."
    >
      <section className="website-architecture-section">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <p className="website-eyebrow">Partner Ecosystem</p>
            <h2>Partners become capability builders.</h2>
          </div>
          <div className="website-architecture-grid">
            {partnerRoles.map((role) => (
              <article className="website-architecture-card" key={role.title}>
                <h3>{role.title}</h3>
                <p>{role.purpose}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="website-contact-section">
        <div className="website-page-shell">
          <div className="website-contact-panel">
            <p>
              Partnership with aiio means helping organizations turn strategic
              ambition into lasting capability.
            </p>
            <Link className="website-final-button" href="/contact">
              Start a partner conversation
            </Link>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
