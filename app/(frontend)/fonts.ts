import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";

export const fontDisplay = Inter_Tight({
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "system-ui", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-display",
});

export const fontBody = Inter({
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "system-ui", "sans-serif"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const fontMono = IBM_Plex_Mono({
  display: "swap",
  fallback: ["SF Mono", "Cascadia Mono", "Consolas", "monospace"],
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});
