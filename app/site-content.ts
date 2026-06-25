export type LayerSlug = "collector" | "magnet" | "forge";

export const layers = [
  {
    slug: "collector",
    stage: "COLLECT",
    layerName: "Grounding Layer",
    product: "ProcessCollector",
    verb: "Organisationswissen erfassen",
    headline: "Organisationswissen erfassen und strukturieren.",
    summary:
      "ProcessCollector sammelt Wissen aus Dokumenten, Interviews, Prozessen und bestehenden Systemen und schafft daraus die belastbare Grundlage für KI-gestützte Organisationsarbeit.",
    promise:
      "ProcessCollector schafft den Grounding Layer des OIS: eine belastbare, strukturierte Wissensbasis für Menschen, KI-Agenten und bestehende Systeme.",
    detail:
      "Als Grounding Layer sammelt ProcessCollector Wissen aus Dokumenten, Interviews, Prozessen und bestehenden Systemen und macht es als gemeinsame Handlungsbasis nutzbar.",
    outcomes: [
      "Organisationswissen wird strukturiert, auffindbar und anschlussfähig.",
      "Dokumente, Interviews, Prozesse und bestehende Systeme werden zu einer gemeinsamen Wissensbasis.",
      "Die Grundlage für KI-gestützte Organisationsarbeit entsteht belastbar und nachvollziehbar.",
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
    layerName: "Understanding Layer",
    product: "ProcessMagnet",
    verb: "Zusammenhänge erkennen",
    headline: "Zusammenhänge, Prozesse und Potenziale erkennen.",
    summary:
      "ProcessMagnet analysiert die strukturierte Wissensbasis, erkennt Muster, Prozesszusammenhänge, Schwachstellen und Optimierungspotenziale – auf Basis des ProcessCollectors als Grounding Layer.",
    promise:
      "ProcessMagnet baut auf dem ProcessCollector auf und macht Muster, Prozesszusammenhänge und Optimierungspotenziale sichtbar.",
    detail:
      "Als Understanding Layer analysiert ProcessMagnet die strukturierte Wissensbasis und erkennt Muster, Prozesszusammenhänge, Schwachstellen und Optimierungspotenziale – auf Basis des ProcessCollectors als Grounding Layer.",
    outcomes: [
      "Muster und Prozesszusammenhänge werden aus der Wissensbasis sichtbar.",
      "Schwachstellen und Optimierungspotenziale werden erkennbar.",
      "ProcessCollector bleibt Grounding Layer für belastbare Analysen.",
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
    title: "Grounding zuerst",
    copy:
      "ProcessCollector ist ein eigenständiger Einstieg und zugleich die Grundlage jeder weiteren Schicht: Single Point of Truth, Wissensbasis und Protokoll.",
  },
  {
    title: "Understanding als Erweiterung",
    copy:
      "ProcessMagnet erweitert den Collector, wenn Zusammenhänge, Prozesse, Schwachstellen und Optimierungspotenziale erkannt werden sollen.",
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
