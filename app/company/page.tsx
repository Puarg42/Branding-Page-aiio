import type { Metadata } from "next";
import Link from "next/link";
import { BrandIllustration } from "../../components/brand/BrandIllustration";
import {
  EditorialCTAGroup,
  EditorialGrid,
  EditorialNavigation,
  EditorialSection,
  EditorialSectionHeader,
  ReferenceMarquee,
} from "../../components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "../../components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "../../components/brand/EditorialJumpArrow";
import { MainHeader } from "../main-navigation";

export const metadata: Metadata = {
  title: "Company | aiio",
  description:
    "The people, principles and institutional foundation behind aiio and Organizational Intelligence.",
};

const companySectionNavigator = [
  { id: "company-hero", label: "Hero" },
  { id: "company-purpose", label: "Purpose" },
  { id: "company-story", label: "Story" },
  { id: "company-belief", label: "Belief" },
  { id: "company-experts", label: "Expertise" },
  { id: "company-team", label: "Team" },
  { id: "company-recognition", label: "Recognition" },
  { id: "start", label: "Start" },
] as const;

const storyMilestones = [
  {
    label: "Lintra",
    text: "Process expertise became the foundation for making organizations more understandable.",
  },
  {
    label: "Quam",
    text: "Process management matured into structured organizational modeling and governance.",
  },
  {
    label: "aiio",
    text: "The company shifted from process software toward Organizational Intelligence.",
  },
  {
    label: "Organizational Intelligence System",
    text: "The platform now connects understanding, capability development and resilience.",
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

const experts = [
  {
    contribution:
      "Shapes the theoretical foundation of Organizational Intelligence and the link between management discipline, platform architecture and business value.",
    expertise: "Organizational Intelligence, product strategy and management systems",
    image: "/people/christian-graup.jpg",
    name: "Dr. Christian Graup",
    role: "Founder & CEO",
  },
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
    image: null,
    name: "René Leitgen",
    role: "Expert Panel",
  },
] as const;

const teamDisciplines = [
  "Leadership",
  "Software engineering",
  "Organizational science",
  "Artificial intelligence",
  "Consulting",
] as const;

const recognitionLogos = [
  { alt: "Media Central", key: "media-central", src: "/brand/references/media-central.png" },
  { alt: "WKO", key: "wko", src: "/brand/references/wko.svg" },
  { alt: "thyssenkrupp", key: "thyssenkrupp", src: "/brand/references/thyssenkrupp.png" },
  { alt: "ABB", key: "abb", src: "/brand/references/abb.png" },
  { alt: "Volkswagen", key: "volkswagen", src: "/brand/references/volkswagen.png" },
  { alt: "VDE", key: "vde", src: "/brand/references/vde.png" },
  { alt: "Euromobil", key: "euromobil", src: "/brand/references/euromobil.svg" },
  { alt: "VTG", key: "vtg", src: "/brand/references/vtg.png" },
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
] as const;

function CompanyReferenceMarquee() {
  return (
    <ReferenceMarquee className="company-reference-marquee" ariaLabel="Selected aiio references">
      <div className="company-reference-marquee-row">
        <div className="company-reference-marquee-track">
          {Array.from({ length: 3 }, (_, setIndex) => (
            <div className="company-reference-marquee-set" key={setIndex}>
              {recognitionLogos.map((logo) => (
                <figure
                  className="company-reference-logo"
                  data-logo={logo.key}
                  key={`${setIndex}-${logo.alt}`}
                >
                  <img alt={logo.alt} loading="lazy" src={logo.src} />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ReferenceMarquee>
  );
}

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
            variant="BC-007"
          />
          <EditorialEyebrow>Company</EditorialEyebrow>
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
          {storyMilestones.map((milestone, index) => (
            <li key={milestone.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
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
                aria-hidden={!expert.image}
                aria-label={expert.image ? `${expert.name} portrait` : undefined}
                className={`company-expert-portrait${expert.image ? "" : " is-placeholder"}`}
                role={expert.image ? "img" : undefined}
                style={expert.image ? { backgroundImage: `url(${expert.image})` } : undefined}
              >
                {!expert.image ? <span>{expert.name.split(" ").map((part) => part[0]).join("")}</span> : null}
              </div>
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
        className="company-executive-section company-team-section"
        id="company-team"
        shellClassName="company-executive-shell"
      >
        <EditorialSectionHeader
          className="company-executive-heading"
          eyebrow="Leadership & Team"
          title="Building Organizational Intelligence together."
          lead="The work connects leadership, engineering, organizational science, AI and consulting into one shared discipline."
        />
        <div className="company-team-composition">
          <div>
            <span>Leadership</span>
            <strong>Direction, category and long-term institutional focus.</strong>
          </div>
          <div>
            <span>Core Team</span>
            <strong>Engineering, product, AI, consulting and customer learning.</strong>
          </div>
        </div>
        <EditorialGrid className="company-discipline-grid" columns="auto">
          {teamDisciplines.map((discipline) => (
            <article key={discipline}>
              <span>{discipline}</span>
            </article>
          ))}
        </EditorialGrid>
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
        <CompanyReferenceMarquee />
        <div className="company-recognition-proof">
          {awards.map((award) => (
            <figure key={award.label}>
              <img alt={award.alt} loading="lazy" src={award.image} />
              <figcaption>{award.label}</figcaption>
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
              Request a Demo <EditorialJumpArrow />
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
