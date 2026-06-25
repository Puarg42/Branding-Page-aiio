import { MainHeader } from "./main-navigation";
import { getEditableContent, RichText } from "./editor/content";

const layerSections = [
  {
    id: "collector",
    tone: "collector",
    eyebrow: getEditableContent("home.layer.collector.eyebrow", "1. Grounding Layer"),
    title: getEditableContent("home.layer.collector.title", "Die Handlungsbasis für jede Organisation."),
    copy: (
      <RichText
        html={getEditableContent(
          "home.layer.collector",
          "Alle KI-Systeme sind nur so gut wie das Wissen, auf dem sie arbeiten. <strong>ProcessCollector<sup>&reg;</sup>light </strong> sammelt Organisationswissen, wie Prozesse, Organigramme, Strukturen, Regularien und erzeugt daraus ein strukturiertes Organisationsmodell als Handlungsbasis für Menschen, KI und deren Agenten.",
        )}
      />
    ),
    noteTitle: (
      <>
        Erweiterbar mit dem Prozess-Staubsauger{" "}
        <strong>
          (ProcessMagnet<sup>&reg;</sup>light)
        </strong>
      </>
    ),
    note:
      "zur automatischen Dokumentenanalyse für den schnellen Einstieg.",
    stack: ["Manifestieren", "Vernetzen", "Bewahren"],
    website: "https://processcollector.com/",
    websiteLabel: "ProcessCollector",
    visualAlt: "Unterer Ausschnitt des aiio Systembildes mit hellem Organisationswissen, Dokumenten und Inputformaten.",
    visualBaseImage: "/system-layers/collector-layer-single-generated-v1.png",
    visualImage: "/system-layers/collector-layer-single-generated-v1.png",
  },
  {
    id: "magnet",
    tone: "magnet",
    eyebrow: getEditableContent("home.layer.magnet.eyebrow", "2. Recognition Layer"),
    title: getEditableContent("home.layer.magnet.title", "Vom Wissen zum BPMN-konformen Orga-Modell."),
    copy: (
      <RichText
        html={getEditableContent(
          "home.layer.magnet",
          "<strong>ProcessMagnet®</strong> überführt unstrukturierte Inhalte wie Dokumente, E-Mails, Transkripte, Legacy-Systeme, Bilder oder Videos in strukturierte, wertorientierte und BPMN-konforme Prozess- und Organisationsmodelle.",
        )}
      />
    ),
    noteTitle: (
      <>
        <strong>
          ProcessCollector<sup>&reg;</sup>
        </strong>{" "}
        ist Single Point of Truth:
      </>
    ),
    note:
      "Inhalte, Modelle und Regelwerke werden als Handlungsbasis und Protokollschicht für Entscheidungen der KI-Agenten genutzt.",
    stack: ["Erheben", "Harmonisieren", "Kontextualisieren"],
    website: "https://process-magnet.com/",
    websiteLabel: "ProcessMagnet",
    visualAlt: "Mittlerer Ausschnitt des aiio Systembildes mit ProcessMagnet, Sogwirkung und Modell-Erkennung.",
    visualBaseImage: "/system-layers/magnet-layer-single-generated-v1.png",
    visualImage: "/system-layers/magnet-layer-single-generated-v1.png",
  },
  {
    id: "forge",
    tone: "forge",
    eyebrow: getEditableContent("home.layer.forge.eyebrow", "3. Activation Layer"),
    title: getEditableContent("home.layer.forge.title", "Geschmiedetes Wissen aktivieren."),
    copy: (
      <RichText
        html={getEditableContent(
          "home.layer.forge",
          "<strong>ProcessForge®</strong>ist die Wissensschmiede für Organisationen: Aus dem neu erhobenen und konsolidierten Informationen erzeugt sie neues, zielgerichtetes Organisationswissen. Dieses wird in passende, auch multimodale Formate gebracht, von Agenten kontextbezogen genutzt und bedarfsgerecht an Umsysteme verteilt.",
        )}
      />
    ),
    noteTitle: "Activation als KI-driven Outlet",
    note:
      "Forge öffnet den Stack nach außen: Chat, API, MCP, Agenten, Automatisierungen und multimodale Ausgabeformate.",
    stack: ["Schmieden", "Transformieren", "Orchestrieren"],
    website: "https://www.processforge.com/",
    websiteLabel: "ProcessForge",
    visualAlt: "Oberer Ausschnitt des aiio Systembildes mit ProcessForge, Agenten, APIs und Übergabe an Umsysteme.",
    visualBaseImage: "/system-layers/forge-layer-single-generated-v1.png",
    visualImage: "/system-layers/forge-layer-single-generated-v1.png",
  },
] as const;

