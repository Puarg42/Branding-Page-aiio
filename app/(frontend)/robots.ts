import type { MetadataRoute } from "next";
import { siteUrl } from "./site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteUrl,
    rules: [
      {
        allow: "/",
        userAgent: "OAI-SearchBot",
      },
      {
        allow: "/",
        userAgent: "ChatGPT-User",
      },
      {
        allow: "/",
        userAgent: "GPTBot",
      },
      {
        allow: "/",
        userAgent: "*",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
