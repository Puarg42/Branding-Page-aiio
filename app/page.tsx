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
          "ProcessCollector sammelt Wissen aus Dokumenten, Interviews, Prozessen und bestehenden Systemen und schafft daraus die belastbare Grundlage für KI-gestützte Organisationsarbeit.",
        )}
      />
    ),
    noteTitle: "Hinweis",
    note:
      "Optional erweiterbar mit ProcessMagnet Light für automatische Prozess- und Dokumentenerkennung.",
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
          "ProcessMagnet analysiert die strukturierte Wissensbasis, erkennt Muster, Prozesszusammenhänge, Schwachstellen und Optimierungspotenziale – auf Basis des ProcessCollectors als Grounding Layer.",
        )}
      />
    ),
    noteTitle: "Hinweis",
    note:
      "ProcessCollector dient als Grounding Layer für belastbare Analysen.",
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
          "ProcessForge macht Organisationswissen für KI-Agenten, Chats, APIs und bestehende Unternehmenssysteme nutzbar. So wird Wissen nicht nur dokumentiert, sondern aktiv in Arbeit und Entscheidungen eingebunden.",
        )}
      />
    ),
    noteTitle: "Hinweis",
    note:
      "Für Unternehmen, die Organisationswissen operationalisieren und in bestehende Systeme integrieren möchten.",
    stack: ["Schmieden", "Transformieren", "Orchestrieren"],
    website: "https://www.processforge.com/",
    websiteLabel: "ProcessForge entdecken",
    visualAlt: "Oberer Ausschnitt des aiio Systembildes mit ProcessForge, Agenten, APIs und Übergabe an Umsysteme.",
    visualBaseImage: "/system-layers/forge-layer-single-generated-v1.png",
    visualImage: "/system-layers/forge-layer-single-generated-v1.png",
  },
] as const;

const cards = [
  {
    eyebrow: getEditableContent("home.card.collector.eyebrow", "Grounding Layer"),
    title: getEditableContent("home.card.collector.title", "ProcessCollector®"),
    href: "#collector",
    copy: (
      <RichText
        html={getEditableContent(
          "home.card.collector",
          "ProcessCollector sammelt Wissen aus Dokumenten, Interviews, Prozessen und bestehenden Systemen und schafft daraus die belastbare Grundlage für KI-gestützte Organisationsarbeit.",
        )}
      />
    ),
  },
  {
    eyebrow: getEditableContent("home.card.magnet.eyebrow", "Understanding Layer"),
    title: getEditableContent("home.card.magnet.title", "ProcessMagnet®"),
    href: "#magnet",
    copy: (
      <RichText
        html={getEditableContent(
          "home.card.magnet",
          "ProcessMagnet analysiert die strukturierte Wissensbasis, erkennt Muster, Prozesszusammenhänge, Schwachstellen und Optimierungspotenziale – auf Basis des ProcessCollectors als Grounding Layer.",
        )}
      />
    ),
  },
  {
    eyebrow: getEditableContent("home.card.forge.eyebrow", "Activation Layer"),
    title: getEditableContent("home.card.forge.title", "ProcessForge®"),
    href: "#forge",
    copy: (
      <RichText
        html={getEditableContent(
          "home.card.forge",
          "ProcessForge macht Organisationswissen für KI-Agenten, Chats, APIs und bestehende Unternehmenssysteme nutzbar. So wird Wissen nicht nur dokumentiert, sondern aktiv in Arbeit und Entscheidungen eingebunden.",
        )}
      />
    ),
  },
] as const;

