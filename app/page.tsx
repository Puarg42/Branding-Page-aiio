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

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">
          {getEditableContent("home.hero.eyebrow", "Das OIS")}
        </p>
        <h1>
          <span className="headline-desktop">
            {getEditableContent("home.hero.title", "Ihre Organisation weiß mehr, als Ihre KI nutzen kann.")}
          </span>
          <span className="headline-mobile">
            {getEditableContent("home.hero.title", "Ihre Organisation weiß mehr, als Ihre KI nutzen kann.")}
          </span>
        </h1>
        <p>
          {getEditableContent(
            "home.hero.intro",
            "Das Organizational Intelligence System von aiio macht verstreutes Organisationswissen erstmals als gemeinsame Handlungsbasis für Menschen, KI-Agenten und bestehende Unternehmenssysteme nutzbar. So wird aus Dokumenten, Prozessen, Strukturen und Erfahrungswissen eine aktivierbare Intelligenzschicht für die Organisation.",
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
      <Architecture />
      <Layers />
      <Demo />
    </main>
  );
}
