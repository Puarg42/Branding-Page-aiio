import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  EditorialSection,
  EditorialSectionHeader,
} from "@/components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "@/components/brand/EditorialJumpArrow";
import {
  getPublicationBySlug,
  getPublicationSlugs,
  getPublications,
  type PublicationDetail,
} from "@/lib/cms/publications";
import { MainHeader } from "../../main-navigation";
import { createMetadata } from "../../seo";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatDate(date: string | null) {
  if (!date) return "";
  return dateFormatter.format(new Date(date));
}

async function getRelatedPosts(post: PublicationDetail) {
  const all = await getPublications();
  const sameCategory = all.filter(
    (candidate) => candidate.slug !== post.slug && candidate.categoryTitle === post.categoryTitle,
  );
  const fallback = all.filter((candidate) => candidate.slug !== post.slug);
  return (sameCategory.length ? sameCategory : fallback).slice(0, 3);
}

export async function generateStaticParams() {
  const slugs = await getPublicationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicationBySlug(slug);
  if (!post) return { title: "Blog & News | aiio" };

  const metaTitle = `${post.seoTitle || post.title} | aiio Blog & News`;
  const metaDescription = post.seoDescription || post.excerpt;
  const image = post.heroImageUrl || "/og-home-bc002-1200x630.jpg";

  return {
    ...createMetadata({ path: `/blog/${post.slug}`, title: metaTitle, description: metaDescription }),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [{ url: image }],
      modifiedTime: post.updatedAt ?? undefined,
      publishedTime: post.publishedAt ?? undefined,
      type: "article",
      url: `/blog/${post.slug}`,
    },
    twitter: { card: "summary_large_image", title: metaTitle, description: metaDescription, images: [image] },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getPublicationBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post);

  return (
    <main className="blog-article-page">
      <MainHeader variant="solid" />

      <article className="blog-article-layout">
        <div className="blog-article-sticky-nav">
          <div className="blog-article-shell">
            <Link className="blog-back-link" href="/blog">
              {"\u2190"} Back to Blog & News
            </Link>
          </div>
        </div>

        <section className="blog-article-hero">
          <div className="blog-article-shell">
            <Link className="blog-back-link" href="/blog">
              ← Back to Blog & News
            </Link>
            {post.categoryTitle ? <EditorialEyebrow>{post.categoryTitle}</EditorialEyebrow> : null}
            <p className="blog-post-meta blog-article-meta">
              {post.categoryTitle ? <span>{post.categoryTitle}</span> : null}
              <span>{formatDate(post.publishedAt)}</span>
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

      <EditorialSection className="blog-related-section" shellClassName="blog-article-shell">
        <EditorialSectionHeader
          className="blog-news-section-heading"
          eyebrow="Related"
          title="Continue reading."
        />
        <div className="blog-related-grid">
          {relatedPosts.map((relatedPost) => (
            <article className="blog-related-card" key={relatedPost.slug}>
              <p>{relatedPost.categoryTitle}</p>
              <h3>
                <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
              </h3>
              <Link className="website-text-link" href={`/blog/${relatedPost.slug}`}>
                Read article <EditorialJumpArrow />
              </Link>
            </article>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection className="blog-news-cta" shellClassName="blog-article-shell">
        <EditorialSectionHeader
          className="blog-news-section-heading"
          eyebrow="Next step"
          lead="Explore how aiio turns organizational reality into continuous understanding."
          title="Move from reading to organizational capability."
        />
        <div className="editorial-cta-group">
          <Link className="button" href="/platform">
            Explore the Platform
          </Link>
          <Link className="button secondary" href="/live-demo/kontakt">
            Request a conversation
          </Link>
        </div>
      </EditorialSection>
    </main>
  );
}
