import type { Metadata } from "next";
import Link from "next/link";
import { getEditableContent } from "../editor/content";
import { MainHeader } from "../main-navigation";
import { TimelineMedia } from "./timeline-media";

export const metadata: Metadata = {
  title: "Über uns | aiio",
  description:
    "Über aiio: Management, Entwicklungsgeschichte, Expert Panel und die Vision einer KI-nativen Plattform für Organisationen.",
};

const leadership = [
  {
    name: "Dr. Christian Graup",
    role: "Chief Executive Officer",
    image: "/people/christian-graup.jpg",
  },
  {
    name: "Knut Köchli",
    role: "Chief Operating Officer",
    image: "/people/knut-koechli.jpg",
  },
  {
    name: "Jobst von Heintze",
    role: "Chief Marketing Officer",
    image: "/people/jobst-von-heintze.jpg",
  },
  {
    name: "Lars Bendler",
    role: "Chief Partner Officer",
    image: "/people/lars-bendler.jpg",
  },
] as const;

const awards = [
  {
    year: "2024",
    image: "/awards/chip-leading-software-2024-aiio.svg",
    alt: "aiio wurde 2024 als CHIP Leading Software im Bereich BPM ausgezeichnet.",
  },
  {
    year: "2025",
    image: "/awards/chip-leading-software-2025-aiio.svg",
    alt: "aiio wurde 2025 als CHIP Leading Software im Bereich BPM ausgezeichnet.",
  },
] as const;

type TimelineMilestone = {
  buttonLabel?: string;
  copy: string;
  glassMotion?: boolean;
  href?: string;
  image?: string;
  motion?: boolean;
  peopleMotion?: boolean;
  poster?: string;
  title: string;
  videoMp4?: string;
  videoWebm?: string;
  year: string;
};

const milestones: TimelineMilestone[] = [
  {
    year: "2007",
    title: "Vom klassischen BPM zur Prozessbasis",
    poster: "/history/quam-dash.jpg",
    videoMp4: "/history/quam-cloud-hero-animation.mp4",
    copy:
      "Mit Quam entstand eine Prozessmanagement-Suite für Microsoft-SharePoint-Umgebungen. Der Kern: Prozesse, Rollen und Strukturen erfassen, modellieren und nachvollziehbar verbinden.",
  },
  {
    year: "2020",
    title: "Neustart als KI-native Plattform",
    image: "/history/q365-prototyp.png",
    copy:
      "aiio richtet die Plattform neu aus: cloud-nativ, KI-gestützt und mit dem Anspruch, Organisationswissen nicht nur zentral, sondern aus der gesamten Organisation heraus nutzbar zu machen.",
  },
  {
    year: "2022",
    title: "Process Intelligence für alle",
    poster: "/history/aiio-platform-agentic-poster.jpg",
    videoMp4: "/history/aiio-platform-agentic-animation.mp4",
    copy:
      "Mit aiio wird Prozessmanagement kollaborativer: ProcessCollector macht vorhandenes Wissen aus Teams, Gesprächen und Dokumenten erfassbar, damit es nicht isoliert dokumentiert, sondern gemeinsam sichtbar gemacht, verstanden und weiterentwickelt wird.",
    href: "https://processcollector.com/",
    buttonLabel: "ProcessCollector ansehen",
  },
  {
    year: "2024",
    title: "Series-A und nächste Wachstumsphase",
    image: "/history/aiio-apri-invest.jpg",
    peopleMotion: true,
    copy:
      "Das Unternehmen sichert sich ein Series-A-Investment und schärft den Weg zu einem Produkt-Stack, der Wissen, Recognition und Activation enger miteinander verbindet.",
  },
  {
    year: "2025",
    title: "Prozesserkennung mit ProcessMagnet",
    poster: "/history/processmagnet-prozessstaubsauger-poster.jpg",
    videoMp4: "/history/processmagnet-prozessstaubsauger-animation.mp4",
    copy:
      "ProcessMagnet ergänzt die Plattformreise um die Recognition-Schicht: multimodale Inhalte wie Dokumente, E-Mails, Transkripte, Legacy-Systeme und perspektivisch Video werden vollautomatisch oder analystengeführt in BPMN-konforme Prozess- und Organisationsmodelle überführt.",
    href: "https://process-magnet.com/",
    buttonLabel: "ProcessMagnet ansehen",
  },
  {
    year: "2026",
    title: "ProcessForge als Prozessschmiede",
    image: "/aiio-architecture-stack-output-v3.png",
    glassMotion: true,
    copy:
      "Mit ProcessForge entsteht der Activation Layer der Plattform: geschmiedetes Organisationswissen wird durch Agenten verwertet, in multimodale Ausgabeformate transformiert und einmalig oder dauerhaft an Umsysteme verteilt.",
    href: "https://processforge.com/",
    buttonLabel: "ProcessForge ansehen",
  },
];

