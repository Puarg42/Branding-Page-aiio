import { MainHeader } from "./main-navigation";
import { CapabilityJourney } from "./capability-journey";
import { CategoryEvolution, CeoMondayMoment } from "./category-reinforcement";
import { BrandIllustration } from "../components/brand/BrandIllustration";
import { TheoryReference } from "../components/brand/TheoryReference";

const problemCards = [
  {
    title: "Knowledge disappears.",
    copy: "Critical context leaves with people, projects and tools.",
  },
  {
    title: "AI lacks context.",
    copy: "Answers remain generic when they are not grounded in the organization.",
  },
  {
    title: "Complexity costs.",
    copy: "Processes, systems and decisions drift apart as the organization grows.",
  },
  {
    title: "Decisions slow down.",
    copy: "Teams spend too much time reconstructing what the organization already knows.",
  },
] as const;

const intelligenceProgression = [
  "Fragmented knowledge",
  "Connected context",
  "Shared meaning",
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
      "AI creates value when it is grounded in how the organization actually works.",
  },
  {
    title: "Enable, don't replace",
    copy:
      "Technology should make organizations more capable, not more dependent.",
  },
  {
    title: "Build for the next decade",
    copy:
      "aiio builds the foundation for organizations that learn, adapt and evolve over time.",
  },
] as const;

function Hero() {
  return (
    <section className="hero">
      <div className="landing-hero-content">
        <h1>The future belongs to organizations that understand themselves.</h1>
        <p className="hero-subheadline">
          aiio turns scattered organizational knowledge into a shared basis for better decisions.
          <br />
          So leaders, teams and AI can act with the same context.
        </p>
        <div className="actions hero-actions" aria-label="Primary actions">
          <a className="button hero-button" href="#organizational-intelligence">
            See the system
          </a>
          <a className="button hero-button secondary" href="/live-demo/kontakt">
            See it in action
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
        <h2>Organizations are losing themselves.</h2>
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
          <p className="dark-eyebrow">The missing layer</p>
          <h2>Business value begins with shared understanding.</h2>
          <div className="concept-statement">
            <p>More information does not improve decisions.</p>
            <p>Connected context does.</p>
          </div>
          <p className="concept-support">
            Organizational Intelligence creates the context layer that makes
            knowledge usable for people, AI and enterprise systems.
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
          <h2>Use what your organization already knows.</h2>
          <p>Less rework. Faster decisions. Stronger organizational capability.</p>
        </div>
        <div className="organization-closing-block">
          <div className="organization-closing-statement">
            Shared context turns existing knowledge into business value.
          </div>
        </div>
        <div className="organization-bottom-statement">
          <p>Better use of knowledge creates better decisions.</p>
          <p>Better decisions create stronger capability.</p>
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
        <p className="ois-section-title">The Platform</p>
        <h2>aiio makes Organizational Intelligence operational.</h2>
        <div className="ois-body">
          <p>
            The OIS connects knowledge, people, systems and AI into one operating
            context for decisions and action.
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
        <p>The OIS is not another application.</p>
        <p>It is the infrastructure for organizations that want to use what they know.</p>
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
              aiio exists to turn organizational understanding into a durable
              business capability.
            </p>
            <p>
              The platform makes that foundation usable.
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
