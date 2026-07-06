import Link from "next/link";
import { MainHeader } from "./main-navigation";
import { CapabilityJourney } from "./capability-journey";
import { CategoryEvolution, CeoMondayMoment } from "./category-reinforcement";
import { BrandIllustration } from "../components/brand/BrandIllustration";
import {
  EditorialCard,
  EditorialCTAGroup,
  EditorialGrid,
  EditorialNavigation,
  ReferenceMarquee,
  TrustRow,
} from "../components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "../components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "../components/brand/EditorialJumpArrow";
import { TheoryReference } from "../components/brand/TheoryReference";

const problemCards = [
  {
    title: "Complexity outpaces understanding.",
    copy: "More systems, documentation and AI do not automatically create better decisions.",
  },
  {
    title: "Context fragments.",
    copy: "Processes, systems and decisions drift apart as the organization grows.",
  },
  {
    title: "AI remains generic.",
    copy: "Without organizational context, AI cannot support decisions with confidence.",
  },
  {
    title: "Decisions slow down.",
    copy: "Teams rebuild context before they can act.",
  },
] as const;

const imagineMoments = [
  {
    statement: "Imagine an organization that never loses its knowledge.",
    support: "Knowledge stays.",
  },
  {
    statement: "Imagine an organization where context is never lost.",
    support: "Every decision carries memory forward.",
  },
  {
    statement:
      "Imagine an organization that continuously develops new capabilities.",
    support: "Every interaction strengthens it.",
  },
  {
    statement: "Imagine an organization that is resilient by design.",
    support: (
      <>
        Prepared for change.
        <br />
        Ready for the unknown.
      </>
    ),
  },
] as const;

const trustSignals = [
  {
    title: "Enterprise Complexity",
    copy: "For organizations where decisions depend on context, ownership and operational reality.",
  },
  {
    title: "Organizational Intelligence",
    copy: "A category foundation for making organizational context continuously usable.",
  },
  {
    title: "People • Teams • AI",
    copy: "One shared organizational context for humans, teams and intelligent systems.",
  },
] as const;

const trustReferenceLogos = [
  {
    alt: "Media Central",
    src: "/brand/references/media-central.png",
  },
  {
    alt: "WKO",
    src: "/brand/references/wko.svg",
  },
  {
    alt: "Flexoffice",
    src: "/brand/references/flexoffice.svg",
  },
  {
    alt: "HVLE",
    src: "/brand/references/hvle.jpg",
  },
  {
    alt: "thyssenkrupp",
    src: "/brand/references/thyssenkrupp.png",
  },
  {
    alt: "Busch-Jaeger",
    src: "/brand/references/busch-jaeger.svg",
  },
  {
    alt: "ABB",
    src: "/brand/references/abb.png",
  },
  {
    alt: "Euromobil",
    src: "/brand/references/euromobil.svg",
  },
  {
    alt: "Windpunx",
    src: "/brand/references/windpunx.svg",
  },
  {
    alt: "Symacon",
    src: "/brand/references/symacon.png",
  },
  {
    alt: "VTG",
    src: "/brand/references/vtg.png",
  },
  {
    alt: "Volkswagen",
    src: "/brand/references/volkswagen.png",
  },
  {
    alt: "VDE",
    src: "/brand/references/vde.png",
  },
  {
    alt: "Total",
    src: "/brand/references/total.png",
  },
  {
    alt: "De Giradi",
    src: "/brand/references/de-giradi.png",
  },
] as const;

const trustMarqueeRows = [
  trustReferenceLogos.slice(0, 8),
  trustReferenceLogos.slice(8),
] as const;

const homeSectionNavigator = [
  { id: "home-hero", label: "Hero" },
  { id: "monday-morning", label: "Monday" },
  { id: "problem", label: "Problem" },
  { id: "category-evolution", label: "Why Now" },
  { id: "organizational-intelligence", label: "Missing Capability" },
  { id: "capabilities", label: "Journey" },
  { id: "architektur", label: "System" },
  { id: "self-empowering-organization", label: "Outcome" },
  { id: "trust", label: "Trust" },
] as const;

