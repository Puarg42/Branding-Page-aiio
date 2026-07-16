import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { BrandCanonLightbox } from "@/components/brand/BrandCanonLightbox";
import { NavigationMemory } from "@/components/brand/NavigationMemory";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { NavProvider } from "@/components/navigation/NavProvider";
import { ThemeBoundary } from "@/components/theme/ThemeBoundary";
import { getLocaleAlternates } from "@/lib/cms/alternates";
import { getNavigation } from "@/lib/cms/navigation";
import { getSiteSettings } from "@/lib/cms/settings";
import { getDefaultTheme } from "@/lib/cms/theme";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { SiteFooter } from "./site-footer";
import { deploymentUrl, siteUrl } from "./site-url";

// The root document language and CMS navigation depend on the locale header
// injected by proxy.ts. Force request-time rendering so `headers()` is valid.
export const dynamic = "force-dynamic";

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
    locale: "en_US",
    alternateLocale: ["de_DE"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-aiio-locale");
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const pathname = requestHeaders.get("x-aiio-pathname") ?? `/${locale}`;
  const [nav, alternates, siteSettings, defaultTheme] = await Promise.all([
    getNavigation(locale),
    getLocaleAlternates(pathname, locale),
    getSiteSettings(locale),
    getDefaultTheme(locale),
  ]);
  return (
    <html lang={locale}>
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
        <ThemeBoundary theme={defaultTheme}>
          <NavigationMemory />
          {siteSettings?.announcement ? (
            <aside className="site-announcement" role="status">
              {siteSettings.announcement}
            </aside>
          ) : null}
          <NavProvider
            alternates={alternates}
            header={nav.header}
            locale={locale}
          >
            {children}
          </NavProvider>
          <SiteFooter nav={nav.footerNav} legal={nav.footerLegal} />
          <BrandCanonLightbox />
          <CookieConsent />
        </ThemeBoundary>
      </body>
    </html>
  );
}
