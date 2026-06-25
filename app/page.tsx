import { MainHeader } from "./main-navigation";
import { getEditableContent, RichText } from "./editor/content";

const layerSections = [
  {
    id: "collector",
    tone: "collector",
    eyebrow: getEditableContent("home.layer.collector.eyebrow", "Grounding Layer"),
    title: getEditableContent("home.layer.collector.title", "Organisationswissen erfassen und strukturieren."),
    copy: (
      <RichText
        html={getEditableContent(
          "home.layer.collector",
          "ProcessCollector sichert Wissen aus Dokumenten, Interviews, Prozessen und Systemen als belastbare KI-Grundlage.",
        )}
      />
    ),
    noteTitle: "Hinweis",
    note:
      "Erweiterbar mit ProcessMagnet Light für automatische Erkennung.",
    stack: ["Manifestieren", "Vernetzen", "Bewahren"],
    website: "https://processcollector.com/",
    websiteLabel: "ProcessCollector entdecken",
    visualAlt: "Unterer Ausschnitt des aiio Systembildes mit hellem Organisationswissen, Dokumenten und Inputformaten.",
    visualBaseImage: "/system-layers/collector-layer-single-generated-v1.png",
    visualImage: "/system-layers/collector-layer-single-generated-v1.png",
  },
  {
    id: "magnet",
    tone: "magnet",
    eyebrow: getEditableContent("home.layer.magnet.eyebrow", "Understanding Layer"),
    title: getEditableContent("home.layer.magnet.title", "Zusammenhänge, Prozesse und Potenziale erkennen."),
    copy: (
      <RichText
        html={getEditableContent(
          "home.layer.magnet",
          "ProcessMagnet erkennt Muster, Prozesse und Potenziale auf Basis des ProcessCollectors.",
        )}
      />
    ),
    noteTitle: "Hinweis",
    note:
      "ProcessCollector liefert den Grounding Layer.",
    stack: ["Erheben", "Harmonisieren", "Kontextualisieren"],
    website: "https://process-magnet.com/",
    websiteLabel: "ProcessMagnet entdecken",
    visualAlt: "Mittlerer Ausschnitt des aiio Systembildes mit ProcessMagnet, Sogwirkung und Modell-Erkennung.",
    visualBaseImage: "/system-layers/magnet-layer-single-generated-v1.png",
    visualImage: "/system-layers/magnet-layer-single-generated-v1.png",
  },
  {
    id: "forge",
    tone: "forge",
    eyebrow: getEditableContent("home.layer.forge.eyebrow", "Activation Layer"),
    title: getEditableContent("home.layer.forge.title", "Organisationswissen aktivieren und nutzbar machen."),
    copy: (
      <RichText
        html={getEditableContent(
          "home.layer.forge",
          "ProcessForge aktiviert Organisationswissen für Agenten, Chats, APIs und Unternehmenssysteme.",
        )}
      />
    ),
    noteTitle: "Hinweis",
    note:
      "Für Unternehmen, die Wissen operationalisieren wollen.",
    stack: ["Schmieden", "Transformieren", "Orchestrieren"],
    website: "https://www.processforge.com/",
    websiteLabel: "ProcessForge entdecken",
    visualAlt: "Oberer Ausschnitt des aiio Systembildes mit ProcessForge, Agenten, APIs und Übergabe an Umsysteme.",
    visualBaseImage: "/system-layers/forge-layer-single-generated-v1.png",
    visualImage: "/system-layers/forge-layer-single-generated-v1.png",
  },
] as const;

