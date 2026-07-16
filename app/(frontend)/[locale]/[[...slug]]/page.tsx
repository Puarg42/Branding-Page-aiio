import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { RefreshRouteOnSave } from "@/components/live-preview/RefreshRouteOnSave";
import { ThemeBoundary } from "@/components/theme/ThemeBoundary";
import { getLocaleAlternates } from "@/lib/cms/alternates";
import {
  getPageBySlug,
  getPageByType,
  getPreviewPage,
  getPublishedPageSlugs,
} from "@/lib/cms/pages";
import {
  assertLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import {
  getPreviewTheme,
  type ThemeRecord,
} from "@/lib/cms/theme";
import { MainHeader } from "../../main-navigation";

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
  searchParams?: Promise<{ preview?: string; previewTheme?: string }>;
};

async function resolvePage(locale: Locale, segments?: string[]) {
  if (!segments?.length) {
    return getPageByType("home", locale);
  }
  return getPageBySlug(segments.join("/"), locale);
}

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; slug?: string[] }> = [];
  for (const locale of locales) {
    params.push({ locale });
    const slugs = await getPublishedPageSlugs(locale);
    params.push(
      ...slugs
        .filter((slug) => slug !== "home")
        .map((slug) => ({ locale, slug: slug.split("/") })),
    );
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const page = await resolvePage(locale, slug);
  if (!page) return {};
  const path = `/${locale}${slug?.length ? `/${slug.join("/")}` : ""}`;
  const localeAlternates = await getLocaleAlternates(path, locale);
  const title = page.seo?.title || `${page.title} | aiio`;
  const description = page.seo?.description ?? undefined;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: localeAlternates.en,
        de: localeAlternates.de,
        "x-default": localeAlternates.en,
      },
    },
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? ["en_US"] : ["de_DE"],
      type: "website",
      url: path,
    },
  };
}

export default async function LocalizedCmsPage({ params, searchParams }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const query = await searchParams;
  const requestHeaders =
    query?.preview || query?.previewTheme ? await headers() : null;
  const previewPage =
    query?.preview && requestHeaders
      ? await getPreviewPage(
          {
            locale,
            ...(slug?.length
              ? { slug: slug.join("/") }
              : { pageType: "home" }),
          },
          requestHeaders,
        )
      : null;
  const page = previewPage ?? (await resolvePage(locale, slug));
  if (!page) notFound();
  const previewThemeID = query?.previewTheme;
  const previewTheme = previewThemeID
    ? await getPreviewTheme(
        previewThemeID,
        requestHeaders ?? (await headers()),
      )
    : null;
  const pageTheme =
    page.theme && typeof page.theme === "object"
      ? (page.theme as unknown as ThemeRecord)
      : null;
  const resolvedTheme = previewTheme ?? pageTheme;

  const content = (
    <main className="website-page">
      <RefreshRouteOnSave />
      <MainHeader variant={page.pageType === "home" ? "home" : "solid"} />
      <RenderBlocks
        blocks={page.layout as Parameters<typeof RenderBlocks>[0]["blocks"]}
        locale={locale}
      />
    </main>
  );
  return resolvedTheme ? (
    <ThemeBoundary theme={resolvedTheme}>{content}</ThemeBoundary>
  ) : (
    content
  );
}
