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

export default function CompanyPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Company"
      intro="aiio exists because organizations need a better way to preserve what they know and turn it into durable capability."
      title="Why aiio exists."
    >
      <section className="website-architecture-section">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <p className="website-eyebrow">Mission</p>
            <h2>
              We are helping define the next generation of organizational
              management.
            </h2>
          </div>
          <div className="website-contact-panel">
            <p>
              Our mission is to make organizational understanding durable,
              usable and capable of improving how organizations act.
            </p>
            <p>
              The software matters because the capability matters.
            </p>
          </div>
        </div>
      </section>

      <section className="website-architecture-section">
        <div className="website-page-shell">
          <div className="website-section-heading">
            <p className="website-eyebrow">Principles</p>
            <h2>What guides aiio.</h2>
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
