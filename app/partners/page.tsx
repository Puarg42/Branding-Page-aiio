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
    purpose: (
      <>
        Guide organizations as decision quality,{" "}
        <TheoryReference>Organizational Self-Empowering</TheoryReference> and
        resilience become operating principles.
      </>
    ),
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
      eyebrow="The Ecosystem"
      heroId="partners-hero"
      intro={
        <>
          Partners help turn{" "}
          <TheoryReference>Organizational Intelligence</TheoryReference> into
          lasting customer capability.
        </>
      }
      sectionNavigator={partnersSectionNavigator}
      sectionNavigatorLabel="Partners sections"
      title="Help organizations build lasting capability."
    >
      <EditorialSection
        className="website-architecture-section"
        id="partners-ecosystem"
        shellClassName="website-page-shell"
      >
          <EditorialSectionHeader
            className="website-section-heading"
            eyebrow="Partner Ecosystem"
            title="Partners become capability builders."
          />
          <EditorialGrid className="website-architecture-grid" columns="three">
            {partnerRoles.map((role) => (
              <EditorialCard className="website-architecture-card" key={role.title}>
                <h3>{role.title}</h3>
                <p>{role.purpose}</p>
              </EditorialCard>
            ))}
          </EditorialGrid>
      </EditorialSection>

      <ExecutiveCTA
        copy="Become part of the Organizational Intelligence ecosystem."
        headline="Build Organizational Intelligence together."
        id="partners-conversation"
        primary={{ href: "/live-demo/kontakt", label: "Become a Partner" }}
        secondary={{ href: "/contact", label: "Contact Us" }}
      />
    </WebsiteArchitecturePage>
  );
}
