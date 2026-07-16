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
import { BrandIllustration } from "@/components/brand/BrandIllustration";
import { TrustLogoMarquee } from "@/components/brand/TrustLogoMarquee";
import { LeadForm } from "@/components/forms/LeadForm";
import { CapabilityJourney } from "@/app/(frontend)/capability-journey";
import {
  CategoryEvolution,
  OrganizationalRealityCheck,
} from "@/app/(frontend)/category-reinforcement";
import { getSuccessStories } from "@/lib/cms/success-stories";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/config";

// Loosely typed block shape; each renderer reads the fields it needs. The
// generated payload-types provide the authoritative shapes at the call site.
type Cta =
  | {
      type?: "internal" | "external" | null;
      label?: string | null;
      url?: string | null;
      newTab?: boolean | null;
      reference?:
        | {
            relationTo?: "pages" | "publications";
            value?: number | { slug?: string | null } | null;
          }
        | null;
    }
  | null
  | undefined;
type Block = {
  blockType: string;
  id?: string | null;
  [key: string]: unknown;
};
type BlockProps = { block: Block; locale: Locale };

function ctaHref(cta: Cta, locale: Locale): string | null {
  if (!cta) return null;
  if (cta.type === "external" && cta.url) return withLocale(locale, cta.url);
  const value = cta.reference?.value;
  if (value && typeof value === "object" && value.slug) {
    const prefix = cta.reference?.relationTo === "publications" ? "/blog/" : "/";
    return withLocale(locale, `${prefix}${value.slug}`);
  }
  return cta.url ? withLocale(locale, cta.url) : null;
}

function ctaLinks(primary: Cta, secondary: Cta, locale: Locale) {
  const primaryHref = ctaHref(primary, locale);
  const secondaryHref = ctaHref(secondary, locale);
  return (
    <div className="editorial-cta-group">
      {primaryHref && primary?.label ? (
        <Link className="button hero-button" href={primaryHref}>
          {primary.label}
        </Link>
      ) : null}
      {secondaryHref && secondary?.label ? (
        <Link className="button hero-button secondary" href={secondaryHref}>
          {secondary.label}
        </Link>
      ) : null}
    </div>
  );
}

function HeroBlockView({ block, locale }: { block: Block; locale: Locale }) {
  const primary = block.primaryCta as Cta;
  const secondary = block.secondaryCta as Cta;
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
      <h1>{String(block.heading ?? "")}</h1>
      {block.subheading ? <p className="editorial-hero-lead">{String(block.subheading)}</p> : null}
      {ctaLinks(primary, secondary, locale)}
    </EditorialSection>
  );
}

