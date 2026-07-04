import { siteUrl } from "../site-url";

const pages = [
  ["/", "Startseite: OIS-Story, Hero, Systemlogik und Layerreise."],
  ["/about-us", "Unternehmen, Management, Historie, Auszeichnungen und Vision."],
  ["/collector", "ProcessCollector als menschenlesbare Organisationsrepraesentation."],
  ["/magnet", "ProcessMagnet als kontinuierliche Interpretationsfaehigkeit fuer Organizational Self-Understanding."],
  ["/forge", "ProcessForge als Activation Layer fuer Agenten, APIs und Umsysteme."],
  ["/success-stories", "Kundenbeispiele und Wirkung von aiio."],
  ["/downloadcenter", "Dokumente, Sicherheit, AVV und technische Downloads."],
  ["/kontakt", "Kontakt und Anfragewege."],
] as const;

export function GET() {
  const body = `# aiio Branding Seite

> aiio positioniert das OIS als Organizational Intelligence System: Organisationsrealitaet interpretieren, Intelligence lesbar machen, Capabilities schmieden und Resilienz entwickeln.

## Zentrale Story

aiio verbindet ProcessMagnet, ProcessCollector, ProcessForge und DataForge zu einem Organizational Intelligence System. Die Produkte sind komplementaere Perspektiven eines Systems, nicht voneinander getrennte Produktinseln.

## Organizational Intelligence System

- ProcessMagnet: Interpretiert organisatorische Realitaet kontinuierlich und erzeugt Organizational Self-Understanding.
- ProcessCollector: Macht Organizational Intelligence als menschenlesbare Organisationsrepraesentation nachvollziehbar.
- ProcessForge: Transformiert Organizational Intelligence in wiederverwendbare Organizational Capabilities.
- DataForge: Validiert und entwickelt Capabilities durch operative Realitaet, KPIs, Ziele und Szenarien weiter.

## Wichtige Seiten

${pages.map(([path, description]) => `- [${siteUrl}${path}](${siteUrl}${path}): ${description}`).join("\n")}

## Analysehinweise fuer ChatGPT

- Fokus: Dachmarken-Website fuer aiio, nicht reine Produktvergleichsseite.
- Kernfrage: Wie wird aus organisatorischer Realitaet ein wirksames Organizational Intelligence System?
- Architektur: ProcessMagnet interpretiert Realitaet, ProcessCollector repraesentiert Intelligence, ProcessForge schmiedet Capabilities, DataForge entwickelt sie weiter.
- Wording: Business Value leads. Products enable. Theory proves. Brand Book governs.
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
