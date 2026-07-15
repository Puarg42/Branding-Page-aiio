import type { Metadata } from "next";
import Link from "next/link";
import { BrandIllustration } from "@/components/brand/BrandIllustration";
import {
  EditorialCTAGroup,
  EditorialNavigation,
  EditorialSection,
  EditorialSectionHeader,
} from "@/components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "@/components/brand/EditorialJumpArrow";
import { MainHeader } from "../main-navigation";

export const metadata: Metadata = {
  alternates: { canonical: "/company" },
  title: "Company | aiio",
  description:
    "The people, principles and institutional foundation behind aiio and Organizational Intelligence.",
};

const companySectionNavigator = [
  { id: "company-hero", label: "Hero" },
  { id: "company-purpose", label: "Purpose" },
  { id: "company-story", label: "Story" },
  { id: "company-belief", label: "Belief" },
  { id: "company-team", label: "Leadership" },
  { id: "company-experts", label: "Expertise" },
  { id: "company-recognition", label: "Recognition" },
  { id: "start", label: "Start" },
] as const;

const storyMilestones = [
  {
    year: "2006",
    label: "Lintra",
    text: "Foundation of structured organizational knowledge and the first discipline for making organizational reality explicit.",
  },
  {
    year: "2015",
    label: "Quam",
    text: "Semantic process intelligence connected processes, structures and governance into a more coherent organizational model.",
  },
  {
    year: "2023",
    label: "aiio",
    text: "Transformation from process software into an Organizational Intelligence System built for continuous self-understanding.",
  },
  {
    year: "2024",
    label: "Series A",
    text: "Institutional growth accelerated the category and strengthened the long-term platform foundation.",
  },
  {
    year: "Today",
    label: "OIS",
    text: "Establishing Organizational Intelligence as a new management discipline for organizations that need to evolve continuously.",
  },
] as const;

const principles = [
  "Organizations should continuously understand themselves.",
  "Knowledge alone does not create intelligence.",
  "Capabilities emerge from connected understanding.",
  "AI requires organizational context.",
  "Continuous understanding creates resilience.",
  "Technology should make organizations more capable, not more dependent.",
] as const;

const leadership = [
  {
    image: "/people/christian-graup.jpg",
    name: "Dr. Christian Graup",
    profile:
      "Christian shapes the category, theory and product direction of aiio. He connects management thinking, platform strategy and the long-term ambition of Organizational Intelligence.",
    responsibility: "Category, theory and product direction",
    role: "Chief Executive Officer",
  },
  {
    image: "/people/knut-koechli.jpg",
    name: "Knut Köchli",
    profile:
      "Knut turns strategy into organizational execution. He focuses on operating discipline, delivery quality and the structures required to scale aiio reliably.",
    responsibility: "Operations, delivery and execution",
    role: "Chief Operating Officer",
  },
  {
    image: "/people/jobst-von-heintze.jpg",
    name: "Jobst von Heintze",
    profile:
      "Jobst develops the market narrative around Organizational Intelligence and translates the category into communication that leaders, partners and customers can understand.",
    responsibility: "Market narrative and category communication",
    role: "Chief Marketing Officer",
  },
  {
    image: "/people/lars-bendler.jpg",
    name: "Lars Bendler",
    profile:
      "Lars builds the partner foundation for Organizational Intelligence. He connects consulting, ecosystem development and customer capability building.",
    responsibility: "Partner ecosystem and capability delivery",
    role: "Chief Partner Officer",
  },
] as const;

const experts = [
  {
    contribution:
      "Contributes expertise in information security, embedded systems and trustworthy technical foundations for complex organizations.",
    expertise: "Information Security & Embedded Systems",
    image: "/people/sebastian-schlesinger.jpg",
    name: "Prof. Dr. Sebastian Schlesinger",
    role: "Expert Panel",
  },
  {
    contribution:
      "Brings go-to-market experience from enterprise software and B2B SaaS to help position Organizational Intelligence as a management category.",
    expertise: "B2B SaaS, enterprise markets and category development",
    image: "/people/edmund-frey.jpg",
    name: "Edmund Frey",
    role: "Expert Panel",
  },
  {
    contribution:
      "Adds investor, M&A and private-equity perspective on how durable organizational capability becomes long-term enterprise value.",
    expertise: "M&A, investment and enterprise value creation",
    image: "/people/oliver-sauer.jpg",
    name: "Oliver Sauer",
    role: "Expert Panel",
  },
  {
    contribution:
      "René Leitgen contributes expertise in organizational resilience, adaptive leadership and sustainable transformation. His perspective strengthens Organizational Intelligence by addressing how organizations remain capable of acting under continuous change, uncertainty and increasing complexity.",
    expertise: "Resilience & Adaptive Leadership",
    image: "/people/rene-leitgen.jpg",
    name: "René Leitgen",
    role: "Expert Panel",
  },
] as const;

const awards = [
  {
    alt: "CHIP Leading Software 2024 for aiio",
    image: "/awards/chip-leading-software-2024-aiio.svg",
    label: "CHIP Leading Software 2024",
  },
  {
    alt: "CHIP Leading Software 2025 for aiio",
    image: "/awards/chip-leading-software-2025-aiio.svg",
    label: "CHIP Leading Software 2025",
  },
  {
    alt: "KI Bundesverband",
    image: "/brand/references/ki-bundesverband-footer.png",
    label: "KI Bundesverband",
    meta: "Mitglied seit 2024",
  },
] as const;

