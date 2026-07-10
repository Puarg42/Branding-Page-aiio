import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BrandCanonLightbox } from "../components/brand/BrandCanonLightbox";
import { NavigationMemory } from "../components/brand/NavigationMemory";
import { SiteFooter } from "./site-footer";
import { deploymentUrl, siteUrl } from "./site-url";

const title = "aiio | Organizational Intelligence with System";
const description = "Build organizations that continuously understand themselves.";
const socialPreviewImageUrl = new URL(
  "/og-home-bc002-1200x630.jpg",
  deploymentUrl,
);
const socialPreviewImage = {
  alt: "BC002 Organizational Intelligence Engine",
  height: 630,
  url: socialPreviewImageUrl,
  width: 1200,
};

export const metadata: Metadata = {
  applicationName: "aiio",
  category: "technology",
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
      { rel: "icon", sizes: "512x512", type: "image/png", url: "/icon.png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    description,
    images: [socialPreviewImage],
    locale: "de_DE",
    siteName: "aiio",
    title,
    type: "website",
    url: "/",
  },
  robots: {
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    description,
    images: [socialPreviewImage],
    title,
  },
};

export const viewport: Viewport = {
  themeColor: "#050509",
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
        <NavigationMemory />
        {children}
        <SiteFooter />
        <BrandCanonLightbox />
      </body>
    </html>
  );
}
