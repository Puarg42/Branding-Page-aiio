import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialSection,
  EditorialSectionHeader,
} from "@/components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "@/components/brand/EditorialJumpArrow";
import { getPublications, type PublicationListItem } from "@/lib/cms/publications";
import { getBlogSettings } from "@/lib/cms/settings";
import { assertLocale, type Locale } from "@/lib/i18n/config";
import { MainHeader } from "../../main-navigation";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ category?: string }>;
};

const copy = {
  en: {
    eyebrow: "Blog & News",
    title: "Insights for organizations that want to understand themselves.",
    intro:
      "Articles, product news and field notes on Organizational Intelligence and the evolution of work.",
    latest: "The latest from aiio.",
    archive: "All Blog & News entries.",
    read: "Read article",
    all: "All",
  },
  de: {
    eyebrow: "Blog & News",
    title: "Impulse für Organisationen, die sich selbst verstehen wollen.",
    intro:
      "Artikel, Produktneuigkeiten und Perspektiven zu Organizational Intelligence und der Zukunft der Arbeit.",
    latest: "Neu bei aiio.",
    archive: "Alle Beiträge.",
    read: "Artikel lesen",
    all: "Alle",
  },
} as const;

function formatDate(date: string | null, locale: Locale) {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function Card({
  post,
  locale,
  featured,
}: {
  post: PublicationListItem;
  locale: Locale;
  featured?: boolean;
}) {
  const href = `/${locale}/blog/${post.slug}`;
  return (
    <article className={featured ? "blog-card is-featured" : "blog-card"}>
      <Link className="blog-card-image-link" href={href}>
        {post.heroImageUrl ? (
          <img
            alt={post.heroImageAlt ?? ""}
            loading={featured ? "eager" : "lazy"}
            src={post.heroImageUrl}
          />
        ) : null}
      </Link>
      <div className="blog-card-copy">
        <p className="blog-post-meta">
          {post.categoryTitle ? <span>{post.categoryTitle}</span> : null}
          <span>{formatDate(post.publishedAt, locale)}</span>
          {post.readingTime ? <span>{post.readingTime}</span> : null}
        </p>
        <h3>
          <Link href={href}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link className="website-text-link blog-card-link" href={href}>
          {copy[locale].read} <EditorialJumpArrow />
        </Link>
      </div>
    </article>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const title = `Blog & News | aiio`;
  return {
    title,
    description: copy[locale].intro,
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        de: "/de/blog",
        "x-default": "/en/blog",
      },
    },
    openGraph: {
      title,
      description: copy[locale].intro,
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
      url: `/${locale}/blog`,
    },
  };
}

export default async function LocalizedBlog({ params, searchParams }: Props) {
  const locale = assertLocale((await params).locale);
  const activeCategory = (await searchParams)?.category;
  const [posts, settings] = await Promise.all([
    getPublications(locale),
    getBlogSettings(locale),
  ]);
  const visible = activeCategory
    ? posts.filter((post) => post.categoryTitle === activeCategory)
    : posts;
  const [featured, ...archive] = visible;
  const categories = Array.from(
    new Set(
      posts
        .map((post) => post.categoryTitle)
        .filter((value): value is string => Boolean(value)),
    ),
  );
  const fallback = copy[locale];
  const c = {
    eyebrow: settings?.eyebrow || fallback.eyebrow,
    title: settings?.heading || fallback.title,
    intro: settings?.intro || fallback.intro,
    latest: settings?.latestHeading || fallback.latest,
    archive: settings?.archiveHeading || fallback.archive,
    read: settings?.readLabel || fallback.read,
    all: settings?.allLabel || fallback.all,
  };

  return (
    <main className="blog-news-page">
      <MainHeader variant="solid" />
      <section className="blog-news-hero">
        <div className="blog-news-shell">
          <EditorialEyebrow>{c.eyebrow}</EditorialEyebrow>
          <h1>{c.title}</h1>
          <p>{c.intro}</p>
        </div>
      </section>
      {featured ? (
        <EditorialSection className="blog-featured-section" shellClassName="blog-news-shell">
          <EditorialSectionHeader title={c.latest} />
          <Card post={featured} locale={locale} featured />
        </EditorialSection>
      ) : null}
      <EditorialSection className="blog-archive-section" shellClassName="blog-news-shell">
        <div className="blog-filter-strip" aria-label="Blog categories">
          <Link href={`/${locale}/blog`}>{c.all}</Link>
          {categories.map((category) => (
            <Link
              href={`/${locale}/blog?category=${encodeURIComponent(category)}`}
              key={category}
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="blog-card-grid">
          {archive.slice(0, 11).map((post) => (
            <Card key={post.slug} post={post} locale={locale} />
          ))}
        </div>
        <div className="blog-chronological-archive">
          <h2>{c.archive}</h2>
          <div className="blog-archive-list">
            {visible.map((post) => (
              <Link
                className="blog-archive-row"
                href={`/${locale}/blog/${post.slug}`}
                key={post.slug}
              >
                <span>{formatDate(post.publishedAt, locale)}</span>
                <strong>{post.title}</strong>
                <em>{post.categoryTitle}</em>
              </Link>
            ))}
          </div>
        </div>
      </EditorialSection>
    </main>
  );
}
