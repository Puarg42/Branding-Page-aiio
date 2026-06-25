export type LayerSlug = "collector" | "magnet" | "forge";

export const layers = [
  {
    slug: "collector",
    stage: "COLLECT",
    layerName: "Grounding Layer",
    product: "ProcessCollector",
    verb: "Wissen erfassen",
    headline: "Der gemeinsame Boden für jede KI-gestützte Veränderung.",
    summary:
      "ProcessCollector macht implizites Prozesswissen sichtbar und schafft den belastbaren Einstieg in den aiio Produkt-Stack.",
    promise:
      "Transparenz entsteht dort, wo Menschen ihr Wissen strukturiert teilen und die Organisation daraus ein gemeinsames Bild gewinnt.",
    detail:
      "Der Grounding Layer sammelt Prozesswissen direkt aus der Organisation, verbindet es mit Rollen, Systemen und Abhängigkeiten und macht es für weitere KI-gestützte Schritte nutzbar.",
    outcomes: [
      "Prozesswissen wird auffindbar, vergleichbar und anschlussfähig.",
      "Fachbereiche behalten die Nähe zur Realität ihrer Arbeit.",
      "Die Plattform erhält den Kontext, den Recognition und Activation brauchen.",
    ],
    modules: [
      "Geführte Wissenserfassung",
      "Prozess- und Rollenstruktur",
      "Validierung mit Fachbereichen",
    ],
  },
  {
    slug: "magnet",
    stage: "RECOGNIZE",
    layerName: "Recognition Layer",
    product: "ProcessMagnet",
    verb: "Prozessrealität modellieren",
    headline: "Aus multimodalen Inhalten werden BPMN-konforme Modelle.",
    summary:
      "ProcessMagnet überführt Dokumente, E-Mails, Transkripte, Legacy-Systeme und perspektivisch Video in klare, wertorientierte und BPMN-konforme Prozess- und Organisationsmodelle.",
    promise:
      "Recognition entsteht, wenn multimodale Inhalte automatisch oder durch Analysten gelenkt in belastbare Modelle übersetzt werden.",
    detail:
      "Der Recognition Layer nutzt Multimodal Retrieval, um Prozesskandidaten, Varianten, Rollen und Organisationsbezüge zu erkennen. ProcessCollector ist Single Point of Truth: Inhalte, Modelle und Regelwerke werden als Handlungsbasis und Protokollschicht für Entscheidungen der KI-Agenten genutzt.",
    outcomes: [
      "Multimodale Quellen werden zu BPMN-konformen Prozess- und Organisationsmodellen.",
      "Analysten können den automatischen Erkenntnisprozess lenken und validieren.",
      "ProcessCollector bleibt Handlungsbasis und Protokollschicht für KI-Agenten.",
    ],
    modules: [
      "Multimodal Retrieval",
      "BPMN-konforme Modelle",
      "Single Point of Truth",
    ],
  },
  {
    slug: "forge",
    stage: "ACTIVATE",
    layerName: "Activation Layer",
    product: "ProcessForge",
    verb: "Organisation verändern",
    headline: "Geschmiedetes Organisationswissen wird aktiviert.",
    summary:
      "ProcessForge ist der KI-driven Outlet für geschmiedetes Organisationswissen: Inhalte werden durch Agenten verwertet, in multimodale Ausgabeformate transformiert und an Umsysteme verteilt.",
    promise:
      "Activation beginnt dort, wo der Produkt-Stack seine Inhalte nicht nur erkennt und speichert, sondern in andere Systeme, Formate und Agentenflüsse bringt.",
    detail:
      "Der Activation Layer nutzt Multimodal Interaction, um geschmiedete Inhalte über Chat, API, MCP, Agenten, Automatisierungen und multimodale Ausgabeformate einmalig oder dauerhaft an Umsysteme zu verteilen.",
    outcomes: [
      "Geschürftes Wissen aus ProcessMagnet wird in verwertbare Outputs übersetzt.",
      "Agenten können Prozess- und Organisationswissen aktiv weiterverarbeiten.",
      "Umsysteme erhalten einmalig oder dauerhaft die passenden Formate und Kontexte.",
    ],
    modules: [
      "Multimodal Interaction",
      "Agenten, Chat, API und MCP",
      "Multimodale Ausgabeformate",
    ],
  },
] as const;

export const architecturePath = [
  { type: "Ausgangspunkt", label: "Wissen" },
  { type: "COLLECT", label: "ProcessCollector" },
  { type: "Ergebnis", label: "Strukturiertes Wissen" },
  { type: "RECOGNIZE", label: "ProcessMagnet" },
  { type: "Ergebnis", label: "BPMN-konforme Modelle" },
  { type: "ACTIVATE", label: "ProcessForge" },
] as const;

export const operatingModel = [
  {
    title: "Grounding zuerst",
    copy:
      "ProcessCollector ist ein eigenständiger Einstieg und zugleich die Grundlage jeder weiteren Schicht: Single Point of Truth, Wissensbasis und Protokoll.",
  },
  {
    title: "Recognition als Erweiterung",
    copy:
      "ProcessMagnet erweitert den Collector, wenn multimodale Inhalte in BPMN-konforme Prozess- und Organisationsmodelle überführt werden sollen.",
  },
  {
    title: "Activation mit Anschluss",
    copy:
      "ProcessForge aktiviert die geschmiedeten Inhalte und verteilt sie über Agenten, Chat, API, MCP und Ausgabeformate an Umsysteme.",
  },
] as const;

export const platformPromises = [
  {
    title: "Transparenz",
    copy: "Was die Organisation weiß, wird sichtbar und teilbar.",
  },
  {
    title: "Recognition",
    copy: "Was sichtbar ist, wird zu BPMN-konformen Modellen und entscheidungsfähig.",
  },
  {
    title: "Aktivierung",
    copy: "Was geschmiedet ist, wird durch Agenten verwertet und an Umsysteme verteilt.",
  },
] as const;

export function getLayer(slug: LayerSlug) {
  return layers.find((layer) => layer.slug === slug)!;
}
