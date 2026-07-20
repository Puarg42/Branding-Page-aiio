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
import { getSiteSettings } from "@/lib/cms/settings";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/config";
import styles from "./CMSBlocks.module.css";

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
type SiteSettingsValue = Awaited<ReturnType<typeof getSiteSettings>>;
type BlockProps = {
  block: Block;
  locale: Locale;
  siteSettings: SiteSettingsValue;
};

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

function settingsCTA(
  value: { label?: string | null; href?: string | null } | null | undefined,
): Cta {
  return value?.label && value.href
    ? { type: "external", label: value.label, url: value.href }
    : undefined;
}

function HeroBlockView({ block, locale, siteSettings }: BlockProps) {
  const primary =
    (block.primaryCta as Cta) ?? settingsCTA(siteSettings?.primaryCta);
  const secondary =
    (block.secondaryCta as Cta) ?? settingsCTA(siteSettings?.secondaryCta);
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

type MediaValue =
  | number
  | {
      url?: string | null;
      alt?: string | null;
      width?: number | null;
      height?: number | null;
    }
  | null
  | undefined;

function mediaData(value: MediaValue, legacy?: unknown, alt?: unknown) {
  const media = value && typeof value === "object" ? value : null;
  return {
    url:
      media?.url ??
      (typeof legacy === "string" && legacy.length ? legacy : null),
    alt:
      media?.alt ??
      (typeof alt === "string" ? alt : ""),
    width: media?.width ?? undefined,
    height: media?.height ?? undefined,
  };
}

function HeroMediaBlockView({ block, locale }: BlockProps) {
  const media = mediaData(
    block.media as MediaValue,
    block.legacyImageUrl,
    block.alt,
  );
  return (
    <EditorialSection
      className={`section ${styles.heroMedia}`}
      shellClassName="website-page-shell"
    >
      <div>
        {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
        <h1>{String(block.heading ?? "")}</h1>
        {block.subheading ? <p>{String(block.subheading)}</p> : null}
        {ctaLinks(block.primaryCta as Cta, block.secondaryCta as Cta, locale)}
      </div>
      {media.url ? (
        <figure>
          <img alt={media.alt} height={media.height} src={media.url} width={media.width} />
        </figure>
      ) : null}
    </EditorialSection>
  );
}

function CardGridBlockView({ block, locale }: BlockProps) {
  const cards =
    (block.cards as Array<Record<string, unknown>> | undefined) ?? [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <EditorialGrid>
        {cards.map((card, index) => {
          const media = mediaData(
            card.image as MediaValue,
            card.legacyImageUrl,
            card.imageAlt,
          );
          const href = ctaHref(card.link as Cta, locale);
          return (
            <EditorialCard key={String(card.id ?? index)}>
              {media.url ? <img alt={media.alt} src={media.url} /> : null}
              <h3>{String(card.title ?? "")}</h3>
              {card.copy ? <p>{String(card.copy)}</p> : null}
              {href ? <Link href={href}>{String((card.link as Cta)?.label ?? "Learn more")}</Link> : null}
            </EditorialCard>
          );
        })}
      </EditorialGrid>
    </EditorialSection>
  );
}

function FAQBlockView({ block }: BlockProps) {
  const items =
    (block.items as Array<{ id?: string; question?: string; answer?: SerializedEditorState }>) ??
    [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.eyebrow ? <EditorialEyebrow>{String(block.eyebrow)}</EditorialEyebrow> : null}
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <div className={styles.faq}>
        {items.map((item, index) => (
          <details key={item.id ?? index}>
            <summary>{item.question}</summary>
            {item.answer ? <RichText data={item.answer} /> : null}
          </details>
        ))}
      </div>
    </EditorialSection>
  );
}

function TimelineBlockView({ block }: BlockProps) {
  const milestones =
    (block.milestones as Array<Record<string, unknown>> | undefined) ?? [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <div className={styles.timeline}>
        {milestones.map((item, index) => (
          <article key={String(item.id ?? index)}>
            <span>{String(item.date ?? "")}</span>
            <h3>{String(item.title ?? "")}</h3>
            {item.copy ? <p>{String(item.copy)}</p> : null}
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}

function PeopleBlockView({ block }: BlockProps) {
  const people =
    (block.people as Array<Record<string, unknown>> | undefined) ?? [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <EditorialGrid>
        {people.map((person, index) => {
          const media = mediaData(person.image as MediaValue, person.legacyImageUrl);
          return (
            <EditorialCard key={String(person.id ?? index)}>
              {media.url ? <img alt={String(person.name ?? "")} src={media.url} /> : null}
              <h3>{String(person.name ?? "")}</h3>
              {person.role ? <p>{String(person.role)}</p> : null}
              {person.bio ? <p>{String(person.bio)}</p> : null}
            </EditorialCard>
          );
        })}
      </EditorialGrid>
    </EditorialSection>
  );
}

function AwardsProofBlockView({ block, locale }: BlockProps) {
  const items =
    (block.items as Array<Record<string, unknown>> | undefined) ?? [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <EditorialGrid>
        {items.map((item, index) => {
          const href = ctaHref(item.sourceLink as Cta, locale);
          const logo = mediaData(item.logo as MediaValue, item.legacyImageUrl);
          return (
            <EditorialCard key={String(item.id ?? index)}>
              {logo.url ? <img alt={String(item.title ?? "")} src={logo.url} /> : null}
              <h3>{String(item.title ?? "")}</h3>
              <p>{[item.issuer, item.year].filter(Boolean).join(" · ")}</p>
              {item.evidence ? <p>{String(item.evidence)}</p> : null}
              {href ? <Link href={href}>Source</Link> : null}
            </EditorialCard>
          );
        })}
      </EditorialGrid>
    </EditorialSection>
  );
}

function LinkListBlockView({ block, locale }: BlockProps) {
  const links =
    (block.links as Array<{ id?: string; link?: Cta }> | undefined) ?? [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <ul>
        {links.map((item, index) => {
          const href = ctaHref(item.link, locale);
          return href ? (
            <li key={item.id ?? index}>
              <Link href={href}>{item.link?.label}</Link>
            </li>
          ) : null;
        })}
      </ul>
    </EditorialSection>
  );
}

function OutcomeListBlockView({ block }: BlockProps) {
  const items =
    (block.items as Array<{ id?: string; title?: string; copy?: string }> | undefined) ??
    [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <ol>
        {items.map((item, index) => (
          <li key={item.id ?? index}>
            {item.title ? <strong>{item.title}</strong> : null}
            <p>{item.copy}</p>
          </li>
        ))}
      </ol>
    </EditorialSection>
  );
}

function RelatedPagesBlockView({ block, locale }: BlockProps) {
  const pages =
    (block.pages as Array<number | { id?: number; slug?: string; title?: string }> | undefined) ??
    [];
  return (
    <EditorialSection className="section" shellClassName="website-page-shell">
      {block.heading ? <h2>{String(block.heading)}</h2> : null}
      <EditorialGrid>
        {pages.map((page, index) =>
          typeof page === "object" && page.slug ? (
            <EditorialCard key={page.id ?? index}>
              <h3>{page.title}</h3>
              <Link href={withLocale(locale, `/${page.slug}`)}>Learn more</Link>
            </EditorialCard>
          ) : null,
        )}
      </EditorialGrid>
    </EditorialSection>
  );
}

function SectionNavigationBlockView({ block }: BlockProps) {
  const items =
    (block.items as Array<{ id?: string; label?: string; anchor?: string }> | undefined) ??
    [];
  return (
    <nav aria-label="Page sections" className={styles.sectionNavigation}>
      {items.map((item, index) => (
        <a href={`#${item.anchor}`} key={item.id ?? index}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

function StatementBlockView({ block }: BlockProps) {
  return (
    <EditorialSection
      className={`section ${styles.statement} ${
        block.tone === "dark"
          ? styles.dark
          : block.tone === "accent"
            ? styles.accent
            : styles.light
      }`}
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
                {story.logo && typeof story.logo === "object" && story.logo.url ? (
                  <img alt={story.logo.alt ?? story.customer} src={story.logo.url} />
                ) : null}
                <h3>{story.customer}</h3>
                {story.industry ? <p>{story.industry}</p> : null}
                <h4>Challenge</h4>
                <p>{story.challenge}</p>
                <h4>Action</h4>
                <p>{story.action}</p>
                <h4>Result</h4>
                <p>{story.result}</p>
                {story.proofPoints.map((proof, index) => (
                  <blockquote key={index}>
                    {proof.metric ? <strong>{proof.metric}</strong> : null}
                    {proof.label ? <p>{proof.label}</p> : null}
                    {proof.source ? <cite>{proof.source}</cite> : null}
                  </blockquote>
                ))}
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

function TypedModuleBlockView(props: BlockProps) {
  return ModuleBlockView({
    ...props,
    block: {
      ...props.block,
      module: props.block.blockType,
      illustrationVariant:
        props.block.variant ?? props.block.illustrationVariant,
    },
  });
}

function CTABlockView({ block, locale, siteSettings }: BlockProps) {
  const primary =
    (block.primaryCta as Cta) ?? settingsCTA(siteSettings?.primaryCta);
  const secondary =
    (block.secondaryCta as Cta) ?? settingsCTA(siteSettings?.secondaryCta);
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
  heroMedia: HeroMediaBlockView,
  prose: ProseBlockView,
  featureGrid: FeatureGridBlockView,
  cardGrid: CardGridBlockView,
  faq: FAQBlockView,
  timeline: TimelineBlockView,
  people: PeopleBlockView,
  awardsProof: AwardsProofBlockView,
  linkList: LinkListBlockView,
  outcomeList: OutcomeListBlockView,
  relatedPages: RelatedPagesBlockView,
  sectionNavigation: SectionNavigationBlockView,
  statement: StatementBlockView,
  media: MediaBlockView,
  leadForm: LeadFormBlockView,
  realityCheck: TypedModuleBlockView,
  categoryEvolution: TypedModuleBlockView,
  capabilityJourney: TypedModuleBlockView,
  trustLogos: TypedModuleBlockView,
  brandIllustration: TypedModuleBlockView,
  theoryReader: TypedModuleBlockView,
  successStories: TypedModuleBlockView,
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
  const siteSettings = await getSiteSettings(locale);
  const rendered = await Promise.all(
    blocks.map(async (block, index) => {
      const Renderer = renderers[block.blockType];
      if (!Renderer) return null;
      return (
        <Renderer
          block={block}
          key={block.id ?? `${block.blockType}-${index}`}
          locale={locale}
          siteSettings={siteSettings}
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
