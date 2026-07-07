import type { Metadata } from "next";
import {
  EditorialCard,
  EditorialGrid,
  EditorialSection,
  EditorialSectionHeader,
} from "../../components/brand/BrandCanonFoundation";
import { ExecutiveCTA } from "../../components/brand/ExecutiveCTA";
import { TheoryReference } from "../../components/brand/TheoryReference";
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
      eyebrow="The Purpose"
      heroId="company-hero"
      intro={
        <>
          aiio exists because organizations need a better way to preserve what
          they know and turn it into durable{" "}
          <TheoryReference>Organizational Capabilities</TheoryReference>.
        </>
      }
      sectionNavigator={companySectionNavigator}
      sectionNavigatorLabel="Company sections"
      title="Why aiio exists."
    >
      <EditorialSection
        className="website-architecture-section"
        id="company-mission"
        shellClassName="website-page-shell"
      >
          <EditorialSectionHeader
            className="website-section-heading"
            eyebrow="Mission"
            title="Organizations need understanding that lasts."
          />
          <div className="website-contact-panel">
            <p>
              Our mission is to make organizational understanding durable and
              usable.
            </p>
            <p>
              The software matters because the capability matters.
            </p>
          </div>
      </EditorialSection>

      <EditorialSection
        className="website-architecture-section"
        id="company-principles"
        shellClassName="website-page-shell"
      >
          <EditorialSectionHeader
            className="website-section-heading"
            eyebrow="Principles"
            title="Principles guide the work."
          />
          <EditorialGrid className="website-architecture-grid" columns="three">
            {principles.map((principle) => (
              <EditorialCard className="website-architecture-card" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.purpose}</p>
              </EditorialCard>
            ))}
          </EditorialGrid>
      </EditorialSection>
      <ExecutiveCTA
        copy="Meet the team behind the Organizational Intelligence System."
        headline="Let's shape the future of Organizational Intelligence."
        primary={{ href: "/contact", label: "Contact Us" }}
        secondary={{ href: "/platform", label: "Explore the Platform" }}
      />
    </WebsiteArchitecturePage>
  );
}