export default function CompanyPage() {
  return (
    <main className="company-executive-page">
      <MainHeader />

      <section className="company-executive-hero editorial-hero" id="company-hero">
        <div className="company-executive-shell">
          <BrandIllustration
            className="company-hero-visual"
            decorative={false}
            interactive
            priority
            variant="COMPANY-OI"
          />
          <h1>Building the future of Organizational Intelligence.</h1>
          <p>
            aiio exists to help organizations continuously understand
            themselves, transform knowledge into capability and remain resilient
            in an increasingly complex world.
          </p>
        </div>
      </section>

      <EditorialSection
        className="company-executive-section company-purpose-narrative"
        id="company-purpose"
        shellClassName="company-executive-shell"
      >
        <EditorialSectionHeader
          className="company-executive-heading"
          eyebrow="Our Purpose"
          title="Why aiio exists."
          lead="Organizations have entered an era where complexity grows faster than human understanding."
        />
        <div className="company-purpose-statement">
          <p>Organizational Intelligence is our answer.</p>
          <p>This is not about software.</p>
          <p>
            This is about enabling organizations to continuously understand
            themselves, develop new capabilities and act with more confidence
            under change.
          </p>
        </div>
      </EditorialSection>

      <EditorialSection
        className="company-executive-section company-story-section"
        id="company-story"
        shellClassName="company-executive-shell"
      >
        <EditorialSectionHeader
          className="company-executive-heading"
          eyebrow="Our Story"
          title={
            <>
              From Process Management
              <br />
              to Organizational Intelligence.
            </>
          }
          lead="aiio did not begin with a generic software idea. It emerged from years of working with the structures, processes and realities that make organizations understandable."
        />
        <ol className="company-story-timeline">
          {storyMilestones.map((milestone) => (
            <li key={`${milestone.year}-${milestone.label}`}>
              <span>{milestone.year}</span>
              <h3>{milestone.label}</h3>
              <p>{milestone.text}</p>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <EditorialSection
        className="company-executive-section company-belief-section"
        id="company-belief"
        shellClassName="company-executive-shell"
      >
        <EditorialSectionHeader
          className="company-executive-heading"
          eyebrow="Our Belief"
          title="The principles that guide us."
        />
        <div className="company-principles-list">
          {principles.map((principle, index) => (
            <article key={principle}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        className="company-executive-section company-team-section"
        id="company-team"
        shellClassName="company-executive-shell"
      >
        <EditorialSectionHeader
          className="company-executive-heading"
          eyebrow="Leadership"
          title="The executive management behind aiio."
          lead="The leadership team connects category creation, operating discipline, market development and partner enablement into one institutional direction."
        />
        <div className="company-leadership-grid">
          {leadership.map((person) => (
            <article className="company-leadership-card" key={person.name}>
              <div
                aria-label={`${person.name} portrait`}
                className="company-expert-portrait company-leadership-portrait"
                role="img"
                style={{ backgroundImage: `url(${person.image})` }}
              />
              <div className="company-leadership-copy">
                <span>{person.role}</span>
                <h3>{person.name}</h3>
                <p className="company-expert-field">{person.responsibility}</p>
                <p>{person.profile}</p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        className="company-executive-section company-expert-section"
        id="company-experts"
        shellClassName="company-executive-shell"
      >
        <EditorialSectionHeader
          className="company-executive-heading"
          eyebrow="Shaping Organizational Intelligence"
          title="Organizational Intelligence is built through interdisciplinary expertise."
          lead="The Expert Panel brings scientific, strategic, market and resilience perspectives into one shared management discipline."
        />
        <div className="company-expert-list">
          {experts.map((expert) => (
            <article className="company-expert-profile" key={expert.name}>
              <div
                aria-label={`${expert.name} portrait`}
                className="company-expert-portrait"
                role="img"
                style={{ backgroundImage: `url(${expert.image})` }}
              />
              <div className="company-expert-copy">
                <span>{expert.role}</span>
                <h3>{expert.name}</h3>
                <p className="company-expert-field">{expert.expertise}</p>
                <p>{expert.contribution}</p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection
        className="company-executive-section company-recognition-section"
        id="company-recognition"
        shellClassName="company-executive-shell"
      >
        <EditorialSectionHeader
          className="company-executive-heading"
          eyebrow="Recognition"
          title="Trusted by organizations shaping the future."
          lead="aiio is shaped with organizations, partners and expert communities that operate in complex, regulated and knowledge-intensive environments."
        />
        <div className="company-recognition-proof">
          {awards.map((award) => (
            <figure key={award.label}>
              <img alt={award.alt} loading="lazy" src={award.image} />
              <figcaption>
                <span>{award.label}</span>
                {"meta" in award ? <small>{award.meta}</small> : null}
              </figcaption>
            </figure>
          ))}
          <article>
            <span>International reach</span>
            <p>
              aiio works with organizations and partners across enterprise,
              consulting, industry, public sector and transformation contexts.
            </p>
          </article>
        </div>
      </EditorialSection>

      <section className="company-journey-cta" id="start">
        <div className="company-executive-shell">
          <EditorialEyebrow>Join the Journey</EditorialEyebrow>
          <h2>Help shape the future of Organizational Intelligence.</h2>
          <EditorialCTAGroup className="company-journey-actions" ariaLabel="Company actions">
            <Link className="button hero-button" href="/live-demo/kontakt">
              Request a conversation <EditorialJumpArrow />
            </Link>
            <Link className="button hero-button secondary" href="/partners">
              Become a Partner <EditorialJumpArrow />
            </Link>
            <Link className="button hero-button secondary" href="/contact">
              Careers <EditorialJumpArrow />
            </Link>
            <Link className="button hero-button secondary" href="/contact">
              Contact <EditorialJumpArrow />
            </Link>
          </EditorialCTAGroup>
        </div>
      </section>

      <EditorialNavigation
        ariaLabel="Company sections"
        sections={companySectionNavigator}
      />
    </main>
  );
}
