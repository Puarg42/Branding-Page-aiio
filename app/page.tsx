import { MainHeader } from "./main-navigation";
import { CapabilityJourney } from "./capability-journey";
import { CategoryEvolution, CeoMondayMoment } from "./category-reinforcement";
import { BrandIllustration } from "../components/brand/BrandIllustration";
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

const intelligenceProgression = [
  "Fragmented context",
  "Organizational self-understanding",
  "Organizational capability",
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

const companyPrinciples = [
  {
    title: "Understanding before Intelligence",
    copy:
      "AI creates value when the organization can interpret its own context.",
  },
  {
    title: "Enable, don't replace",
    copy:
      "Technology should make organizations more capable, not more dependent.",
  },
  {
    title: "Build for the next decade",
    copy:
      "aiio builds the foundation for organizations that understand, decide and improve over time.",
  },
] as const;

function Hero() {
  return (
    <section className="hero">
      <div className="landing-hero-content">
        <h1>The future belongs to organizations that understand themselves.</h1>
        <p className="hero-subheadline">
          Organizations have entered an era where complexity grows faster than human understanding.
          <br />
          aiio enables an organization to continuously understand itself, continuously develop new organizational capabilities and empower every person to make better decisions.
        </p>
        <div className="actions hero-actions" aria-label="Primary actions">
          <a className="button hero-button" href="#organizational-intelligence">
            Explore the system
          </a>
          <a className="button hero-button secondary" href="/live-demo/kontakt">
            Request a demo
          </a>
        </div>
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
        <p className="dark-eyebrow">The problem</p>
        <h2>Organizations know more than they can use.</h2>
        <div className="problem-grid">
          {problemCards.map((card) => (
            <article className="problem-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
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
          <p className="dark-eyebrow">The missing capability</p>
          <h2>Organizations need a shared understanding of how they work.</h2>
          <div className="concept-statement">
            <p>The problem is not missing information.</p>
            <p>It is the absence of organizational self-understanding.</p>
          </div>
          <p className="concept-support">
            When an organization continuously understands itself, it continuously
            develops new capabilities that help people make better decisions.
            This does not mean people simply know more. It means the organization
            itself can continuously interpret its knowledge, decisions, processes
            and capabilities.
          </p>
          <TheoryReference />
        </div>
        <ol
          aria-label="Missing layer progression"
          className="intelligence-progression"
        >
          {intelligenceProgression.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function NewKindOrganization() {
  return (
    <section className="organization-section" id="self-enabling-organization">
      <div className="organization-ambient" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="organization-inner">
        <div className="organization-header">
          <p className="dark-eyebrow">A New Kind of Organization</p>
          <h2>A more capable organization creates better work.</h2>
          <p>Your organization reuses what already exists. Decisions carry context forward. Capability improves with every cycle.</p>
        </div>
        <div className="organization-closing-block">
          <div className="organization-closing-statement">
            Less rework. Faster decisions. Stronger organizational capability.
          </div>
        </div>
        <div className="organization-bottom-statement">
          <p>Self-understanding turns context into coordinated action.</p>
          <p>Coordinated action strengthens resilience.</p>
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
          <h2>This is the Self-Enabling Organization.</h2>
        </div>
      </section>
    </section>
  );
}

function OisArchitecture() {
  return (
    <section className="ois-section" id="architektur">
      <div className="ois-intro">
        <p className="ois-section-title">The System</p>
        <h2>aiio gives self-understanding a system.</h2>
        <div className="ois-body">
          <p>
            The Organizational Intelligence System connects people, processes,
            systems, AI and organizational context into one foundation for
            decisions and action.
          </p>
        </div>
      </div>

      <div
        aria-label="Organizational Intelligence layered architecture"
        className="ois-visual-wrap"
      >
        <BrandIllustration variant="BC-002" />
      </div>

      <div className="ois-bottom-statement">
        <p>The OIS is infrastructure, not another application.</p>
        <p>It helps your organization build capability from every decision.</p>
      </div>
    </section>
  );
}

function CompanyPurpose() {
  return (
    <section className="company-purpose-section" id="company">
      <div className="company-purpose-inner">
        <div className="company-purpose-copy">
          <p className="company-purpose-title">Company</p>
          <h2>Why aiio exists</h2>
          <div>
            <p>
              Organizations should not depend on scattered memory to make important
              decisions.
            </p>
            <p>
              aiio exists to turn organizational self-understanding into a durable
              business capability.
            </p>
            <p>
              The platform turns that capability into better decisions, stronger execution and continuous improvement.
            </p>
          </div>
        </div>
        <div className="company-principles" aria-label="aiio principles">
          {companyPrinciples.map((principle) => (
            <article className="company-principle" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="company-quiet-image" aria-hidden="true">
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
      <ProblemSection />
      <ConceptBreakthrough />
      <NewKindOrganization />
      <CapabilityJourney />
      <OisArchitecture />
      <CeoMondayMoment />
      <CategoryEvolution />
      <CompanyPurpose />
    </main>
  );
}
