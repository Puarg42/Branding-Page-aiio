import type { MetadataRoute } from "next";
import { siteUrl } from "./site-url";

const routes = [
  { path: "/", priority: 1 },
  { path: "/thinking", priority: 0.78 },
  { path: "/platform", priority: 0.86 },
  { path: "/partners", priority: 0.72 },
  { path: "/company", priority: 0.76 },
  { path: "/contact", priority: 0.72 },
  { path: "/about-us", priority: 0.85 },
  { path: "/collector", priority: 0.82 },
  { path: "/magnet", priority: 0.82 },
  { path: "/forge", priority: 0.82 },
  { path: "/academy", priority: 0.65 },
  { path: "/click-demos", priority: 0.65 },
  { path: "/dokumentation", priority: 0.65 },
  { path: "/success-stories", priority: 0.72 },
  { path: "/platform/product-news", priority: 0.58 },
  { path: "/partner-finden", priority: 0.58 },
  { path: "/blog", priority: 0.65 },
  { path: "/services", priority: 0.68 },
  { path: "/downloadcenter", priority: 0.62 },
  { path: "/support", priority: 0.58 },
  { path: "/live-demo/kontakt", priority: 0.76 },
  { path: "/kostenlose-testversion/anmelden", priority: 0.72 },
  { path: "/pricing", priority: 0.52 },
  { path: "/release-notes", priority: 0.52 },
  { path: "/kontakt", priority: 0.68 },
  { path: "/presse", priority: 0.48 },
  { path: "/facts", priority: 0.48 },
  { path: "/datenschutz", priority: 0.32 },
  { path: "/impressum", priority: 0.32 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    lastModified,
    priority: route.priority,
    url: `${siteUrl}${route.path}`,
  }));
}
