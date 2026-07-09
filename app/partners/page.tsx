import type { Metadata } from "next";
import Link from "next/link";
import { BrandIllustration } from "../../components/brand/BrandIllustration";
import { EditorialEyebrow } from "../../components/brand/EditorialEyebrow";
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
      "Guide organizations as decision quality, Organizational Self-Empowering and resilience become operating principles.",
  },
] as const;

const partnersSectionNavigator = [
  { id: "partners-hero", label: "Hero" },
  { id: "partners-ecosystem", label: "Ecosystem" },
  { id: "partners-conversation", label: "Conversation" },
] as const;

export default function PartnersPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Partners"
      heroId="partners-hero"
      heroVisual={
        <BrandIllustration
          className="partners-hero-visual"
          decorative={false}
          interactive
          priority
          variant="BC-008"
        />
      }
      intro="Partners help turn Organizational Intelligence into lasting customer capability."
      sectionNavigator={partnersSectionNavigator}
      sectionNavigatorLabel="Partners sections"
      title="Help organizations build lasting capability."
    >
      <section className="website-architecture-section" id="partners-ecosystem">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <EditorialEyebrow>Partner Ecosystem</EditorialEyebrow>
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

      <section className="website-contact-section" id="partners-conversation">
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