const advisors = [
  {
    name: "Prof. Dr. Sebastian Schlesinger",
    focus: "Information Security & Embedded Systems",
    context: "HWR Berlin, zuvor unter anderem Zalando und Deutsche Bank",
    image: "/people/sebastian-schlesinger.jpg",
  },
  {
    name: "Edmund Frey",
    focus: "Go-to-Market im B2B-SaaS-Umfeld",
    context: "Edventure GmbH, zuvor unter anderem Adobe, SAP und Spryker",
    image: "/people/edmund-frey.jpg",
  },
  {
    name: "Oliver Sauer",
    focus: "M&A und Private Equity",
    context: "Palladio Partners, zuvor unter anderem GETEC, MVV Energie und Rothschild",
    image: "/people/oliver-sauer.jpg",
  },
] as const;

const proofPoints = [
  {
    title: "Schneller nutzbar",
    copy:
      "aiio ist auf kurze Wege ausgelegt: im Browser, in Microsoft Teams und in Microsoft-365-nahen Arbeitsumgebungen.",
  },
  {
    title: "Beteiligung statt Spezialdisziplin",
    copy:
      "Prozessarbeit soll nicht nur Expertinnen und Experten gehören. Mitarbeitende können ihr Wissen beitragen und damit Veränderung greifbar machen.",
  },
  {
    title: "KI als Kollege",
    copy:
      "Verbesserungsideen, Potenziale und nächste Schritte werden so aufbereitet, dass Organisationen schneller von Modellen zu aktivierter Wirkung kommen.",
  },
] as const;

