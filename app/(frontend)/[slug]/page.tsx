import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { getPageBySlug, getPublishedPageSlugs } from "@/lib/cms/pages";
import { MainHeader } from "../main-navigation";
import { createMetadata } from "../seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublishedPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};
  return createMetadata({
    path: `/${slug}`,
    title: page.seo?.title || `${page.title} | aiio`,
    description: page.seo?.description ?? undefined,
  });
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <main className="website-page">
      <MainHeader variant="solid" />
      <RenderBlocks blocks={page.layout as Parameters<typeof RenderBlocks>[0]["blocks"]} />
    </main>
  );
}