function ProseBlockView({ block }: BlockProps) {
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

function FeatureGridBlockView({ block }: BlockProps) {
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

function StatementBlockView({ block }: BlockProps) {
  return (
    <EditorialSection
      className={`section statement-block is-${String(block.tone ?? "light")}`}
      shellClassName="website-page-shell"
    >
      {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
      <h2>{String(block.heading ?? "")}</h2>
      {block.copy ? <p>{String(block.copy)}</p> : null}
    </EditorialSection>
  );
}

function MediaBlockView({ block }: BlockProps) {
  const media = block.image as
    | { url?: string | null; alt?: string | null; width?: number | null; height?: number | null }
    | number
    | null;
  const image = media && typeof media === "object" ? media : null;
  const videoUrl = typeof block.videoUrl === "string" ? block.videoUrl : null;
  return (
    <EditorialSection className="section media-block" shellClassName="website-page-shell">
      {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      {videoUrl ? (
        <video controls playsInline src={videoUrl} />
      ) : image?.url ? (
        <img
          alt={image.alt ?? ""}
          height={image.height ?? undefined}
          src={image.url}
          width={image.width ?? undefined}
        />
      ) : null}
      {block.caption ? <p>{String(block.caption)}</p> : null}
    </EditorialSection>
  );
}

function LeadFormBlockView({ block, locale }: BlockProps) {
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
      <h2>{String(block.heading ?? "")}</h2>
      {block.copy ? <p>{String(block.copy)}</p> : null}
      <LeadForm
        buttonLabel={
          typeof block.buttonLabel === "string"
            ? block.buttonLabel
            : locale === "de"
              ? "Nachricht senden"
              : "Send message"
        }
        source={`/${locale}`}
        topic={typeof block.topic === "string" ? block.topic : undefined}
      />
    </EditorialSection>
  );
}

async function ModuleBlockView({ block, locale }: BlockProps) {
  const moduleName = String(block.module ?? "");
  switch (moduleName) {
    case "realityCheck":
      return <OrganizationalRealityCheck />;
    case "categoryEvolution":
      return <CategoryEvolution />;
    case "capabilityJourney":
      return <CapabilityJourney />;
    case "trustLogos":
      return <TrustLogoMarquee />;
    case "brandIllustration":
      return (
        <EditorialSection className="section" shellClassName="website-page-shell">
          <BrandIllustration
            decorative={false}
            interactive
            variant={
              (block.illustrationVariant as "BC-001" | "BC-002" | "BC-005") ??
              "BC-002"
            }
          />
        </EditorialSection>
      );
    case "successStories": {
      const stories = await getSuccessStories(locale);
      return (
        <EditorialSection className="section" shellClassName="website-page-shell">
          {block.heading ? <h2>{String(block.heading)}</h2> : null}
          <EditorialGrid>
            {stories.map((story) => (
              <EditorialCard key={story.id}>
                <h3>{story.customer}</h3>
                {story.industry ? <p>{story.industry}</p> : null}
                <p>{story.result}</p>
              </EditorialCard>
            ))}
          </EditorialGrid>
        </EditorialSection>
      );
    }
    case "theoryReader":
      return (
        <EditorialSection className="section" shellClassName="website-page-shell">
          <h2>
            {String(
              block.heading ??
                (locale === "de"
                  ? "Theorie der Organizational Intelligence"
                  : "The Theory of Organizational Intelligence"),
            )}
          </h2>
          {block.copy ? <p>{String(block.copy)}</p> : null}
          <Link className="button" href={`/${locale}/thinking/theory`}>
            {locale === "de" ? "Theorie lesen" : "Read the theory"}
          </Link>
        </EditorialSection>
      );
    default:
      return null;
  }
}

function CTABlockView({ block, locale }: BlockProps) {
  const primary = (block.primaryCta as Cta) ?? undefined;
  const secondary = (block.secondaryCta as Cta) ?? undefined;
  const primaryHref = ctaHref(primary, locale);
  const secondaryHref = ctaHref(secondary, locale);
  if (!primaryHref || !primary?.label) return null;
  return (
    <ExecutiveCTA
      eyebrow={block.eyebrow ? String(block.eyebrow) : undefined}
      headline={String(block.heading ?? "")}
      copy={String(block.copy ?? "")}
      primary={{ href: primaryHref, label: primary.label }}
      secondary={
        secondaryHref && secondary?.label
          ? { href: secondaryHref, label: secondary.label }
          : undefined
      }
    />
  );
}

const renderers: Record<
  string,
  (props: BlockProps) => React.ReactNode | Promise<React.ReactNode>
> = {
  hero: HeroBlockView,
  prose: ProseBlockView,
  featureGrid: FeatureGridBlockView,
  statement: StatementBlockView,
  media: MediaBlockView,
  leadForm: LeadFormBlockView,
  module: ModuleBlockView,
  cta: CTABlockView,
};

/** Single template that turns a page's CMS blocks into rendered sections. */
export async function RenderBlocks({
  blocks,
  locale,
}: {
  blocks: Block[];
  locale: Locale;
}) {
  const rendered = await Promise.all(
    blocks.map(async (block, index) => {
      const Renderer = renderers[block.blockType];
      if (!Renderer) return null;
      return (
        <Renderer
          block={block}
          key={block.id ?? `${block.blockType}-${index}`}
          locale={locale}
        />
      );
    }),
  );
  return (
    <>
      {rendered}
    </>
  );
}