export default function AboutUsPage() {
  return (
    <main>
      <MainHeader variant="solid" />

      <section className="section award-section award-section-top">
        <div>
          <p className="eyebrow">{getEditableContent("about.awards.eyebrow", "Auszeichnungen")}</p>
          <h2>
            {getEditableContent(
              "about.awards.title",
              "CHIP Leading Software im zweiten Jahr in Folge.",
            )}
          </h2>
          <p>
            aiio wurde 2024 und 2025 als führende BPM-Software ausgezeichnet:
            ein Signal für einfache, KI-gestützte Prozessarbeit mit Wirkung.
          </p>
        </div>
        <div className="award-list" aria-label="CHIP Auszeichnungen">
          {awards.map((award) => (
            <div className="award-item" key={award.year}>
              <div
                aria-label={award.alt}
                className="award-image"
                role="img"
                style={{ backgroundImage: `url(${award.image})` }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="eyebrow">{getEditableContent("about.hero.eyebrow", "Über aiio")}</p>
          <h1>{getEditableContent("about.hero.title", "AI Improves Organizations.")}</h1>
          <p>
            aiio entwickelt eine KI-native Plattform für Organisationen, die
            verstreutes Wissen in Transparenz, BPMN-konforme Modelle und
            aktivierbare Outputs übersetzt.
          </p>
          <div className="actions" aria-label="Über aiio Aktionen">
            <Link className="button" href="/#architektur">
              Plattform verstehen
            </Link>
            <Link className="button secondary" href="/#demo">
              Demo anfordern
            </Link>
          </div>
        </div>
      </section>

      <section className="section about-intro">
        <div>
          <p className="eyebrow">{getEditableContent("about.intro.eyebrow", "Haltung")}</p>
          <h2>
            {getEditableContent(
              "about.intro.title",
              "Prozessmanagement wird zur gemeinsamen Organisationsarbeit.",
            )}
          </h2>
        </div>
        <div className="about-statement">
          <p>
            Unternehmen stehen unter Druck, effizienter zu werden, Vorgaben
            einzuhalten und Veränderung mit begrenzten Ressourcen zu gestalten.
            aiio setzt genau dort an: Prozesswissen soll einfacher erfasst,
            gemeinsam verstanden und in konkrete Verbesserung übersetzt werden.
          </p>
          <strong>Über 120 Jahre Managementerfahrung treffen auf KI-native Produktentwicklung.</strong>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">{getEditableContent("about.management.eyebrow", "Management")}</p>
        <h2>
          {getEditableContent(
            "about.management.title",
            "Ein Führungsteam mit Leidenschaft für einfachere Organisationen.",
          )}
        </h2>
        <div className="about-grid leadership-grid">
          {leadership.map((person, personIndex) => {
            const personName = getEditableContent(
              `about.leadership.${personIndex}.name`,
              person.name,
            );

            return (
              <article className="about-card person-card" key={person.name}>
                <div
                  aria-hidden="true"
                  className="person-photo"
                  style={{ backgroundImage: `url(${person.image})` }}
                />
                <span>{person.role}</span>
                <h3>{personName}</h3>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section about-timeline-section">
        <p className="eyebrow">{getEditableContent("about.timeline.eyebrow", "Entwicklung")}</p>
        <h2>
          {getEditableContent(
            "about.timeline.title",
            "Von SharePoint-BPM zum Organizational Intelligence System.",
          )}
        </h2>
        <div className="timeline">
          {milestones.map((milestone) => {
            const milestoneTitle = getEditableContent(
              `about.timeline.${milestone.year}.title`,
              milestone.title,
            );

            return (
              <article className="timeline-item" key={milestone.year}>
                <span>{milestone.year}</span>
                <TimelineMedia
                  image={"image" in milestone ? milestone.image : undefined}
                  poster={"poster" in milestone ? milestone.poster : undefined}
                  title={`${milestone.year}: ${milestoneTitle}`}
                  variant={
                    "glassMotion" in milestone
                      ? "glass"
                      : "peopleMotion" in milestone
                        ? "people"
                        : "motion" in milestone
                          ? "motion"
                          : undefined
                  }
                  videoMp4={"videoMp4" in milestone ? milestone.videoMp4 : undefined}
                  videoWebm={"videoWebm" in milestone ? milestone.videoWebm : undefined}
                />
                <div>
                  <h3>{milestoneTitle}</h3>
                  <p>{milestone.copy}</p>
                  {"href" in milestone ? (
                    <a
                      className="timeline-button"
                      href={milestone.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {milestone.buttonLabel}
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section section-split">
        <div>
          <p className="eyebrow">{getEditableContent("about.outlook.eyebrow", "Ausblick")}</p>
          <h2>
            {getEditableContent(
              "about.outlook.title",
              "Organisationen werden zu lernenden Netzwerken.",
            )}
          </h2>
        </div>
        <p className="lead-text">
          Der nächste Schritt geht über klassisches Prozessmanagement hinaus:
          aiio arbeitet an einer Plattform für kognitive Organisationsführung,
          in der Menschen, Maschinen und Organisationen in gemeinsamen
          Wissensräumen zusammenarbeiten.
        </p>
      </section>

      <section className="section">
        <p className="eyebrow">{getEditableContent("about.advisors.eyebrow", "Expert Panel")}</p>
        <h2>
          {getEditableContent(
            "about.advisors.title",
            "Trusted Minds für Security, Markt und Investment.",
          )}
        </h2>
        <div className="about-grid advisor-grid">
          {advisors.map((advisor, advisorIndex) => {
            const advisorName = getEditableContent(
              `about.advisors.${advisorIndex}.name`,
              advisor.name,
            );

            return (
              <article className="about-card person-card" key={advisor.name}>
                <div
                  aria-hidden="true"
                  className="person-photo"
                  style={{ backgroundImage: `url(${advisor.image})` }}
                />
                <span>{advisor.focus}</span>
                <h3>{advisorName}</h3>
                <p>{advisor.context}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">{getEditableContent("about.proof.eyebrow", "Kundennutzen")}</p>
        <h2>{getEditableContent("about.proof.title", "Warum Organisationen aiio nutzen.")}</h2>
        <div className="about-grid">
          {proofPoints.map((proof, proofIndex) => {
            const proofTitle = getEditableContent(
              `about.proof.${proofIndex}.title`,
              proof.title,
            );

            return (
              <article className="about-card proof-card" key={proof.title}>
                <h3>{proofTitle}</h3>
                <p>{proof.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="demo about-demo" id="about-demo">
        <div>
          <p className="eyebrow">{getEditableContent("about.demo.eyebrow", "Nächster Schritt")}</p>
          <h2>
            {getEditableContent(
              "about.demo.title",
              "Lass uns zeigen, wie Wissen als Produkt-Stack aktiviert wird.",
            )}
          </h2>
        </div>
        <p>
          Die Unternehmensgeschichte von aiio führt direkt zur Plattformreise:
          Wissen erfassen, Prozessrealität modellieren und geschmiedete Inhalte
          wirksam aktivieren.
        </p>
        <Link className="button" href="/#demo">
          Demo anfordern
        </Link>
      </section>
    </main>
  );
}
