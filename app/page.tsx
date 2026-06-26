import Image from "next/image";
import { MainHeader } from "./main-navigation";
import { CapabilityJourney } from "./capability-journey";
import {
  CategoryEvolution,
  CeoMondayMoment,
  OrganizationMirror,
} from "./category-reinforcement";
import { getEditableContent, RichText } from "./editor/content";

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
        <Image
          alt=""
          decoding="async"
          fetchPriority="high"
          height="929"
          priority
          sizes="(max-width: 720px) 680px, (max-width: 920px) 920px, 72vw"
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

function Demo() {
  return (
    <section className="demo-section" id="demo">
      <div className="demo">
        <div>
          <p className="eyebrow">{getEditableContent("home.demo.eyebrow", "Demo")}</p>
          <h2>
            {getEditableContent(
              "home.demo.title",
              "See what your organization already knows.",
            )}
          </h2>
        </div>
        <div className="demo-copy rich-text">
          <RichText
            html={getEditableContent(
              "home.demo.copy",
              "The best aiio demo starts with real organizational knowledge and shows how understanding becomes action.",
            )}
          />
        </div>
        <a className="button" href="/live-demo/kontakt">
          Request a Demo
        </a>
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
      <CeoMondayMoment />
      <OrganizationMirror />
      <OisArchitecture />
      <CategoryEvolution />
      <CapabilityJourney />
      <Demo />
    </main>
  );
}
