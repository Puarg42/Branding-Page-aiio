import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  EditorialSection,
  EditorialSectionHeader,
} from "../../../components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "../../../components/brand/EditorialEyebrow";
import { EditorialJumpArrow } from "../../../components/brand/EditorialJumpArrow";
import { MainHeader } from "../../main-navigation";
import { blogPosts, getBlogPost, type BlogPost } from "../blog-posts";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T12:00:00.000Z`));
}

function getRelatedPosts(post: BlogPost) {
  const sameCategory = blogPosts.filter(
    (candidate) => candidate.slug !== post.slug && candidate.category === post.category,
  );
  const fallback = blogPosts.filter((candidate) => candidate.slug !== post.slug);

  return (sameCategory.length ? sameCategory : fallback).slice(0, 3);
}

function BlogArticleMeta({ post }: { post: BlogPost }) {
  return (
    <p className="blog-post-meta blog-article-meta">
      <span>{post.category}</span>
      <span>{formatDate(post.date)}</span>
      <span>{post.readingTime}</span>
    </p>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog & News | aiio",
    };
  }

  const title = `${post.seoTitle} | aiio Blog & News`;
  const description = post.seoDescription || post.excerpt;
  const image = post.heroImage || "/og-home-bc002-1200x630.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      description,
      images: [{ url: image }],
      modifiedTime: post.updatedAt,
      publishedTime: post.date,
      title,
      type: "article",
      url: `/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
      title,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

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
            <EditorialEyebrow>{post.category}</EditorialEyebrow>
            <BlogArticleMeta post={post} />
            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>
            {post.heroImage ? (
              <figure className="blog-article-hero-image">
                <img alt={post.heroImageAlt} src={post.heroImage} />
              </figure>
            ) : null}
          </div>
        </section>

        <div className="blog-article-shell">
          <div
            className="blog-article-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </article>

      <EditorialSection
        className="blog-related-section"
        shellClassName="blog-article-shell"
      >
        <EditorialSectionHeader
          className="blog-news-section-heading"
          eyebrow="Related"
          title="Continue reading."
        />
        <div className="blog-related-grid">
          {relatedPosts.map((relatedPost) => (
            <article className="blog-related-card" key={relatedPost.slug}>
              <p>{relatedPost.category}</p>
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
            Request a Conversation
          </Link>
        </div>
      </EditorialSection>
    </main>
  );
}
