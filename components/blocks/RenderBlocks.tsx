import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import Link from "next/link";
import {
  EditorialCard,
  EditorialGrid,
  EditorialSection,
  EditorialSectionHeader,
} from "@/components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "@/components/brand/EditorialEyebrow";
import { ExecutiveCTA } from "@/components/brand/ExecutiveCTA";

// Loosely typed block shape; each renderer reads the fields it needs. The
// generated payload-types provide the authoritative shapes at the call site.
type Cta = { label?: string | null; href?: string | null } | null | undefined;
type Block = {
  blockType: string;
  id?: string | null;
  [key: string]: unknown;
};

function ctaLinks(primary: Cta, secondary: Cta) {
  return (
    <div className="editorial-cta-group">
      {primary?.href && primary.label ? (
        <Link className="button hero-button" href={primary.href}>
          {primary.label}
        </Link>
      ) : null}
      {secondary?.href && secondary.label ? (
        <Link className="button hero-button secondary" href={secondary.href}>
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );
}

function HeroBlockView({ block }: { block: Block }) {
  const primary = block.primaryCta as Cta;
  const secondary = block.secondaryCta as Cta;
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
      <h1>{String(block.heading ?? "")}</h1>
      {block.subheading ? <p className="editorial-hero-lead">{String(block.subheading)}</p> : null}
      {ctaLinks(primary, secondary)}
    </EditorialSection>
  );
}

function ProseBlockView({ block }: { block: Block }) {
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <div className="editorial-prose">
        <RichText data={block.content as SerializedEditorState} />
      </div>
    </EditorialSection>
  );
}

function FeatureGridBlockView({ block }: { block: Block }) {
  const items = (block.items as Array<{ id?: string; title?: string; copy?: string }>) ?? [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.heading || block.eyebrow ? (
        <EditorialSectionHeader
          eyebrow={block.eyebrow ? String(block.eyebrow) : undefined}
          title={String(block.heading ?? "")}
        />
      ) : null}
      <EditorialGrid>
        {items.map((item, index) => (
          <EditorialCard key={item.id ?? index}>
            <h3>{item.title}</h3>
            {item.copy ? <p>{item.copy}</p> : null}
          </EditorialCard>
        ))}
      </EditorialGrid>
    </EditorialSection>
  );
}

function CTABlockView({ block }: { block: Block }) {
  const primary = (block.primaryCta as Cta) ?? undefined;
  const secondary = (block.secondaryCta as Cta) ?? undefined;
  if (!primary?.href || !primary.label) return null;
  return (
    <ExecutiveCTA
      eyebrow={block.eyebrow ? String(block.eyebrow) : undefined}
      headline={String(block.heading ?? "")}
      copy={String(block.copy ?? "")}
      primary={{ href: primary.href, label: primary.label }}
      secondary={
        secondary?.href && secondary.label
          ? { href: secondary.href, label: secondary.label }
          : undefined
      }
    />
  );
}

const renderers: Record<string, (props: { block: Block }) => React.ReactNode> = {
  hero: HeroBlockView,
  prose: ProseBlockView,
  featureGrid: FeatureGridBlockView,
  cta: CTABlockView,
};

/** Single template that turns a page's CMS blocks into rendered sections. */
export function RenderBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const Renderer = renderers[block.blockType];
        if (!Renderer) return null;
        return <Renderer block={block} key={block.id ?? `${block.blockType}-${index}`} />;
      })}
    </>
  );
}