const problemCards = [
  {
    title: "Knowledge disappears.",
    copy: "Knowledge leaves with every handover.",
  },
  {
    title: "AI lacks context.",
    copy: "Without context, AI guesses.",
  },
  {
    title: "Complexity explodes.",
    copy: "Systems multiply. Clarity disappears.",
  },
  {
    title: "Decisions slow down.",
    copy: "Fragmented understanding slows action.",
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
  "Processes",
  "Enterprise Systems",
  "Artificial Intelligence",
  "Organizational Memory",
  "Context",
  "Agents",
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

const learningTransitionMoments = [
  {
    lead: "For centuries,",
    statement: "organizations have learned through people.",
  },
  {
    lead: "For the first time,",
    statement: "organizations can learn themselves.",
  },
  {
    statement: "This changes everything.",
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

function Hero() {
  return (
    <section className="hero">
      <div className="landing-hero-content">
        <h1>The future belongs to organizations that understand themselves.</h1>
        <p className="hero-subheadline">
          Organizations already know more than they can use.
          <br />
          For the first time, Artificial Intelligence enables them to understand
          themselves.
        </p>
        <div className="actions hero-actions" aria-label="Primary actions">
          <a className="button hero-button" href="#organizational-intelligence">
            Discover the Organizational Intelligence System
          </a>
          <a className="button hero-button secondary" href="/live-demo/kontakt">
            See it in action
          </a>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true" />
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
          <h2>The missing layer is Organizational Intelligence.</h2>
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

function LearningTransition() {
  return (
    <section className="learning-transition" aria-label="Organizational learning transition">
      {learningTransitionMoments.map((moment) => (
        <section
          className={`learning-moment${"lead" in moment ? "" : " learning-moment-final"}`}
          key={moment.statement}
        >
          <div className="learning-copy">
            {"lead" in moment ? <p>{moment.lead}</p> : null}
            <h2>{moment.statement}</h2>
          </div>
        </section>
      ))}
    </section>
  );
}

function OisArchitecture() {
  return (
    <section className="ois-section" id="architektur">
      <div className="ois-intro">
        <p className="ois-section-title">Built around Organizational Intelligence</p>
        <h2>Resilient organizations need one living foundation.</h2>
        <div className="ois-body">
          <p>The knowledge is already there.</p>
          <p>
            What is missing is a system that turns fragments into shared
            understanding.
          </p>
          <p>
            At aiio, that foundation is the Organizational Intelligence System.
          </p>
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
          <path className="ois-line ois-line-2" d="M600 310 C470 305 300 312 150 248" />
          <path className="ois-line ois-line-3" d="M600 310 C520 208 650 124 782 112" />
          <path className="ois-line ois-line-4" d="M600 310 C715 250 848 210 1010 232" />
          <path className="ois-line ois-line-5" d="M600 310 C745 354 855 432 940 520" />
          <path className="ois-line ois-line-6" d="M600 310 C590 430 558 500 520 562" />
          <path className="ois-line ois-line-7" d="M600 310 C468 375 350 472 252 510" />
          <path className="ois-line ois-line-8" d="M600 310 C720 210 910 130 1078 120" />
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
        <p>It is the foundation for organizational self-understanding.</p>
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

function Layers() {
  return (
    <>
      {layerSections.map((layer) => (
        <section className={`layer ${layer.tone}`} id={layer.id} key={layer.id}>
          <div className="layer-inner">
            <div className="layer-copy">
              <p className="eyebrow">{layer.eyebrow}</p>
              <h2>{layer.title}</h2>
              <div className="layer-copy-text rich-text">{layer.copy}</div>
              <div className="note">
                {typeof layer.noteTitle === "string" ? (
                  <strong>{layer.noteTitle}</strong>
                ) : (
                  layer.noteTitle
                )}
                <br />
                {layer.note}
              </div>
              <a
                className="layer-website-link"
                href={layer.website}
                rel="noreferrer"
                target="_blank"
              >
                <span>{layer.websiteLabel}</span>
                <span className="card-click-icon layer-website-icon" aria-hidden="true" />
              </a>
            </div>
            <figure className="visual layer-system-visual">
              <span
                aria-label={layer.visualAlt}
                className="layer-system-image layer-system-image-base"
                role="img"
                style={{ backgroundImage: `url(${layer.visualBaseImage})` }}
              />
              <span
                aria-hidden="true"
                className="layer-system-image layer-system-image-focus"
                style={{ backgroundImage: `url(${layer.visualImage})` }}
              />
              <figcaption className="visual-stack layer-system-caption">
                {layer.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </figcaption>
            </figure>
          </div>
        </section>
      ))}
    </>
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
              "Zeigen, was die Organisation schon weiß.",
            )}
          </h2>
        </div>
        <div className="demo-copy rich-text">
          <RichText
            html={getEditableContent(
              "home.demo.copy",
              "Die beste aiio-Demo beginnt mit echtem Organisationswissen und zeigt, wie daraus Handlung entsteht.",
            )}
          />
        </div>
        <a className="button" href="/live-demo/kontakt">
          Demo anfordern
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
      <NewKindOrganization />
      <ImagineFuture />
      <LearningTransition />
      <OisArchitecture />
      <WhyNow />
      <Layers />
      <Demo />
    </main>
  );
}
