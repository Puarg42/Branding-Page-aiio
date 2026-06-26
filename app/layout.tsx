import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "./site-footer";
import { siteUrl } from "./site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "aiio | Organizational Intelligence mit System",
  description:
    "aiio verbindet Wissen, Recognition und Activation in einem integrierten Organizational Intelligence System.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    description:
      "aiio verbindet Wissen, Recognition und Activation in einem integrierten Organizational Intelligence System.",
    images: ["/aiio-architecture-stack-output-v3.png"],
    locale: "de_DE",
    siteName: "aiio",
    title: "aiio | Organizational Intelligence mit System",
    type: "website",
    url: "/",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link
          as="font"
          crossOrigin="anonymous"
          href="/fonts/chillax-semibold.woff2"
          rel="preload"
          type="font/woff2"
        />
        <link
          as="font"
          crossOrigin="anonymous"
          href="/fonts/chillax-bold.woff2"
          rel="preload"
          type="font/woff2"
        />
      </head>
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
