import { MainHeader } from "./main-navigation";
import { CapabilityJourney } from "./capability-journey";
import {
  CategoryEvolution,
  CeoMondayMoment,
  OrganizationMirror,
} from "./category-reinforcement";
import { BrandIllustration } from "../components/brand/BrandIllustration";

const problemCards = [
  {
    title: "Knowledge leaves.",
    copy: "Every handover erases context.",
  },
  {
    title: "AI guesses.",
    copy: "Without context, intelligence becomes noise.",
  },
  {
    title: "Complexity compounds.",
    copy: "Systems multiply faster than understanding.",
  },
  {
    title: "Decisions stall.",
    copy: "Fragmented knowledge slows action.",
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
      "Intelligence matters when it improves how organizations decide and act.",
  },
  {
    title: "Enable, don't replace",
    copy:
      "Technology should strengthen organizational capability, not create new dependency.",
  },
  {
    title: "Build for the next decade",
    copy:
      "We are building the foundation for organizations that learn, adapt and evolve over time.",
  },
] as const;

function Hero() {
  return (
    <section className="hero">
      <div className="landing-hero-content">
        <h1>The future belongs to organizations that understand themselves.</h1>
        <p className="hero-subheadline">
          Organizations already know more than they can use.
          <br />
          For the first time, that knowledge can become understanding.
        </p>
        <div className="actions hero-actions" aria-label="Primary actions">
          <a className="button hero-button" href="#organizational-intelligence">
            Explore OIS
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
          <h2>The missing layer is understanding.</h2>
          <div className="concept-statement">
            <p>More information was never enough.</p>
            <p>Meaning emerges when context connects.</p>
          </div>
          <p className="concept-support">
            Organizational Intelligence begins where scattered knowledge becomes
            shared meaning.
          </p>
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
          <h2>
            The next generation will be defined by how quickly it learns.
            <br />
            And how reliably it turns learning into capability.
          </h2>
          <p>Knowledge stays. Decisions improve. Capabilities compound.</p>
        </div>
        <div className="organization-closing-block">
          <div className="organization-closing-statement">
            Tomorrow&apos;s leading organizations keep getting better at change.
          </div>
        </div>
        <div className="organization-bottom-statement">
          <p>Understanding is the prerequisite for intelligence.</p>
          <p>Capability is how understanding becomes visible.</p>
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
        <h2>The system behind the journey.</h2>
        <div className="ois-body">
          <p>aiio connects knowledge, people, systems and AI into one operating context.</p>
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
        <p>It is how the journey becomes operational.</p>
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
              Organizations should not depend on scattered memory or isolated
              projects to evolve.
            </p>
            <p>
              aiio exists to make understanding a durable organizational
              capability.
            </p>
            <p>
              That conviction guides everything we build.
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
      <CapabilityJourney />
      <OisArchitecture />
      <ProblemSection />
      <ConceptBreakthrough />
      <NewKindOrganization />
      <ImagineFuture />
      <CeoMondayMoment />
      <OrganizationMirror />
      <CategoryEvolution />
      <CompanyPurpose />
    </main>
  );
}
