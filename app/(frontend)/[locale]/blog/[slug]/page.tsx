import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  EditorialSection,
  EditorialSectionHeader,
} from "@/components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { RefreshRouteOnSave } from "@/components/live-preview/RefreshRouteOnSave";
import {
  getPublicationBySlug,
  getPreviewPublication,
  getPublicationSlugs,
} from "@/lib/cms/publications";
import { getLocaleAlternates } from "@/lib/cms/alternates";
import { assertLocale, locales, type Locale } from "@/lib/i18n/config";
import { MainHeader } from "../../../main-navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ preview?: string }>;
};

export async function generateStaticParams() {
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of locales) {
    const slugs = await getPublicationSlugs(locale);
    params.push(...slugs.map((slug) => ({ locale, slug })));
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params;
  const locale = assertLocale(values.locale);
  const post = await getPublicationBySlug(values.slug, locale);
  if (!post) return {};
  const title = `${post.seoTitle || post.title} | aiio`;
  const description = post.seoDescription || post.excerpt;
  const path = `/${locale}/blog/${post.slug}`;
  const localeAlternates = await getLocaleAlternates(path, locale);
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
    openGraph: {
      title,
      description,
      type: "article",
      url: path,
      locale: locale === "de" ? "de_DE" : "en_US",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      images: post.heroImageUrl ? [{ url: post.heroImageUrl }] : undefined,
    },
  };
}

function formatDate(date: string | null, locale: Locale) {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default async function LocalizedArticle({ params, searchParams }: Props) {
  const values = await params;
  const locale = assertLocale(values.locale);
  const preview = (await searchParams)?.preview;
  const previewPost = preview
    ? await getPreviewPublication(values.slug, locale, await headers())
    : null;
  const post = previewPost ?? (await getPublicationBySlug(values.slug, locale));
  if (!post) notFound();

  return (
    <main className="blog-article-page">
      <RefreshRouteOnSave />
      <MainHeader variant="solid" />
      <article className="blog-article-layout">
        <section className="blog-article-hero">
          <div className="blog-article-shell">
            <Link className="blog-back-link" href={`/${locale}/blog`}>
              ← {locale === "de" ? "Zurück zum Blog" : "Back to Blog & News"}
            </Link>
            {post.categoryTitle ? (
              <EditorialEyebrow>{post.categoryTitle}</EditorialEyebrow>
            ) : null}
            <p className="blog-post-meta blog-article-meta">
              <span>{formatDate(post.publishedAt, locale)}</span>
              {post.readingTime ? <span>{post.readingTime}</span> : null}
            </p>
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            {post.heroImageUrl ? (
              <figure className="blog-article-hero-image">
                <img alt={post.heroImageAlt ?? ""} src={post.heroImageUrl} />
              </figure>
            ) : null}
          </div>
        </section>
        <div className="blog-article-shell">
          <div
            className="blog-article-body"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml ?? "" }}
          />
        </div>
      </article>
      <EditorialSection className="blog-news-cta" shellClassName="blog-article-shell">
        <EditorialSectionHeader
          eyebrow={locale === "de" ? "Nächster Schritt" : "Next step"}
          title={
            locale === "de"
              ? "Von der Lektüre zur organisationalen Fähigkeit."
              : "Move from reading to organizational capability."
          }
        />
      </EditorialSection>
    </main>
  );
}
