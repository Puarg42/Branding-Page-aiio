import type { Metadata } from "next";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Company | aiio",
  description:
    "Why aiio exists and how the company advances Organizational Intelligence.",
};

const principles = [
  {
    title: "Understanding before intelligence",
    purpose:
      "Intelligence creates value when it improves how organizations decide and act.",
  },
  {
    title: "Capability before dependency",
    purpose:
      "Technology should help organizations become more capable, not more dependent.",
  },
  {
    title: "Built for the next decade",
    purpose:
      "aiio is building the foundation for the next generation of organizational management.",
  },
] as const;

const companySectionNavigator = [
  { id: "company-hero", label: "Hero" },
  { id: "company-mission", label: "Mission" },
  { id: "company-principles", label: "Principles" },
] as const;

export default function CompanyPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Company"
      heroId="company-hero"
      intro="aiio exists because organizations need a better way to preserve what they know and turn it into durable capability."
      sectionNavigator={companySectionNavigator}
      sectionNavigatorLabel="Company sections"
      title="Why aiio exists."
    >
      <section className="website-architecture-section" id="company-mission">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <p className="website-eyebrow">Mission</p>
            <h2>Organizations need understanding that lasts.</h2>
          </div>
          <div className="website-contact-panel">
            <p>
              Our mission is to make organizational understanding durable and
              usable.
            </p>
            <p>
              The software matters because the capability matters.
            </p>
          </div>
        </div>
      </section>

      <section className="website-architecture-section" id="company-principles">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <p className="website-eyebrow">Principles</p>
            <h2>Principles guide the work.</h2>
          </div>
          <div className="website-architecture-grid">
            {principles.map((principle) => (
              <article className="website-architecture-card" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.purpose}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