function Hero() {
  return (
    <section className="hero" id="home-hero">
      <div className="landing-hero-content">
        <h1>The future belongs to organizations that understand themselves.</h1>
        <p className="hero-subheadline">
          Organizations have entered an era where complexity grows faster than human understanding.
          <br />
          aiio enables an organization to continuously understand itself, continuously develop new organizational capabilities and empower every person to make better decisions.
        </p>
        <EditorialCTAGroup className="actions hero-actions" ariaLabel="Primary actions">
          <a className="button hero-button" href="#organizational-intelligence">
            Explore the system
          </a>
          <a className="button hero-button secondary" href="/live-demo/kontakt">
            Request a demo
          </a>
        </EditorialCTAGroup>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <BrandIllustration priority variant="BC-001" />
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="problem-section" id="problem">
      <div className="problem-inner">
        <EditorialEyebrow>The Problem</EditorialEyebrow>
        <h2>Organizations know more than they can use.</h2>
        <EditorialGrid className="problem-grid" columns="four">
          {problemCards.map((card) => (
            <EditorialCard className="problem-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </EditorialCard>
          ))}
        </EditorialGrid>
      </div>
      <div className="problem-atmosphere" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function ConceptBreakthrough() {
  return (
    <section className="concept-section" id="organizational-intelligence">
      <div className="concept-inner">
        <div className="concept-copy">
          <EditorialEyebrow>The Missing Capability</EditorialEyebrow>
          <h2>The missing capability is continuous self-understanding.</h2>
          <div className="concept-statement">
            <p>Organizations collect information, document processes and introduce AI.</p>
            <p>Yet they still struggle to turn all of this into coordinated action.</p>
            <p>
              Not because information is missing, but because continuous{" "}
              <TheoryReference>Organizational Self-Understanding</TheoryReference>{" "}
              is.
            </p>
          </div>
          <p className="concept-support">
            This is why the category needs to exist: organizations need a
            foundation that makes context continuously understandable before
            decisions and action depend on scattered memory.
          </p>
        </div>
        <div
          aria-label="More information does not create more understanding"
          className="missing-layer-visual"
        >
          <div className="missing-layer-inputs" aria-label="Existing inputs">
            <span>Information</span>
            <span>Documents</span>
            <span>Processes</span>
            <span>AI</span>
          </div>
          <div className="missing-layer-operator" aria-hidden="true">
            &ne;
          </div>
          <div className="missing-layer-outcome">
            <span>More understanding</span>
            <strong>
              Still no continuous{" "}
              <TheoryReference>Organizational Self-Understanding</TheoryReference>
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewKindOrganization() {
  return (
    <section className="organization-section" id="self-empowering-organization">
      <div className="organization-ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="organization-inner">
        <div className="organization-header">
          <EditorialEyebrow>Outcome</EditorialEyebrow>
          <h2>A more resilient organization creates better work.</h2>
          <p>Your organization makes better decisions, executes with less rework and adapts with more confidence.</p>
        </div>
        <div className="organization-closing-block">
          <div className="organization-closing-statement">
            Less rework. Faster decisions. Stronger organizational capability.
          </div>
        </div>
        <div className="organization-bottom-statement">
          <p>Faster decisions.</p>
          <p>Less rework.</p>
          <p>Stronger execution.</p>
          <p>More resilience.</p>
        </div>
      </div>
    </section>
  );
}

function ImagineFuture() {
  return (
    <section className="imagine-section" id="imagine">
      <p className="imagine-section-title">Imagine...</p>
      {imagineMoments.map((moment) => (
        <section className="imagine-moment" key={moment.statement}>
          <div className="imagine-copy">
            <h2>{moment.statement}</h2>
            <p>{moment.support}</p>
          </div>
        </section>
      ))}
      <section className="imagine-moment imagine-final">
        <div className="imagine-copy">
          <h2>This is the Self-Empowering Organization.</h2>
        </div>
      </section>
    </section>
  );
}

function OisArchitecture() {
  return (
    <section className="ois-section" id="architektur">
      <div className="ois-editorial-layout">
        <div className="ois-intro">
          <div className="home-section-kicker">
            <EditorialEyebrow>The System</EditorialEyebrow>
            <Link className="home-platform-link" href="/platform">
              Platform <EditorialJumpArrow />
            </Link>
          </div>
          <h2>The Organizational Intelligence System gives this capability a place to operate.</h2>
          <div className="ois-body">
            <p>
              It connects organizational reality, context, decisions and action
              into one foundation for continuous capability development.
            </p>
          </div>
        </div>

        <div
          aria-label="Organizational Intelligence layered architecture"
          className="ois-visual-wrap"
        >
          <BrandIllustration variant="BC-002" />
        </div>
      </div>

      <div className="ois-bottom-statement">
        <p>The system is not the destination.</p>
        <p>The outcome is a more capable and resilient organization.</p>
      </div>
    </section>
  );
}

function TrustReferences() {
  return (
    <section className="trust-reference-section" id="trust">
      <div className="trust-reference-inner">
        <div className="trust-reference-copy">
          <EditorialEyebrow>Trust</EditorialEyebrow>
          <h2>
            Trusted by organizations operating in complex, regulated and
            knowledge-intensive environments.
          </h2>
          <p className="trust-reference-lead">
            Organizations across industry, mobility, healthcare, consulting and
            the public sector use aiio to build Organizational Intelligence.
          </p>
        </div>

        <ReferenceMarquee className="trust-reference-marquee" ariaLabel="Enterprise references">
          {trustMarqueeRows.map((row, rowIndex) => (
            <div
              className="trust-reference-marquee-row"
              data-direction={rowIndex === 0 ? "left" : "right"}
              key={rowIndex}
            >
              <div className="trust-reference-marquee-track">
                {[...row, ...row].map((logo, logoIndex) => (
                  <figure
                    aria-hidden={logoIndex >= row.length ? "true" : undefined}
                    className="trust-reference-logo"
                    key={`${rowIndex}-${logo.alt}-${logoIndex}`}
                  >
                    <img
                      alt={logoIndex >= row.length ? "" : logo.alt}
                      loading="lazy"
                      src={logo.src}
                    />
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </ReferenceMarquee>

        <TrustRow className="trust-reference-grid" ariaLabel="Trust foundations">
          {trustSignals.map((signal) => (
            <EditorialCard className="trust-reference-card" key={signal.title}>
              <h3>{signal.title}</h3>
              <p>{signal.copy}</p>
            </EditorialCard>
          ))}
        </TrustRow>
      </div>
      <div className="trust-reference-quiet-image" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <MainHeader />
      <Hero />
      <CeoMondayMoment />
      <ProblemSection />
      <CategoryEvolution />
      <ConceptBreakthrough />
      <CapabilityJourney />
      <OisArchitecture />
      <NewKindOrganization />
      <TrustReferences />
      <EditorialNavigation
        ariaLabel="Home sections"
        sections={homeSectionNavigator}
      />
    </main>
  );
}
