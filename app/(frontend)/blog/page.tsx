import type { Metadata } from "next";
import Link from "next/link";
import {
  EditorialNavigation,
  EditorialSection,
  EditorialSectionHeader,
} from "@/components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "@/components/brand/EditorialJumpArrow";
import type { EditorialSectionNavigatorItem } from "@/components/brand/EditorialSectionNavigator";
import { getPublications, type PublicationListItem } from "@/lib/cms/publications";
import { MainHeader } from "../main-navigation";

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const blogSectionNavigator: EditorialSectionNavigatorItem[] = [
  { id: "blog-hero", label: "Hero" },
  { id: "blog-featured", label: "Latest" },
  { id: "blog-archive", label: "Archive" },
  { id: "blog-subscribe", label: "Contact" },
];

const title = "Blog & News | aiio";
const description =
  "Insights, product news and organizational intelligence perspectives from aiio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title,
    description,
    images: [{ url: "/og-home-bc002-1200x630.jpg", width: 1200, height: 630 }],
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-home-bc002-1200x630.jpg"],
  },
};

type BlogPageProps = {
  searchParams?: Promise<{ category?: string }>;
};

function formatDate(date: string | null) {
  if (!date) return "";
  return dateFormatter.format(new Date(date));
}

function BlogMeta({ post }: { post: PublicationListItem }) {
  return (
    <p className="blog-post-meta">
      {post.categoryTitle ? <span>{post.categoryTitle}</span> : null}
      <span>{formatDate(post.publishedAt)}</span>
      {post.readingTime ? <span>{post.readingTime}</span> : null}
    </p>
  );
}

function BlogCard({ post, priority = false }: { post: PublicationListItem; priority?: boolean }) {
  return (
    <article className={priority ? "blog-card is-featured" : "blog-card"}>
      <Link className="blog-card-image-link" href={`/blog/${post.slug}`}>
        {post.heroImageUrl ? (
          <img
            alt={post.heroImageAlt ?? ""}
            loading={priority ? "eager" : "lazy"}
            src={post.heroImageUrl}
          />
        ) : null}
      </Link>
      <div className="blog-card-copy">
        <BlogMeta post={post} />
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link className="website-text-link blog-card-link" href={`/blog/${post.slug}`}>
          Read article <EditorialJumpArrow />
        </Link>
      </div>
    </article>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = (await searchParams) ?? {};
  const activeCategory = params.category;
  const allPosts = await getPublications("en");
  const categories = Array.from(
    new Set(allPosts.map((post) => post.categoryTitle).filter((c): c is string => Boolean(c))),
  );
  const visiblePosts = activeCategory
    ? allPosts.filter((post) => post.categoryTitle === activeCategory)
    : allPosts;
  const [featuredPost, ...archivePosts] = visiblePosts;
  const gridPosts = archivePosts.slice(0, 11);

  return (
    <main className="blog-news-page">
      <MainHeader variant="solid" />

      <section className="blog-news-hero" id="blog-hero">
        <div className="blog-news-shell">
          <EditorialEyebrow>Blog & News</EditorialEyebrow>
          <h1>Insights for organizations that want to understand themselves.</h1>
          <p>
            Articles, product news and field notes from the aiio team on process
            management, Organizational Intelligence and the evolution of work.
          </p>
        </div>
      </section>

      {featuredPost ? (
        <EditorialSection
          className="blog-featured-section"
          id="blog-featured"
          shellClassName="blog-news-shell"
        >
          <EditorialSectionHeader
            className="blog-news-section-heading"
            eyebrow={activeCategory ? activeCategory : "Latest article"}
            lead={
              activeCategory
                ? "A focused view of the selected topic."
                : "The newest perspective from the aiio journal."
            }
            title={activeCategory ? `${activeCategory} archive` : "The latest from aiio."}
          />
          <BlogCard post={featuredPost} priority />
        </EditorialSection>
      ) : null}

      <EditorialSection
        className="blog-archive-section"
        id="blog-archive"
        shellClassName="blog-news-shell"
      >
        <div className="blog-filter-strip" aria-label="Blog categories">
          <Link className={!activeCategory ? "is-active" : ""} href="/blog" scroll={false}>
            All
          </Link>
          {categories.map((category) => (
            <Link
              className={activeCategory === category ? "is-active" : ""}
              href={`/blog?category=${encodeURIComponent(category)}`}
              key={category}
              scroll={false}
            >
              {category}
            </Link>
          ))}
        </div>

        {gridPosts.length > 0 ? (
          <div className="blog-card-grid">
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : null}

        <div className="blog-chronological-archive">
          <div className="blog-chronological-heading">
            <EditorialEyebrow>Chronological Archive</EditorialEyebrow>
            <h2>All Blog & News entries.</h2>
          </div>
          <div className="blog-archive-list">
            {visiblePosts.map((post) => (
              <Link className="blog-archive-row" href={`/blog/${post.slug}`} key={post.slug}>
                <span>{formatDate(post.publishedAt)}</span>
                <strong>{post.title}</strong>
                <em>{post.categoryTitle}</em>
              </Link>
            ))}
          </div>
        </div>
      </EditorialSection>

      <EditorialSection
        className="blog-news-cta"
        id="blog-subscribe"
        shellClassName="blog-news-shell"
      >
        <EditorialSectionHeader
          className="blog-news-section-heading"
          eyebrow="Stay connected"
          lead="For executive briefings, product updates or media requests, talk to the aiio team directly."
          title="Follow the evolution of Organizational Intelligence."
        />
        <div className="editorial-cta-group">
          <Link className="button" href="/live-demo/kontakt">
            Request a conversation
          </Link>
          <Link className="button secondary" href="/live-demo/kontakt">
            Contact aiio
          </Link>
        </div>
      </EditorialSection>

      <EditorialNavigation ariaLabel="Blog sections" sections={blogSectionNavigator} />
    </main>
  );
}
