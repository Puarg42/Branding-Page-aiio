import Link from "next/link";
import {
  EditorialSectionNavigator,
  type EditorialSectionNavigatorItem,
} from "../components/brand/EditorialSectionNavigator";
import { getEditableContent, RichText } from "./editor/content";
import { MainHeader } from "./main-navigation";

export type ResourceSlug =
  | "academy"
  | "click-demos"
  | "dokumentation"
  | "success-stories"
  | "product-news"
  | "partner-finden"
  | "blog"
  | "services"
  | "downloadcenter"
  | "support"
  | "demo-kontakt"
  | "testen"
  | "pricing"
  | "release-notes"
  | "kontakt"
  | "presse"
  | "facts"
  | "datenschutz"
  | "impressum";

type ResourceCard = {
  eyebrow?: string;
  href?: string;
  image?: string;
  linkLabel?: string;
  text: string;
  title: string;
};

type ResourceSection = {
  cards?: ResourceCard[];
  copy?: string;
  eyebrow?: string;
  items?: string[];
  title: string;
};

type ResourceForm = {
  buttonLabel: string;
  copy: string;
  interestLabel?: string;
  recipient: string;
  title: string;
};

type ResourcePageData = {
  cta?: {
    href: string;
    label: string;
  };
  eyebrow: string;
  form?: ResourceForm;
  heroImage?: string;
  heroImageAlt?: string;
  intro: string;
  sections: ResourceSection[];
  title: string;
};

const standardContactForm: ResourceForm = {
  buttonLabel: "Nachricht vorbereiten",
  copy:
    "Fülle die Felder aus. Beim Absenden wird eine E-Mail an aiio vorbereitet, damit das Team deine Anfrage direkt einordnen kann.",
  interestLabel: "Worum geht es?",
  recipient: "info@aiio.de",
  title: "Kontaktformular",
};

