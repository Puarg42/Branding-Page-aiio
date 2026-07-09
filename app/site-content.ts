export type LayerSlug = "collector" | "magnet" | "forge";

export const layers = [
  {
    slug: "collector",
    stage: "COLLECT",
    layerName: "Human-readable Representation",
    product: "ProcessCollector",
    verb: "Organisationswissen erfassen",
    headline: "Organisationswissen erfassen und strukturieren.",
    summary:
      "ProcessCollector erstellt eine vertrauenswürdige, menschenlesbare Repräsentation der Organisation.",
    promise:
      "ProcessCollector macht Organizational Intelligence lesbar, nachvollziehbar und für Menschen sowie KI konsistent nutzbar.",
    detail:
      "ProcessCollector verbindet Dokumentation, Prozesse, Rollen, Regeln und Verantwortlichkeiten zu einer gemeinsamen Organisationsrepräsentation.",
    outcomes: [
      "Organisationswissen wird strukturiert, auffindbar und anschlussfähig.",
      "Dokumente, Interviews, Prozesse und bestehende Systeme werden zu einer gemeinsamen Wissensbasis.",
      "Die menschenlesbare Repräsentation der Organisation entsteht belastbar und nachvollziehbar.",
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
    layerName: "Self-Understanding Capability",
    product: "ProcessMagnet",
    verb: "Zusammenhänge erkennen",
    headline: "Zusammenhänge, Prozesse und Potenziale erkennen.",
    summary:
      "ProcessMagnet interpretiert organisatorische Realität kontinuierlich und verbindet Menschen, Systeme, Dokumente, Daten und Erfahrung.",
    promise:
      "ProcessMagnet erzeugt Organizational Self-Understanding, indem es organisatorische Realität kontinuierlich verbindet und interpretiert.",
    detail:
      "ProcessMagnet ist die interpretierende Fähigkeit des Organizational Intelligence Systems und macht organisatorische Zusammenhänge kontinuierlich nutzbar.",
    outcomes: [
      "Muster und Prozesszusammenhänge werden aus der Wissensbasis sichtbar.",
      "Schwachstellen und Optimierungspotenziale werden erkennbar.",
      "ProcessCollector macht die entstehende Organizational Intelligence menschenlesbar und nachvollziehbar.",
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
    verb: "Wissen aktivieren",
    headline: "Organisationswissen aktivieren und nutzbar machen.",
    summary:
      "ProcessForge macht Organisationswissen für KI-Agenten, Chats, APIs und bestehende Unternehmenssysteme nutzbar. So wird Wissen nicht nur dokumentiert, sondern aktiv in Arbeit und Entscheidungen eingebunden.",
    promise:
      "ProcessForge operationalisiert den OIS-Stack und bindet Organisationswissen aktiv in Arbeit, Entscheidungen und Umsysteme ein.",
    detail:
      "Als Activation Layer macht ProcessForge Organisationswissen für KI-Agenten, Chats, APIs und bestehende Unternehmenssysteme nutzbar. So wird Wissen nicht nur dokumentiert, sondern aktiv in Arbeit und Entscheidungen eingebunden.",
    outcomes: [
      "Organisationswissen wird für KI-Agenten, Chats, APIs und Umsysteme nutzbar.",
      "Wissen fließt aktiv in Arbeit und Entscheidungen ein.",
      "Bestehende Unternehmenssysteme werden mit aktivierbarer Organisationsintelligenz verbunden.",
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
    title: "Repräsentation zuerst",
    copy:
      "ProcessCollector ist ein eigenständiger Einstieg und zugleich die menschenlesbare Repräsentation der Organisation.",
  },
  {
    title: "Understanding als Erweiterung",
    copy:
      "ProcessMagnet interpretiert organisatorische Realität kontinuierlich und erzeugt Organizational Self-Understanding.",
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
    title: "Understanding",
    copy: "Was strukturiert ist, wird zu Zusammenhängen, Prozessen und Potenzialen.",
  },
  {
    title: "Aktivierung",
    copy: "Was geschmiedet ist, wird durch Agenten verwertet und an Umsysteme verteilt.",
  },
] as const;

export function getLayer(slug: LayerSlug) {
  return layers.find((layer) => layer.slug === slug)!;
}
