import { MainHeader } from "./main-navigation";
import { CapabilityJourney } from "./capability-journey";
import {
  CategoryEvolution,
  CeoMondayMoment,
  OrganizationMirror,
} from "./category-reinforcement";

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
  "Knowledge",
  "Living Organizational Memory",
  "Organizational Understanding",
  "Organizational Intelligence",
  "Organizational Capabilities",
  "Organizational Resilience",
  "Self-Enabling Organization",
] as const;

const oisEcosystemElements = [
  "People",
  "Knowledge",
  "Enterprise Systems",
  "Artificial Intelligence",
  "Organizational Memory",
] as const;

const imagineMoments = [
  {
    statement: "Imagine an organization that never loses its knowledge.",
    support: "Knowledge stays.",
  },
  {
    statement: "Imagine an organization that truly understands itself.",
    support: "Everything becomes shared understanding.",
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

const whyNowStages = [
  {
    stage: "Industrial Revolution",
    infrastructure: "Machines",
    copy: "Machines amplified physical work.",
  },
  {
    stage: "Digital Revolution",
    infrastructure: "Software",
    copy: "Software amplified business processes.",
  },
] as const;

const companyPrinciples = [
  {
    title: "Understanding before Intelligence",
    copy:
      "Artificial Intelligence creates value only when it is grounded in organizational understanding.",
  },
  {
    title: "Enable, don't replace",
    copy:
      "Technology should strengthen organizations rather than create new dependencies.",
  },
  {
    title: "Build for the next decade",
    copy:
      "We are not building software for today's workflows. We are building the foundation for the next generation of organizations.",
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
          aiio turns that hidden knowledge into Organizational Intelligence.
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
        {/* Vinext local dev cannot serve Next image optimization for this static hero asset. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          decoding="async"
          fetchPriority="high"
          height="929"
          src="/landing-organizational-intelligence-hero-v1.jpg"
          width="1692"
        />
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
    </section>
  );
}

function ConceptBreakthrough() {
  return (
    <section className="concept-section" id="organizational-intelligence">
      <div className="concept-inner">
        <div className="concept-copy">
          <p className="dark-eyebrow">The missing layer</p>
          <h2>The missing layer is not more software. It is Organizational Intelligence.</h2>
          <div className="concept-statement">
            <p>
              The breakthrough is not machines understanding organizations.
            </p>
            <p>It is organizations understanding themselves.</p>
          </div>
          <p className="concept-support">
            aiio creates the living foundation for memory, understanding and
            capability.
          </p>
        </div>
        <ol
          aria-label="Organizational Intelligence progression"
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
      <div className="organization-inner">
        <div className="organization-header">
          <p className="dark-eyebrow">A New Kind of Organization</p>
          <h2>
            The next generation will not be defined by AI alone.
            <br />
            It will be defined by self-understanding.
          </h2>
          <p>Knowledge stays. Understanding grows. Capabilities compound.</p>
        </div>
        <div className="organization-closing-block">
          <div className="organization-closing-statement">
            Tomorrow&apos;s leading organizations continuously understand themselves
            and develop new capabilities.
          </div>
        </div>
        <ol className="organization-journey" aria-label="Self-enabling organization journey">
          {intelligenceProgression.map((step) => (
            <li key={step}>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <div className="organization-bottom-statement">
          <p>Understanding is the prerequisite for intelligence.</p>
          <p>Self-understanding is the prerequisite for self-enablement.</p>
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
        <p className="ois-section-title">Built around Organizational Intelligence</p>
        <h2>One foundation for organizational self-understanding.</h2>
        <div className="ois-body">
          <p>People, knowledge, systems and AI become one shared context.</p>
          <p>That foundation is the Organizational Intelligence System.</p>
        </div>
      </div>

      <div
        aria-label="Organizational Intelligence System ecosystem"
        className="ois-ecosystem"
      >
        <svg
          aria-hidden="true"
          className="ois-connection-map"
          focusable="false"
          viewBox="0 0 1200 620"
        >
          <path className="ois-line ois-line-1" d="M600 310 C520 230 410 170 260 126" />
          <path className="ois-line ois-line-3" d="M600 310 C520 208 650 124 782 112" />
          <path className="ois-line ois-line-4" d="M600 310 C715 250 848 210 1010 232" />
          <path className="ois-line ois-line-5" d="M600 310 C745 354 855 432 940 520" />
          <path className="ois-line ois-line-6" d="M600 310 C590 430 558 500 520 562" />
        </svg>
        <div className="ois-core">
          <span>Organizational</span>
          <span>Intelligence</span>
          <span>System</span>
        </div>
        {oisEcosystemElements.map((element) => (
          <span
            className={`ois-node ois-node-${element
              .toLowerCase()
              .replaceAll(" ", "-")}`}
            key={element}
          >
            {element}
          </span>
        ))}
      </div>

      <div className="ois-bottom-statement">
        <p>The OIS is not another application.</p>
        <p>It is the infrastructure for self-understanding.</p>
      </div>
    </section>
  );
}

function WhyNow() {
  return (
    <section className="why-now-section" id="why-now">
      <div className="why-now-intro">
        <p className="why-now-title">Why Now?</p>
        <h2>Every technological revolution creates new infrastructure.</h2>
      </div>

      <div className="why-now-timeline" aria-label="Technological infrastructure timeline">
        <div className="why-now-line" aria-hidden="true" />
        {whyNowStages.map((item) => (
          <article className="why-stage" key={item.stage}>
            <span className="why-stage-dot" aria-hidden="true" />
            <p className="why-stage-name">{item.stage}</p>
            <h3>{item.infrastructure}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
        <article className="why-stage why-stage-incomplete">
          <span className="why-stage-dot" aria-hidden="true" />
          <p className="why-stage-name">Artificial Intelligence</p>
          <h3>???</h3>
        </article>
        <article className="why-stage why-stage-reveal">
          <span className="why-stage-dot" aria-hidden="true" />
          <p className="why-stage-name">Organizational Intelligence</p>
          <h3>The Organizational Intelligence System</h3>
          <p>Organizations can now understand themselves.</p>
        </article>
      </div>

      <div className="why-now-closing">
        <p>Artificial Intelligence changes software.</p>
        <p>Organizational Intelligence changes organizations.</p>
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
              Artificial Intelligence alone is not enough. It can only help an
              organization move forward when it is grounded in what the
              organization knows, how it works and why it makes decisions.
            </p>
            <p>
              Before organizations can become more intelligent, they first need to
              understand themselves.
            </p>
            <p>
              aiio exists to enable that transformation: calmly, deliberately and
              with a long-term commitment to organizations that can understand and
              enable themselves.
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
      <ImagineFuture />
      <CeoMondayMoment />
      <OrganizationMirror />
      <OisArchitecture />
      <CategoryEvolution />
      <WhyNow />
      <CapabilityJourney />
      <CompanyPurpose />
    </main>
  );
}