const problemCards = [
  {
    title: "Knowledge disappears.",
    copy:
      "Critical knowledge leaves with people, projects, systems and decisions faster than organizations can preserve it.",
  },
  {
    title: "AI lacks context.",
    copy:
      "Without shared organizational context, AI can answer questions but cannot reliably support how the organization works.",
  },
  {
    title: "Complexity explodes.",
    copy:
      "Structures, tools, rules and responsibilities multiply until no one sees the whole system clearly.",
  },
  {
    title: "Decisions slow down.",
    copy:
      "When understanding is fragmented, leaders spend more time aligning than moving.",
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

function Hero() {
  return (
    <section className="hero">
      <div className="landing-hero-content">
        <h1>The future belongs to organizations that understand themselves.</h1>
        <p className="hero-subheadline">
          Artificial Intelligence changes software.
          <br />
          Organizational Intelligence changes organizations.
          <br />
          aiio enables both.
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
              The fundamental innovation of the AI era is not that machines
              understand organizations.
            </p>
            <p>
              It is that organizations can, for the first time, be enabled to
              understand themselves.
            </p>
          </div>
          <p className="concept-support">
            aiio creates the Organizational Intelligence System: a living
            foundation that preserves organizational knowledge, creates shared
            understanding and enables new organizational capabilities.
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
            The next generation of organizations will not be defined by
            artificial intelligence.
            <br />
            They will be defined by their ability to understand themselves.
          </h2>
          <p>
            For the first time in history, organizations can continuously
            preserve their knowledge, understand themselves and develop new
            organizational capabilities.
          </p>
        </div>
        <div className="organization-closing-block">
          <div className="organization-closing-statement">
            The organizations that will lead tomorrow are those that
            continuously understand themselves and develop new organizational
            capabilities.
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

function OisArchitecture() {
  return (
    <section className="ois-section" id="architektur">
      <div className="ois-intro">
        <p className="ois-section-title">Built around Organizational Intelligence</p>
        <h2>
          Every resilient organization needs a foundation that continuously
          connects knowledge, context, people and Artificial Intelligence.
        </h2>
        <div className="ois-body">
          <p>Organizations already possess enormous knowledge.</p>
          <p>
            What they lack is a living foundation that continuously transforms
            fragmented information into shared organizational understanding.
          </p>
          <p>
            At aiio, we call this foundation the Organizational Intelligence
            System (OIS).
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
        <p>The OIS is not another enterprise application.</p>
        <p>
          It is the foundation that enables organizations to understand
          themselves.
        </p>
      </div>
    </section>
  );
}

// Kept only as a temporary legacy reference while the OIS section is redesigned.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Architecture() {
  return (
    <section className="section" id="architektur">
      <p className="eyebrow">{getEditableContent("home.architecture.eyebrow", "Das System")}</p>
      <h2>
        {getEditableContent(
          "home.architecture.title",
          "Von verstreutem Wissen zu aktivierbarer Organisationsintelligenz.",
        )}
      </h2>
      <div className="section-intro rich-text">
        <RichText
          html={getEditableContent(
            "home.architecture.intro",
            "Das OIS verbindet drei aufeinander aufbauende Layer: ProcessCollector sichert und strukturiert Organisationswissen, ProcessMagnet erkennt daraus Prozesse, Zusammenhänge und Modelle, ProcessForge aktiviert dieses Wissen für KI-Agenten, APIs, Chats und bestehende Systeme.",
          )}
        />
      </div>
      <div className="architecture-grid architecture-copy-grid">
        <p>
          Der Einstieg beginnt dort, wo Organisationen zuerst Klarheit brauchen:
          beim Wissen. ProcessCollector sichert Interviews, Dokumente und
          vorhandenes Prozesswissen als belastbare Grundlage. ProcessMagnet
          erkennt daraus mithilfe von Multimodal Retrieval Prozesse,
          Zusammenhänge und BPMN-konforme Modelle.
        </p>
        <p>
          ProcessForge aktiviert dieses geschmiedete Wissen für Agenten, APIs,
          MCP, Chats und Umsysteme. So entsteht kein Nebeneinander einzelner
          Tools, sondern ein aufbauender Produkt-Stack: vom eigenständigen Use
          Case bis zum vollständigen Organizational Intelligence System.
        </p>
      </div>
      <div className="cards architecture-cards" aria-label="Stacking Product">
        {cards.map((card) => (
          <a className="card card-link" href={card.href} key={card.title}>
            <span>{card.eyebrow}</span>
            <h3>{card.title}</h3>
            <div className="card-copy rich-text">{card.copy}</div>
            <span className="card-click-icon" aria-hidden="true" />
          </a>
        ))}
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
              "Die beste aiio-Demo beginnt nicht mit einem Tool, sondern mit echtem Organisationswissen: sammeln, strukturieren, modellieren und als aktivierbaren Produkt-Stack in die passenden Umsysteme bringen.",
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
      <OisArchitecture />
      <Layers />
      <Demo />
    </main>
  );
}
