# aiio Branding Seite

Sites/Vinext-Entwurf für die aiio-Dachmarken-Website.

Die Seite erzählt aiio als vertikale Reise:

- Wissen erfassen: ProcessCollector als Grounding Layer
- Organisation verstehen: ProcessMagnet als Understanding Layer
- Organisation verändern: ProcessForge als Transformation Layer

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

In dieser Umgebung ist Node.js aktuell nicht im Systempfad verfügbar. Sobald
Node.js installiert oder im Terminal verfügbar ist, können die Befehle oben für
lokale Vorschau und Build-Prüfung verwendet werden.

## Struktur

- `app/page.tsx`: Startseite mit Hero, Architektur, Layern und Demo-Band
- `app/collector`, `app/magnet`, `app/forge`: Detailpfade für die drei Layer
- `app/site-content.ts`: zentrale Inhalte für die Markenreise
- `public/aiio-architecture.png`: generiertes Hero-Asset
- `.openai/hosting.json`: Sites-Konfiguration ohne D1/R2-Bindings

## Useful Commands

- `npm run dev`: lokale Entwicklung starten
- `npm run build`: Vinext-Build prüfen
- `npm run db:generate`: Drizzle-Migrationen erzeugen, falls später D1 genutzt wird