const cards = [
  {
    eyebrow: getEditableContent("home.card.collector.eyebrow", "1. Wissen sichern"),
    title: getEditableContent("home.card.collector.title", "ProcessCollector®"),
    href: "#collector",
    copy: (
      <RichText
        html={getEditableContent(
          "home.card.collector",
          "Der <strong>Grounding Layer</strong> für Flow-Charts, Organigramme, Rollen, Versionierungen und dokumentierte Entscheidungen als belastbare Handlungsbasis für Menschen und KI-Agenten.",
        )}
      />
    ),
  },
  {
    eyebrow: getEditableContent("home.card.magnet.eyebrow", "2. Prozesse erkennen"),
    title: getEditableContent("home.card.magnet.title", "ProcessMagnet®"),
    href: "#magnet",
    copy: (
      <RichText
        html={getEditableContent(
          "home.card.magnet",
          "Der <strong>Recognition Layer</strong> erkennt aus Dokumenten, E-Mails, Transkripten, Bildern und Legacy-Systeme Organisationsinformationen und generiert aus diesen wertorientierten, BPMN-konformen Prozess- und Organisationsmodelle zur weiteren Verwendung für KI-Agenten.",
        )}
      />
    ),
  },
  {
    eyebrow: getEditableContent("home.card.forge.eyebrow", "3. Wissen aktivieren"),
    title: getEditableContent("home.card.forge.title", "ProcessForge®"),
    href: "#forge",
    copy: (
      <RichText
        html={getEditableContent(
          "home.card.forge",
          "Der <strong>Activation Layer</strong> für die Verwertung geschmiedeten Wissens: Agenten, APIs, MCP, Chats und Ausgabeformate verteilen Inhalte einmalig oder dauerhaft an Umsysteme.",
        )}
      />
    ),
  },
] as const;

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">
          {getEditableContent("home.hero.eyebrow", "OIS")}
        </p>
        <h1>
          <span className="headline-desktop">
            {getEditableContent("home.hero.title", "Organizational Intelligence mit System")}
          </span>
          <span className="headline-mobile">
            {getEditableContent("home.hero.title", "Organizational Intelligence mit System")}
          </span>
        </h1>
        <p>
          {getEditableContent(
            "home.hero.intro",
            "Mit dem OIS verbindet aiio Wissen, Recognition und Activation von Organisationsinformationen intelligent in einem integrierten Organizational Intelligence System.",
          )}
        </p>
        <div className="actions" aria-label="Primäre Aktionen">
          <a className="button" href="#architektur">
            Plattform verstehen
          </a>
          <a className="button secondary" href="/live-demo/kontakt">
            Demo anfordern
          </a>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  return (
    <section className="section" id="architektur">
      <p className="eyebrow">{getEditableContent("home.architecture.eyebrow", "System")}</p>
      <h2>
        {getEditableContent(
          "home.architecture.title",
          "Ein System. 3-fach Nutzen.",
        )}
      </h2>
      <div className="section-intro rich-text">
        <RichText
          html={getEditableContent(
            "home.architecture.intro",
            "Mit dem OIS stellt aiio ein 3-Layer-System bereit, das unstrukturiertes, verstreutes Organisationswissen <b>versteht</b>, <b>strukturiert </b>und <b>aktiviert</b>. Jeder Layer ist separat nutzbar, generiert sofortigen Nutzen und wird bei wachsendem Anspruch zur tragenden Schicht des nächsten Layers.",
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
      <Architecture />
      <Layers />
      <Demo />
    </main>
  );
}
