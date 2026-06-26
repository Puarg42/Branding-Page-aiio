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
      "Artificial Intelligence creates value only when it is grounded in organizational understanding.",
  },
  {
    title: "Capability before dependency",
    purpose:
      "Technology should enable organizations to develop their own understanding, decisions and capabilities.",
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
      intro="aiio exists because organizations deserve the ability to continuously understand themselves. The defining challenge of the coming decade is no longer digitalization. It is Organizational Intelligence."
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
              Our mission is to develop the first Organizational Intelligence
              System that enables organizations to continuously improve
              understanding, decisions and capabilities.
            </p>
            <p>
              We are building software. But more importantly, we are building a
              way for organizations to become more capable over time.
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
