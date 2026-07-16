import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeFromPath,
  type Locale,
} from "./lib/i18n/config";

const LOCALE_COOKIE = "aiio-locale";

const legacyRedirects: Record<string, string> = {
  "/platform": "/en/platform",
  "/success-stories": "/en/success-stories",
  "/thinking": "/en/thinking",
  "/thinking/theory": "/en/thinking/theory",
  "/partners": "/en/partners",
  "/company": "/en/company",
  "/about-us": "/en/company",
  "/academy": "/en/academy",
  "/contact": "/en/conversation",
  "/live-demo/kontakt": "/en/conversation",
  "/collector": "/de/collector",
  "/magnet": "/de/magnet",
  "/forge": "/de/forge",
  "/kontakt": "/de/kontakt",
  "/datenschutz": "/de/datenschutz",
  "/impressum": "/de/impressum",
  "/dokumentation": "/de/dokumentation",
  "/downloadcenter": "/de/downloadcenter",
  "/click-demos": "/de/click-demos",
  "/facts": "/de/fakten",
  "/partner-finden": "/de/partner-finden",
  "/presse": "/de/presse",
  "/pricing": "/de/preise",
  "/release-notes": "/de/release-notes",
  "/services": "/de/services",
  "/support": "/de/support",
  "/kostenlose-testversion/anmelden": "/de/kostenlose-testversion/anmelden",
  "/platform/product-news": "/de/plattform/produktneuigkeiten",
};

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;

  const accepted = request.headers.get("accept-language")?.toLowerCase() ?? "";
  return accepted.split(",").some((entry) => entry.trim().startsWith("de"))
    ? "de"
    : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const pathLocale = localeFromPath(pathname);

  if (!pathLocale) {
    const legacyTarget =
      legacyRedirects[pathname] ??
      (pathname === "/blog" || pathname.startsWith("/blog/")
        ? `/de${pathname}`
        : null);
    if (legacyTarget) {
      const url = request.nextUrl.clone();
      url.pathname = legacyTarget;
      return NextResponse.redirect(url, 308);
    }
    const locale = preferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-aiio-locale", pathLocale);
  requestHeaders.set("x-aiio-pathname", pathname);
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.cookies.set(LOCALE_COOKIE, pathLocale, {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });
  response.headers.set("content-language", pathLocale);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|admin|_next|favicon.ico|icon.png|apple-touch-icon.png|manifest.json|robots.txt|sitemap.xml|llms.txt|.*\\.[^/]+$).*)",
  ],
};
