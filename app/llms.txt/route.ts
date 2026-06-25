import { siteUrl } from "../site-url";

const pages = [
  ["/", "Startseite: OIS-Story, Hero, Systemlogik und Layerreise."],
  ["/about-us", "Unternehmen, Management, Historie, Auszeichnungen und Vision."],
  ["/collector", "ProcessCollector als Grounding Layer und Wissensbasis."],
  ["/magnet", "ProcessMagnet als Recognition Layer fuer Prozesserkennung."],
  ["/forge", "ProcessForge als Activation Layer fuer Agenten, APIs und Umsysteme."],
  ["/success-stories", "Kundenbeispiele und Wirkung von aiio."],
  ["/downloadcenter", "Dokumente, Sicherheit, AVV und technische Downloads."],
  ["/kontakt", "Kontakt und Anfragewege."],
] as const;

export function GET() {
  const body = `# aiio Branding Seite

> aiio positioniert das OIS als Organizational Intelligence System: Wissen sichern, Prozesse erkennen und Wissen aktivieren.

## Zentrale Story

aiio verbindet ProcessCollector, ProcessMagnet und ProcessForge zu einem aufbauenden Produkt-Stack. Jede Loesung ist eigenstaendig nutzbar und wird bei wachsendem Anspruch zur tragenden Schicht der naechsten Loesung.

## Produkt-Stack

- ProcessCollector: Grounding Layer. Sammelt und strukturiert Organisationswissen, Prozesse, Rollen, Organigramme, Dokumente, Regelwerke und Entscheidungen.
- ProcessMagnet: Recognition Layer. Ueberfuehrt unstrukturierte Inhalte wie Dokumente, E-Mails, Transkripte, Legacy-Systeme, Bilder oder Videos in wertorientierte und BPMN-konforme Prozess- und Organisationsmodelle.
- ProcessForge: Activation Layer. Transformiert geschmiedetes Organisationswissen in unterschiedliche Ausgabeformate und verteilt es ueber Agenten, APIs, MCP, Chats und Umsysteme.

## Wichtige Seiten

${pages.map(([path, description]) => `- [${siteUrl}${path}](${siteUrl}${path}): ${description}`).join("\n")}

## Analysehinweise fuer ChatGPT

- Fokus: Dachmarken-Website fuer aiio, nicht reine Produktvergleichsseite.
- Kernfrage: Wie wird aus Organisationswissen ein wirksames Organizational Intelligence System?
- Architektur: ProcessCollector unten, ProcessMagnet in der Mitte, ProcessForge oben.
- Wording: Wissen sichern, Prozesse erkennen, Wissen aktivieren.
- Markenfarbe: #5A328A.
- Sprache: Deutsch.

## Crawl-Hinweise

- Sitemap: ${siteUrl}/sitemap.xml
- Robots: ${siteUrl}/robots.txt
`;

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
