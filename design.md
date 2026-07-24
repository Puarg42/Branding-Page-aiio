# aiio branding page — Typografie-System

**Dokument:** design.md · Typografie
**Version:** 1.0 · 2026-07-24
**Status:** Abgenommen per Screenshot (Mockup v2, System B „Swiss")
**Scope:** Nur Typografie. Farben, Layoutraster, Motion → separates Dokument.

---

## 1. Designabsicht

Modern Brutalism mit C-Level-Disziplin: **„Shout the thesis, whisper the argument."**
Die Wirkung entsteht durch Setzung (Skala, Gewicht, enge Zurichtung, Mono-Metadaten), nicht durch dekorative Fonts. Drei typografische Stimmen, streng getrennt:

| Stimme | Aufgabe | Charakter |
|---|---|---|
| **Display** | Thesen, Hero, Sektionstitel, Ghost-Ziffern | laut, eng, uppercase |
| **Body** | Argumente, Fließtext, Ledes | ruhig, neutral, sentence case |
| **Mono** | Labels, Nummern, Telemetrie, Buttons, Captions | technisch, uppercase, gesperrt |

---

## 2. Font-Stack (verbindlich)

### Produktion (kostenfrei, sofort umsetzbar)

| Rolle | Familie | Format | Quelle |
|---|---|---|---|
| Display | **Inter Tight** (variable, wght 100–900) | woff2 | Google Fonts, self-hosted via `next/font` |
| Body | **Inter** (variable) | woff2 | Google Fonts, self-hosted via `next/font` |
| Mono | **IBM Plex Mono** (400, 500) | woff2 | Google Fonts, self-hosted via `next/font` |

### CSS-Fallback-Stacks

```css
--font-display: 'Inter Tight', 'Helvetica Neue', Arial, system-ui, sans-serif;
--font-body:    'Inter', 'Helvetica Neue', Arial, system-ui, sans-serif;
--font-mono:    'IBM Plex Mono', 'SF Mono', 'Cascadia Mono', Consolas, monospace;
```

### Upgrade-Pfad (optional, lizenzpflichtig)

Ziel-System: **Suisse Int'l** (Swiss Typefaces, Weblizenz traffic-basiert, Trial verfügbar).
Beim Upgrade ändern sich **nur** Familien + zwei Token — alle übrigen Regeln und Größen gelten unverändert:

| Token | Produktion (Inter Tight) | Upgrade (Suisse Int'l) |
|---|---|---|
| `--font-display` | Inter Tight | Suisse Int'l (Bold) |
| `--font-body` | Inter | Suisse Int'l (Book/Regular) |
| `--font-mono` | IBM Plex Mono | Suisse Int'l Mono |
| `--disp-weight` | 800 | 700 |
| `--disp-track` | −0.03em | −0.02em |

> Alternative Richtung „Berlin" (ABC Monument Grotesk + ABC Diatype + Diatype Mono, Dinamo): gleiches Prinzip — nur Familien-Token tauschen, `--disp-weight: 700`, `--disp-track: −0.02em`.

---

## 3. Einbindung (Next.js / Vercel)

`next/font` lädt beim Build und self-hostet — keine Runtime-Requests an Google-CDNs (DSGVO-Praxis für DE-Zielmarkt). Keine `<link>`-Einbindung von fonts.googleapis.com in Produktion.

```ts
// app/fonts.ts
import { Inter, Inter_Tight, IBM_Plex_Mono } from 'next/font/google';

export const fontDisplay = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});
```

```tsx
// app/layout.tsx
<html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
```

---

## 4. Token

**Skalen-Korrektur ggü. Mockup v2:** Display-Größen **−25 %** (Feedback: v2 bei 100 % Zoom zu groß; Abnahme erfolgte bei reduziertem Zoom). Referenz-Viewport 1440 px.

```css
:root {
  /* Familien — siehe Abschnitt 2 */
  --font-display: 'Inter Tight', 'Helvetica Neue', Arial, system-ui, sans-serif;
  --font-body:    'Inter', 'Helvetica Neue', Arial, system-ui, sans-serif;
  --font-mono:    'IBM Plex Mono', 'SF Mono', Consolas, monospace;

  /* Display-Charakter */
  --disp-weight: 800;
  --disp-track: -0.03em;          /* Basis; Uppercase-Kontexte: +0.005em */
  --disp-track-caps: calc(var(--disp-track) + 0.005em);

  /* Größen (korrigierte Skala) */
  --size-h1:      clamp(2.5rem, 7.4vw, 7.25rem);
  --size-h2:      clamp(1.6rem, 3.3vw, 2.9rem);
  --size-h3:      clamp(1.05rem, 1.5vw, 1.3rem);
  --size-rowtitle:clamp(1.3rem, 2.6vw, 2.2rem);   /* Monday-Rows */
  --size-impact:  clamp(2rem, 5vw, 4.4rem);        /* Marquee */
  --size-ghost:   clamp(7rem, 19vw, 17rem);        /* Sektions-Ziffern */
  --size-lede:    clamp(1rem, 1.3vw, 1.15rem);
  --size-body:    1.0625rem;                        /* 17px */
  --size-mono:    0.7rem;                           /* Labels, Rails */
  --size-micro:   0.6rem;                           /* Telemetrie, Koordinaten */
  --size-button:  0.72rem;
  --size-caption: 0.66rem;

  /* Zeilen & Sperrung */
  --lh-display: 0.94;
  --lh-h2: 1.06;
  --lh-body: 1.55;
  --track-mono: 0.10em;
  --track-micro: 0.16em;

  /* Staircase-Einzüge (H1-Zeilen) */
  --indent-1: clamp(1rem, 6.5vw, 6.5rem);
  --indent-2: clamp(0.6rem, 3.2vw, 3.2rem);
}
```

---

## 5. Typo-Skala (Rollen)

| Rolle | Font | Größe | Weight | LH | Tracking | Case |
|---|---|---|---|---|---|---|
| H1 / Hero | Display | `--size-h1` | 800 | 0.94 | `--disp-track-caps` | UPPERCASE |
| H2 / Sektion | Display | `--size-h2` | 800 | 1.06 | `--disp-track` | Sentence case |
| H3 / Karte | Display | `--size-h3` | 800 | 1.12 | `--disp-track` × 0.6 | Sentence case |
| Row-Titel (Monday) | Display | `--size-rowtitle` | 800 | 1.0 | `--disp-track-caps` | UPPERCASE |
| Impact-Marquee | Display | `--size-impact` | 800 | 0.95 | `--disp-track-caps` | UPPERCASE |
| Ghost-Ziffer | Display | `--size-ghost` | 800 | 0.8 | 0 | — (nur Ziffern) |
| Lede | Body | `--size-lede` | 400 | 1.5 | 0 | Sentence case |
| Body | Body | `--size-body` | 400 | 1.55 | 0 | Sentence case |
| Emphasis im Body | Body | — | 500 | — | 0 | — |
| Mono-Label / Rail | Mono | `--size-mono` | 400 | 1.4 | `--track-mono` | UPPERCASE |
| Telemetrie / Koordinaten | Mono | `--size-micro` | 400 (Werte: 500) | 1.4 | `--track-micro` | UPPERCASE |
| Button | Mono | `--size-button` | 400 | 1 | 0.12em | UPPERCASE |
| Caption (Field) | Mono | `--size-caption` | 400 | 1.4 | `--track-mono` | UPPERCASE |

---

## 6. Setz-Regeln

1. **Uppercase nur im Display-Moment:** H1, Row-Titel, Impact-Marquee, Start-CTA-Headline. H2/H3 bleiben Sentence case — der Kontrast laut/leise ist Teil des Konzepts.
2. **Outline-Wort:** max. **ein** Wort pro Viewport-Höhe. Nur in Display-Kontexten ≥ `--size-h2`. Stroke: 2px ab 64px Schriftgröße, sonst 1.5px (`-webkit-text-stroke`, Füllung transparent). Nie im Body, nie in Mono.
3. **Endquadrat (■):** ersetzt den Schlusspunkt ausschließlich in der Hero-H1. Kantenlänge 0.42em, Füllung `--ink`.
4. **Ziffern:** überall `font-feature-settings: "tnum"` wo Zahlen ausgerichtet werden (Nummern, Level, Telemetrie, Ticks). Führende Null bei Sequenzen (01, 02 …).
5. **Mono ist immer gesperrt + uppercase.** Kein Mono in Fließtextlänge (> 1 Zeile Ausnahme: Telemetrie-Belt).
6. **H1-Staircase:** Zeilen als `<span class="line">`, Einzüge nur über `--indent-1/-2`. Keine automatischen Umbrüche in der H1 — Zeilen werden redaktionell gesetzt.
7. **Zeilenlängen:** H2 max. 24ch (`text-wrap: balance`), Lede 60ch, Body 62ch.
8. **Deutsch-Tauglichkeit:** vor jedem Release Display-Texte mit Komposita testen („Organisationsintelligenz", „Prozessmanagement"). `hyphens: auto` nur für Body ab < 560px und nur bei `lang="de"`; nie im Display.
9. **Ghost-Ziffern:** `color: transparent`, Stroke 1px `--line-strong`, angeschnitten (top/right negativ), `pointer-events: none`, `aria-hidden`.
10. **Kein Italic** im gesamten System. Betonung im Body ausschließlich über Weight 500.

## 7. Don'ts

- Keine weiteren Familien einführen (auch nicht für „nur eine Grafik").
- Kein positives Letterspacing im Display, kein negatives im Mono.
- Keine Größen außerhalb der Token-Skala; keine Ad-hoc-`font-size` in Komponenten.
- Outline-Treatment nie als Link-/Hover-Zustand zweckentfremden.
- `--ink-faint` (#4C4C55) nie für inhaltstragenden Text (Kontrast ~2.4:1) — nur dekorativ (Ghost, Crop-Marks, Ticks).
- Kein Font-Loading über externe CDNs in Produktion.

---

## 8. Performance & Rendering

- `display: 'swap'` (via next/font gesetzt); automatischer metric-adjusted Fallback reduziert CLS.
- Variable Fonts (Inter Tight, Inter) statt Einzelschnitten laden; IBM Plex Mono nur 400 + 500.
- Subsets: `latin` genügt (Copy EN; deutsche Umlaute/ß sind in latin enthalten).
- `-webkit-font-smoothing: antialiased` global auf dunklem Grund.

## 9. Barrierefreiheit

| Textfarbe | auf #050509 | Ratio | Freigabe |
|---|---|---|---|
| `--ink` #E8E8EC | Primärtext | ~16:1 | AAA |
| `--ink-dim` #8A8A93 | Sekundärtext | ~5.9:1 | AA (Fließtext ok) |
| `--ink-faint` #4C4C55 | — | ~2.4:1 | nur dekorativ |

- Outline-Wörter sind nie alleinige Informationsträger und stehen nur in Großgraden.
- Blink-/Marquee-Elemente respektieren `prefers-reduced-motion` (Animation aus, Inhalt statisch sichtbar).

---

## 10. Abnahme-Referenz

- Mockup: `aiio-type-system-mockup-v2.html`, System **B — Swiss** (Proxy: Inter Tight / Inter / IBM Plex Mono).
- Screenshot-Freigabe: 2026-07-24, mit Auflage **Display-Skala −25 %** (in Abschnitt 4 eingearbeitet).
- Falls stattdessen System **A — Berlin** gemeint war: nur Familien-Token gemäß Abschnitt 2 tauschen (Schibsted Grotesk / Instrument Sans / DM Mono bzw. Ziel Dinamo); Skala und Regeln bleiben identisch.