export const resourcePages: Record<ResourceSlug, ResourcePageData> = {
  academy: {
    eyebrow: "Academy",
    title: "Lerne aiio in kurzen Tutorial-Videos.",
    intro:
      "Die aiio Academy bündelt kostenlose Lerninhalte für den Einstieg und für fortgeschrittene Arbeit mit der Plattform.",
    heroImage: "/aiio-pages/academy/image-03.png",
    heroImageAlt: "Screenshot der aiio Academy mit Prozessansicht und Videofenster.",
    cta: { href: "/click-demos", label: "Direkt ausprobieren" },
    sections: [
      {
        eyebrow: "Videokurse",
        title: "Vom ersten Prozess bis zur sicheren Nutzung.",
        cards: [
          {
            eyebrow: "aiio Basics",
            title: "Videokurs für Einsteiger",
            text:
              "Kurze Videos zeigen die wichtigsten Funktionen, damit Teams schnell erste Ergebnisse produzieren.",
          },
          {
            eyebrow: "aiio Advanced",
            title: "Nutze aiio wie ein Profi",
            text:
              "Fortgeschrittene Funktionen helfen, mehr aus der Plattform herauszuholen und die Nutzung im Unternehmen zu verbreitern.",
          },
          {
            eyebrow: "Immer aktuell",
            title: "Lernen ohne Handbuch",
            text:
              "Neue Funktionen werden verständlich erklärt, sobald sie für Prozess-Champions relevant werden.",
          },
        ],
      },
      {
        title: "Gesehen und direkt ausprobiert.",
        copy:
          "Wer nicht nur zuschauen möchte, kann über die interaktiven Demos zentrale Funktionen ohne Anmeldung testen.",
      },
    ],
  },
  "click-demos": {
    eyebrow: "Interactive Demos",
    title: "Teste zentrale aiio-Funktionen ohne Anmeldung.",
    intro:
      "Die Click-Demos führen direkt durch konkrete Workflows: Modellierung, Ressourcen, Prozesslandkarten, Organigramme und KI-gestützte Verbesserung.",
    heroImage: "/aiio-pages/academy/image-04.png",
    heroImageAlt: "Vorschaugrafik für aiio Click-Demos ohne Anmeldung.",
    cta: { href: "/kostenlose-testversion/anmelden", label: "14 Tage kostenlos testen" },
    sections: [
      {
        eyebrow: "Demo-Auswahl",
        title: "In Minuten vom Eindruck zum Verständnis.",
        cards: [
          {
            title: "KI-beschleunigte Prozessoptimierung",
            text: "Von gut zu herausragend: Verbesserungspotenziale direkt im Prozess erkennen.",
          },
          {
            title: "Zusammenarbeit ohne Grenzen",
            text: "Externe Partner sicher in Prozesse integrieren und gemeinsam arbeiten.",
          },
          {
            title: "Zentraler Ressourcenüberblick",
            text: "Systeme, Werkzeuge und Abhängigkeiten an einem Ort erfassen.",
          },
          {
            title: "Aktuelle Abläufe",
            text: "Automatische Erinnerungen helfen, Prozesse lebendig und aktuell zu halten.",
          },
          {
            title: "Prozesslandkarte",
            text: "Die visuelle Navigation durch Unternehmen, Bereiche und Abläufe.",
          },
          {
            title: "Lebendiges Organigramm",
            text: "Rollen und Verantwortlichkeiten werden sichtbar statt starr dokumentiert.",
          },
        ],
      },
    ],
  },
  dokumentation: {
    eyebrow: "Dokumentation",
    title: "Wissen zu OIS - Das Organizational Intelligence System an einem Ort.",
    intro:
      "Die Dokumentation erklärt zentrale Konzepte, Bedienlogik und Best Practices für Teams, die aiio im Alltag sicher nutzen möchten.",
    heroImage: "/aiio-pages/academy/image-03.png",
    heroImageAlt: "Screenshot von OIS - Das Organizational Intelligence System als Dokumentationsmotiv.",
    cta: { href: "/support", label: "Support kontaktieren" },
    sections: [
      {
        title: "Wissensbereiche",
        cards: [
          {
            title: "Plattform-Grundlagen",
            text:
              "Orientierung zu Aufbau, Rollen, Prozessobjekten und der aiio-Arbeitslogik.",
          },
          {
            title: "Modellierung und Prozesse",
            text:
              "Hinweise für saubere Prozessmodelle, Prozesslandkarten und anschlussfähige Dokumentation.",
          },
          {
            title: "Microsoft 365 Integration",
            text:
              "Einordnung von Teams, SharePoint, Berechtigungen und Dokumentenverknüpfung.",
          },
          {
            title: "KI-Funktionen",
            text:
              "Erklärung, wie KI-gestützte Empfehlungen, Analysen und Verbesserungen in aiio genutzt werden.",
          },
        ],
      },
      {
        title: "Wenn Fragen offen bleiben",
        copy:
          "Die lokale Doku-Übersicht führt in die wichtigsten Bereiche ein. Für konkrete technische oder fachliche Fragen steht der Support bereit.",
      },
    ],
  },
  "success-stories": {
    eyebrow: "Success Stories",
    title: getEditableContent(
      "resource.success.title",
      "Erfolge, die Organisationswissen nutzbar machen.",
    ),
    intro: getEditableContent(
      "resource.success.intro",
      "Die Erfolgsgeschichten zeigen, wie Unternehmen mit aiio Transparenz schaffen, Migration beschleunigen und Audits sicherer bewältigen.",
    ),
    heroImage: "/aiio-pages/success-stories/image-02.jpeg",
    heroImageAlt: "Autoschlüssel als Bildmotiv für die Euromobil Success Story.",
    cta: { href: "/live-demo/kontakt", label: "Eigene Story starten" },
    sections: [
      {
        eyebrow: "Kundenergebnisse",
        title: "Vier Beispiele für messbaren Fortschritt.",
        cards: [
          {
            image: "/aiio-pages/success-stories/image-02.jpeg",
            title: "Euromobil",
            text:
              "Aus ungenutzten Dokumenten wurde lebendiges Wissen mit deutlich effizienteren Abläufen.",
          },
          {
            image: "/aiio-pages/success-stories/image-04.jpg",
            title: "Windpunx",
            text:
              "Der Wechsel aus Signavio gelang in wenigen Wochen und wurde durch KI-Unterstützung beschleunigt.",
          },
          {
            image: "/aiio-pages/success-stories/image-06.jpeg",
            title: "HVLE",
            text:
              "Auditfähigkeit und Verbesserungsarbeit wurden in einem integrierten Managementsystem verbunden.",
          },
          {
            image: "/aiio-pages/success-stories/image-08.jpeg",
            title: "ABB Busch-Jaeger",
            text:
              "Soll- und Ist-Prozesse wurden harmonisiert, damit Prozessanalyse belastbarer wird.",
          },
        ],
      },
      {
        title: "Häufige Fragen aus Projekten.",
        items: [
          "Was unterscheidet aiio von Zeichen-Tools? aiio erzeugt ein nutzbares Datenmodell statt nur Prozessbilder.",
          "Was passiert mit bestehenden Dokumenten? Sie werden angebunden, auffindbar und weiter nutzbar.",
          "Wie schnell entstehen erste Ergebnisse? Schon der erste modellierte Prozess kann neue Erkenntnisse liefern.",
        ],
      },
    ],
  },
  "product-news": {
    eyebrow: "Feature Newsletter",
    title: "Produktupdates direkt in dein Postfach.",
    intro:
      "Der Feature Newsletter informiert über neue Funktionen, Produktverbesserungen und Tipps für Prozess-Champions.",
    heroImage: "/aiio-architecture.png",
    heroImageAlt: "aiio Systembild mit drei Ebenen als Newsletter-Motiv.",
    form: {
      buttonLabel: "Newsletter-Anfrage vorbereiten",
      copy:
        "Trage deine Daten ein, damit eine Newsletter-Anfrage per E-Mail vorbereitet wird.",
      interestLabel: "Welche Updates interessieren dich?",
      recipient: "academy@aiio.de",
      title: "Newsletter anmelden",
    },
    sections: [
      {
        title: "Bleibe nah an der Plattform.",
        items: [
          "Produktupdates und neue Features",
          "Hinweise für bessere Prozessarbeit",
          "Relevante Releases für Teams, die aiio aktiv nutzen",
        ],
      },
    ],
  },
  "partner-finden": {
    eyebrow: "Partner",
    title: "Ausgewählte Partner. Gemeinsame Vision.",
    intro:
      "aiio arbeitet mit spezialisierten Partnern für Prozessberatung, Automatisierung, KI, Compliance und Microsoft 365 zusammen.",
    heroImage: "/aiio-pages/partner-finden/image-02.png",
    heroImageAlt: "Team in einem Workshop vor einem Whiteboard.",
    cta: { href: "/kontakt", label: "Partneranfrage stellen" },
    form: {
      ...standardContactForm,
      interestLabel: "Ich suche Unterstützung für",
      title: "Partnerkontakt",
    },
    sections: [
      {
        eyebrow: "Expertise",
        title: "Vernetzt denken. Spezialisiert handeln.",
        items: [
          "Organisations- und Prozessberatung",
          "Automatisierungsberatung und KI-Beratung",
          "Compliance-Beratung und Zertifizierung",
          "Microsoft 365, Apps und Dokumentensteuerung",
        ],
      },
      {
        title: "Partnernetzwerk",
        cards: [
          {
            image: "/aiio-pages/partner-finden/image-03.png",
            title: "BPM&O",
            text:
              "Managementberatung für prozessorientierte Organisationen und 360° BPM.",
          },
          {
            image: "/aiio-pages/partner-finden/image-04.png",
            title: "Fink Digital Solutions",
            text:
              "BPM-Beratung, Prozesslandkarten, KI im BPM und Qualitätssicherung.",
          },
          {
            image: "/aiio-pages/partner-finden/image-07.png",
            title: "T&O Group",
            text:
              "Digitalisierung, Prozesslandschaften und nachhaltige Verankerung im Unternehmen.",
          },
          {
            image: "/aiio-pages/partner-finden/image-12.png",
            title: "ipu fit for success",
            text:
              "Beratung und Training zu Managementsystemen, Nachhaltigkeit und Prozessmanagement.",
          },
        ],
      },
    ],
  },
  blog: {
    eyebrow: "Blog & News",
    title: "Volle Power für Organizational Intelligence.",
    intro:
      "Der Blog bündelt Beiträge zu KI, Prozessanalyse, Organisationsentwicklung und Produktneuigkeiten.",
    heroImage: "/aiio-architecture.png",
    heroImageAlt: "aiio Systembild als Motiv für Blog und News.",
    cta: { href: "/platform/product-news", label: "Feature Newsletter ansehen" },
    sections: [
      {
        eyebrow: "Aktuelle Themen",
        title: "Beiträge, die zur neuen Markenstory passen.",
        cards: [
          {
            eyebrow: "AI",
            title: "Warum Enterprise AI ohne Organizational Intelligence scheitert",
            text: "Einordnung, warum KI erst mit Organisationskontext wirksam wird.",
          },
          {
            eyebrow: "AI",
            title: "KI-Tools für die Prozessanalyse",
            text: "Von Process Mining bis Anomalie-Erkennung: welche Werkzeuge welche Rolle spielen.",
          },
          {
            eyebrow: "Organisationsentwicklung",
            title: "Was ist Organizational Intelligence?",
            text: "Warum der Begriff 2026 der richtige Rahmen für bessere Organisationen ist.",
          },
          {
            eyebrow: "Prozessmanagement",
            title: "Prozessoptimierung mit KI",
            text: "Wie intelligente Systeme das Prozessmanagement verändern.",
          },
        ],
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: getEditableContent("resource.services.title", "Werdet zu Prozessexperten."),
    intro: getEditableContent(
      "resource.services.intro",
      "Die aiio Services ergänzen kostenlose Lernangebote um Schulungen, Refresher und vertiefende Begleitung.",
    ),
    heroImage: "/aiio-pages/services/image-02.jpg",
    heroImageAlt: "Reisende als Bildmotiv für Services und Schulungen.",
    form: {
      ...standardContactForm,
      interestLabel: "Gewünschter Service",
      title: "Service anfragen",
    },
    sections: [
      {
        title: "Schulungen und Begleitung",
        cards: [
          {
            image: "/aiio-pages/services/image-02.jpg",
            title: "Einführungsschulung",
            text:
              "Drei Stunden Online-Schulung für die wichtigsten Funktionen und einen sicheren Start.",
          },
          {
            image: "/aiio-pages/services/image-04.jpg",
            title: "BPMN Modellierung lernen",
            text:
              "Strukturiert modellieren mit BPMN, Swimlanes und modernen Modellierungsansätzen.",
          },
          {
            image: "/aiio-pages/services/image-05.jpg",
            title: "Refresher",
            text:
              "Wissen auffrischen, neue Funktionen verstehen und offene Fragen klären.",
          },
          {
            image: "/aiio-pages/services/image-06.jpg",
            title: "Schulungsbundle",
            text:
              "Vier flexible Online-Schulungen für Teams, die gezielt Know-how aufbauen möchten.",
          },
        ],
      },
    ],
  },
  downloadcenter: {
    eyebrow: "Downloadcenter",
    title: getEditableContent(
      "resource.downloadcenter.title",
      "Die wichtigsten Dokumente rund um aiio.",
    ),
    intro: getEditableContent(
      "resource.downloadcenter.intro",
      "Das Downloadcenter bündelt Vertragsunterlagen, Sicherheitsinformationen, Auftragsverarbeitung und technische App-Downloads.",
    ),
    heroImage: "/aiio-architecture-stack-output-v3.png",
    heroImageAlt: "aiio Hero-Systembild mit ProcessCollector, ProcessMagnet und ProcessForge.",
    cta: { href: "/kontakt", label: "Dokument anfragen" },
    sections: [
      {
        title: "Dokumentbereiche",
        cards: [
          {
            title: "Allgemeine Bedingungen",
            text:
              "SaaS-Bereitstellung, Auftragsverarbeitung und Funktionsbeschreibung für aiio.",
          },
          {
            title: "Unterstützende Dienstleistungen",
            text:
              "Allgemeine Auftragsbedingungen für Schulungen, Workshops und begleitende Leistungen.",
          },
          {
            title: "Technische Sicherheit",
            text:
              "Betriebs- und Sicherheitskonzept sowie Informationen zu Unterauftragsverarbeitern.",
          },
          {
            title: "aiio Teams App",
            text:
              "Download und Hinweise zur Nutzung von aiio in Microsoft Teams.",
          },
        ],
      },
    ],
  },
  support: {
    eyebrow: "Support",
    title: "Technische und fachliche Unterstützung.",
    intro:
      "Der Support hilft bei offenen Fragen, technischen Problemen und Konfigurationen rund um aiio.",
    heroImage: "/aiio-pages/support/image-02.png",
    heroImageAlt: "Screenshot des Azure-Portals für Support-Hinweise.",
    form: {
      ...standardContactForm,
      interestLabel: "Support-Thema",
      recipient: "support@aiio.de",
      title: "Supportformular",
    },
    sections: [
      {
        title: "Häufige Lösung: Azure-Berechtigungen",
        items: [
          "Im Azure Portal das Active Directory öffnen.",
          "Zu Unternehmensanwendungen wechseln und aiio auswählen.",
          "In der aiio-Anwendung die Berechtigungen öffnen und Admin-Zustimmung erteilen.",
          "Die Abfrage bestätigen und bei Problemen den Support kontaktieren.",
        ],
      },
      {
        title: "Direkter Kontakt",
        items: ["support@aiio.de", "0391 251 948 63"],
      },
    ],
  },
  "demo-kontakt": {
    eyebrow: "Expertengespräch",
    title: "Lass uns über deine Prozesse sprechen.",
    intro:
      "Im Gespräch geht es um eure konkreten Herausforderungen, das mögliche ROI-Potenzial und einen Blick ins Live-System.",
    heroImage: "/aiio-pages/demo-kontakt/image-02.jpg",
    heroImageAlt: "Sales-Ansprechpartner von aiio.",
    form: {
      ...standardContactForm,
      interestLabel: "Thema für das Gespräch",
      title: "Expertengespräch anfragen",
    },
    sections: [
      {
        title: "Was dich im Gespräch erwartet",
        items: [
          "Ein persönliches Gespräch über konkrete organisatorische Herausforderungen.",
          "Ein Blick ins Live-System statt Präsentationsfolien.",
          "Eine erste Einschätzung, wie aiio und KI eure Abläufe verbessern können.",
          "Kostenfrei, unverbindlich und auf eure Themen zugeschnitten.",
        ],
      },
    ],
  },
  testen: {
    eyebrow: "Kostenlose Testversion",
    title: "Erfahre in 14 Tagen, wie aiio eure Probleme löst.",
    intro:
      "Die Testphase gibt deinem Team Zugriff auf aiio, damit Prozesse modelliert, Wissen erfasst und KI-Funktionen ausprobiert werden können.",
    heroImage: "/aiio-architecture.png",
    heroImageAlt: "aiio Systembild als Motiv für die Testphase.",
    form: {
      ...standardContactForm,
      buttonLabel: "Testphase vorbereiten",
      interestLabel: "Teamgröße und Ziel",
      title: "Testphase anfragen",
    },
    sections: [
      {
        title: "Was in der Testphase möglich ist",
        items: [
          "Uneingeschränkte Vollversion für den Einstieg",
          "Volle KI-Power für Prozesse",
          "Unbegrenzte Lizenzen während der Testphase",
          "Microsoft Teams Integration und direkte Dokumentenverknüpfung",
          "Prozesse digital aufnehmen und Organigramme erstellen",
        ],
      },
      {
        title: "Noch nicht bereit?",
        copy:
          "Die interaktiven Demos zeigen die wichtigsten Funktionen ohne Anmeldung.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pakete",
    title: "Deine Prozesse. Dein aiio.",
    intro:
      "Die Pakete Exploration, Transformation und Excellence bauen aufeinander auf und orientieren sich am Reifegrad der Organisation.",
    heroImage: "/aiio-pages/pricing/image-05.jpg",
    heroImageAlt: "KI-inspiriertes Bildmotiv aus der Preis-Seite.",
    cta: { href: "/kostenlose-testversion/anmelden", label: "Kostenlosen Test starten" },
    sections: [
      {
        eyebrow: "Startpunkte",
        title: "Vom Einstieg bis zur kontinuierlichen Optimierung.",
        cards: [
          {
            title: "Exploration",
            text:
              "Prozesse und Wissen importieren, verstehen und mit KI erste Verbesserungsvorschläge erzeugen.",
          },
          {
            title: "Transformation",
            text:
              "Abläufe optimieren, externe Partner einbinden und Organisationsänderungen KI-gestützt beschreiben.",
          },
          {
            title: "Excellence",
            text:
              "Reife Prozesse kontinuierlich optimieren, APIs anbinden und Reporting sowie Premium Support nutzen.",
          },
        ],
      },
      {
        title: "Häufige Fragen",
        items: [
          "Die ersten 25 Lizenzen sind in den Standard-Konfigurationen bereits mitgedacht.",
          "aiio läuft in der Microsoft 365-Umgebung und verursacht keinen klassischen Installationsaufwand.",
          "Monatliche und jährliche Vertragslaufzeiten sind möglich.",
        ],
      },
    ],
  },
  "release-notes": {
    eyebrow: "Release Notes",
    title: "Alle Updates zu aiio.",
    intro:
      "Die Release Notes geben einen Überblick über neue Funktionen, Verbesserungen und wichtige Produktänderungen.",
    heroImage: "/aiio-architecture.png",
    heroImageAlt: "aiio Systembild als Motiv für Release Notes.",
    cta: { href: "/platform/product-news", label: "Newsletter abonnieren" },
    sections: [
      {
        title: "Aktuelle Updates",
        cards: [
          {
            eyebrow: "September 2025",
            title: "Compliance, Datenschutz und Schnelligkeit",
            text:
              "Zielgruppenadressierung, Volltextsuche und übersichtlichere Prozesse.",
          },
          {
            eyebrow: "Juni 2025",
            title: "Neuer Look und einfaches Verstehen",
            text:
              "Mehrstufige Organigramme, Aktivitätstypen und ein Ausblick auf die Zukunft von aiio.",
          },
          {
            eyebrow: "April 2025",
            title: "Von Suche zu Klarheit",
            text:
              "Ressourcenübersicht, tiefere SharePoint-Integration und KI-Priorisierung.",
          },
          {
            eyebrow: "Oktober 2024",
            title: "KI-Prozessbeschreibungen",
            text:
              "Mehr KI, Google Gemini und Verbesserungen an der Funktionsleiste.",
          },
        ],
      },
    ],
  },
  kontakt: {
    eyebrow: "Kontakt",
    title: getEditableContent("resource.kontakt.title", "Sprich uns an - wir helfen gern."),
    intro: getEditableContent(
      "resource.kontakt.intro",
      "Das aiio Team beantwortet Fragen zu Plattform, Zusammenarbeit, Services, Support und Organisationsentwicklung.",
    ),
    heroImage: "/aiio-pages/kontakt/jobst-dog-contact.png",
    heroImageAlt: "Hund mit aiio Sonnenbrille vor Laptop und aiio Logo.",
    form: standardContactForm,
    sections: [
      {
        title: "So erreichst du uns",
        items: [
          "+49 391 251 948 79",
          "info@aiio.de",
          "aiio GmbH | Klausenerstraße 10a | 39112 Magdeburg | Germany",
        ],
      },
    ],
  },
  presse: {
    eyebrow: "Presse",
    title: "Presse-Kit für aiio.",
    intro:
      "Informationen, Bildmaterial, Zitate und Ansprechpartner für Berichte rund um aiio und moderne Organisation im KI-Zeitalter.",
    heroImage: "/aiio-pages/presse/image-12.jpg",
    heroImageAlt: "Bildmotiv aus dem aiio Presse-Kit.",
    cta: { href: "/kontakt", label: "Pressekontakt aufnehmen" },
    sections: [
      {
        title: "Das Wichtigste vorweg",
        items: [
          "aiio steht für moderne Organisation im KI-Zeitalter.",
          "Die aiio GmbH wurde 2022 aus der Lintra plus GmbH neu ausgerichtet.",
          "aiio entwickelt Prozessmanagement-Software und Organizational Intelligence Lösungen.",
          "Mehr als 30 Mitarbeitende arbeiten am Standort Magdeburg.",
        ],
      },
      {
        title: "USPs",
        cards: [
          {
            title: "Schlank und günstig",
            text:
              "aiio fokussiert auf schnelle Nutzbarkeit und ein klares Kosten-Nutzen-Verhältnis.",
          },
          {
            title: "Kaum Implementierungsaufwand",
            text:
              "Teams können ohne langes Projekt-Setup in der Microsoft 365-Umgebung starten.",
          },
          {
            title: "Einfach zu bedienen",
            text:
              "Leicht verständliche Oberflächen und Lerninhalte statt schwerer Handbücher.",
          },
          {
            title: "Microsoft Teams Integration",
            text:
              "aiio lässt sich als Webanwendung und Teams App in den Arbeitsalltag integrieren.",
          },
        ],
      },
      {
        title: "Pressekontakte",
        items: [
          "Jobst von Heintze | Head of Marketing & Kommunikation | jobst.von.heintze@aiio.de",
          "Leonard Köchli | Digital Marketing & Social Media | leonard.koechli@aiio.de",
        ],
      },
    ],
  },
  facts: {
    eyebrow: "Facts",
    title: "Reference Pages für aiio.",
    intro:
      "Die Facts-Seite bündelt indexierbare Kurzprofile zur aiio GmbH, zur Plattform und zu zentralen Konzepten.",
    heroImage: "/aiio-architecture.png",
    heroImageAlt: "aiio Systembild als Facts-Motiv.",
    sections: [
      {
        title: "Facts Index",
        cards: [
          {
            title: "aiio GmbH",
            text:
              "Unternehmensprofil, Standort, Historie und Ansprechpartner für externe Systeme.",
          },
          {
            title: "OIS - Das Organizational Intelligence System",
            text:
              "Kurzbeschreibung der Plattform als integriertes Organizational Intelligence System.",
          },
          {
            title: "Prozess-Staubsauger",
            text:
              "Einstieg in die menschenlesbare Organisationsrepräsentation und das Organizational Intelligence System.",
          },
        ],
      },
    ],
  },
  datenschutz: {
    eyebrow: "Datenschutz",
    title: "Datenschutzhinweise der aiio GmbH.",
    intro:
      "Diese lokale Seite bündelt die wichtigsten Datenschutzinformationen für Kontakt, Webseitenbesuch und geschäftliche Kommunikation.",
    heroImage: "/aiio-architecture.png",
    heroImageAlt: "aiio Systembild als Datenschutz-Motiv.",
    sections: [
      {
        title: "Verantwortliche Stelle",
        items: [
          "aiio GmbH, Klausenerstraße 10a, 39112 Magdeburg",
          "Telefon: 0391 251 948 79",
          "E-Mail: info@aiio.de",
        ],
      },
      {
        title: "Datenschutzbeauftragte",
        items: [
          "Mandy Herrmann, LGD Datenschutz GmbH",
          "Rogätzer Straße 8, 39106 Magdeburg",
          "E-Mail: datenschutz@lgd-data.de",
        ],
      },
      {
        title: "Worum es bei der Verarbeitung geht",
        items: [
          "Bearbeitung von Anfragen über Telefon, E-Mail, Brief oder Kontaktformular.",
          "Technischer Betrieb der Webseite und Auswertung von Störungen.",
          "Einwilligungsverwaltung, Analyse- und Marketingdienste, soweit sie aktiv genutzt werden.",
          "Kommunikation im Rahmen bestehender oder angebahnter Geschäftsbeziehungen.",
        ],
      },
    ],
  },
  impressum: {
    eyebrow: "Impressum",
    title: "Angaben gemäß Anbieterkennzeichnung.",
    intro:
      "Die wichtigsten Unternehmens- und Registerangaben der aiio GmbH.",
    heroImage: "/aiio-architecture.png",
    heroImageAlt: "aiio Systembild als Impressum-Motiv.",
    sections: [
      {
        title: "aiio GmbH",
        items: [
          "Klausenerstraße 10a, 39112 Magdeburg, Germany",
          "Telefon: +49 391 251 948 79",
          "E-Mail: info@aiio.de",
          "Vertretungsberechtigte: Dr. Christian Graup, Knut Köchli, Jobst von Heintze, Lars Bendler",
          "Amtsgericht Stendal, HRB 6552",
          "Umsatzsteueridentifikationsnummer: DE 254461500",
        ],
      },
      {
        title: "Hinweise",
        items: [
          "Die Inhalte des Onlineangebotes werden mit Sorgfalt erstellt.",
          "Für externe Links sind die jeweiligen Anbieter verantwortlich.",
          "Marken- und Urheberrechte Dritter bleiben unberührt.",
        ],
      },
    ],
  },
};

function editableResourceText(slug: ResourceSlug, field: string, fallback: string) {
  return getEditableContent(`resource.${slug}.${field}`, fallback);
}

function getResourceSectionId(slug: ResourceSlug, sectionIndex: number) {
  return `${slug}-section-${sectionIndex + 1}`;
}

function ResourceForm({
  form,
  id,
  slug,
}: {
  form: ResourceForm;
  id: string;
  slug: ResourceSlug;
}) {
  const formTitle = editableResourceText(slug, "form.title", form.title);
  const formCopy = editableResourceText(slug, "form.copy", form.copy);
  const interestLabel = editableResourceText(
    slug,
    "form.interestLabel",
    form.interestLabel ?? "Anliegen",
  );
  const buttonLabel = editableResourceText(slug, "form.buttonLabel", form.buttonLabel);

  return (
    <section className="resource-form-section" id={id}>
      <div>
        <p className="eyebrow">Formular</p>
        <h2>{formTitle}</h2>
        <p>{formCopy}</p>
      </div>
      <form
        action={`mailto:${form.recipient}`}
        className="resource-form"
        encType="text/plain"
        method="post"
      >
        <label>
          Name
          <input name="Name" placeholder="Vor- und Nachname" required />
        </label>
        <label>
          E-Mail
          <input name="E-Mail" placeholder="name@unternehmen.de" required type="email" />
        </label>
        <label>
          Unternehmen
          <input name="Unternehmen" placeholder="Unternehmen" />
        </label>
        <label>
          {interestLabel}
          <input name="Anliegen" placeholder="Kurz einordnen" />
        </label>
        <label className="resource-form-wide">
          Nachricht
          <textarea name="Nachricht" placeholder="Worum geht es?" rows={5} />
        </label>
        <label className="resource-check">
          <input name="Datenschutz" required type="checkbox" value="akzeptiert" />
          <span>Ich bin damit einverstanden, dass aiio meine Angaben zur Bearbeitung der Anfrage nutzt.</span>
        </label>
        <button className="button" type="submit">
          {buttonLabel}
        </button>
      </form>
    </section>
  );
}

function ResourceCardList({
  cards,
  sectionIndex,
  slug,
}: {
  cards: ResourceCard[];
  sectionIndex: number;
  slug: ResourceSlug;
}) {
  return (
    <div className="resource-card-grid">
      {cards.map((card, cardIndex) => {
        const cardTitle = editableResourceText(
          slug,
          `section.${sectionIndex}.card.${cardIndex}.title`,
          card.title,
        );
        const cardEyebrow = card.eyebrow
          ? editableResourceText(
              slug,
              `section.${sectionIndex}.card.${cardIndex}.eyebrow`,
              card.eyebrow,
            )
          : null;
        const linkLabel = card.linkLabel
          ? editableResourceText(
              slug,
              `section.${sectionIndex}.card.${cardIndex}.linkLabel`,
              card.linkLabel,
            )
          : null;

        return (
          <article className="resource-card" key={`${sectionIndex}-${cardIndex}`}>
            {card.image ? (
              <span
                aria-label={cardTitle}
                className="resource-card-image"
                role="img"
                style={{ backgroundImage: `url(${card.image})` }}
              />
            ) : null}
            {cardEyebrow ? <span>{cardEyebrow}</span> : null}
            <h3>{cardTitle}</h3>
            <p>{card.text}</p>
            {card.href ? (
              <Link className="resource-text-link" href={card.href}>
                {linkLabel ?? "Mehr ansehen"}
              </Link>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export function ResourcePage({ slug }: { slug: ResourceSlug }) {
  const page = resourcePages[slug];
  const pageEyebrow = editableResourceText(slug, "eyebrow", page.eyebrow);
  const pageTitle = editableResourceText(slug, "title", page.title);
  const pageIntro = editableResourceText(slug, "intro", page.intro);
  const ctaLabel = page.cta ? editableResourceText(slug, "cta.label", page.cta.label) : null;
  const sectionNavigator: EditorialSectionNavigatorItem[] = [
    { id: `${slug}-hero`, label: "Hero" },
    ...page.sections.map((section, sectionIndex) => ({
      id: getResourceSectionId(slug, sectionIndex),
      label: section.eyebrow ?? section.title,
    })),
    ...(page.form ? [{ id: `${slug}-form`, label: "Contact" }] : []),
  ];

  return (
    <main className="resource-page">
      <MainHeader variant="solid" />
      <section className="resource-hero" id={`${slug}-hero`}>
        <div className="resource-hero-copy">
          <p className="eyebrow">{pageEyebrow}</p>
          <h1>{pageTitle}</h1>
          <div className="resource-hero-intro rich-text">
            <RichText html={pageIntro} />
          </div>
          {page.cta ? (
            <Link className="button" href={page.cta.href}>
              {ctaLabel}
            </Link>
          ) : null}
        </div>
        {page.heroImage ? (
          <div
            aria-label={page.heroImageAlt ?? pageTitle}
            className="resource-hero-media"
            role="img"
            style={{ backgroundImage: `url(${page.heroImage})` }}
          />
        ) : null}
      </section>

      {page.sections.map((section, sectionIndex) => {
        const sectionTitle = editableResourceText(
          slug,
          `section.${sectionIndex}.title`,
          section.title,
        );
        const sectionEyebrow = section.eyebrow
          ? editableResourceText(slug, `section.${sectionIndex}.eyebrow`, section.eyebrow)
          : null;
        const sectionCopy = section.copy
          ? editableResourceText(slug, `section.${sectionIndex}.copy`, section.copy)
          : null;

        return (
          <section
            className="resource-section"
            id={getResourceSectionId(slug, sectionIndex)}
            key={sectionIndex}
          >
            <div className="resource-section-heading">
              {sectionEyebrow ? <p className="eyebrow">{sectionEyebrow}</p> : null}
              <h2>{sectionTitle}</h2>
              {sectionCopy ? <p>{sectionCopy}</p> : null}
            </div>
            {section.items ? (
              <ul className="resource-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.cards ? (
              <ResourceCardList cards={section.cards} sectionIndex={sectionIndex} slug={slug} />
            ) : null}
          </section>
        );
      })}

      {page.form ? <ResourceForm form={page.form} id={`${slug}-form`} slug={slug} /> : null}
      <EditorialSectionNavigator
        ariaLabel={`${pageTitle} sections`}
        sections={sectionNavigator}
      />
    </main>
  );
}
