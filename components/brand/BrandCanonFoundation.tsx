import type { ElementType, ReactNode } from "react";
import { EditorialEyebrow } from "./EditorialEyebrow";
import {
  EditorialSectionNavigator,
  type EditorialSectionNavigatorItem,
} from "./EditorialSectionNavigator";

type FoundationProps = {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type EditorialHeroProps = {
  actions?: ReactNode;
  className?: string;
  eyebrow: ReactNode;
  id?: string;
  intro?: ReactNode;
  labelledBy?: string;
  lead?: ReactNode;
  shellClassName?: string;
  title: ReactNode;
  titleId?: string;
  visual?: ReactNode;
};

export function EditorialHero({
  actions,
  className,
  eyebrow,
  id,
  intro,
  labelledBy,
  lead,
  shellClassName,
  title,
  titleId,
  visual,
}: EditorialHeroProps) {
  return (
    <section
      aria-labelledby={labelledBy ?? titleId}
      className={cx("editorial-hero", className)}
      id={id}
    >
      <div className={cx("editorial-shell", shellClassName)}>
        {visual ? <div className="editorial-hero-visual">{visual}</div> : null}
        <EditorialEyebrow>{eyebrow}</EditorialEyebrow>
        <h1 id={titleId}>{title}</h1>
        {lead ? <p className="editorial-hero-lead">{lead}</p> : null}
        {intro ? <p className="editorial-hero-intro">{intro}</p> : null}
        {actions ? <EditorialCTAGroup>{actions}</EditorialCTAGroup> : null}
      </div>
    </section>
  );
}

export type EditorialSectionProps = FoundationProps & {
  ariaLabel?: string;
  as?: ElementType;
  id?: string;
  shell?: boolean;
  shellClassName?: string;
};

export function EditorialSection({
  ariaLabel,
  as: Component = "section",
  children,
  className,
  id,
  shell = true,
  shellClassName,
}: EditorialSectionProps) {
  return (
    <Component
      aria-label={ariaLabel}
      className={cx("editorial-section", className)}
      id={id}
    >
      {shell ? (
        <div className={cx("editorial-shell", shellClassName)}>{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}

export type EditorialSectionHeaderProps = {
  children?: ReactNode;
  className?: string;
  eyebrow?: ReactNode;
  lead?: ReactNode;
  title: ReactNode;
};

export function EditorialSectionHeader({
  children,
  className,
  eyebrow,
  lead,
  title,
}: EditorialSectionHeaderProps) {
  return (
    <div className={cx("editorial-section-header", className)}>
      {eyebrow ? <EditorialEyebrow>{eyebrow}</EditorialEyebrow> : null}
      <h2>{title}</h2>
      {lead ? <p>{lead}</p> : null}
      {children}
    </div>
  );
}

export function EditorialNavigation({
  ariaLabel,
  sections,
}: {
  ariaLabel?: string;
  sections: readonly EditorialSectionNavigatorItem[];
}) {
  return <EditorialSectionNavigator ariaLabel={ariaLabel} sections={sections} />;
}

export function EditorialClosing({ ariaLabel, children, className, id }: FoundationProps) {
  return (
    <div aria-label={ariaLabel} className={cx("editorial-closing", className)} id={id}>
      {children}
    </div>
  );
}

export function EditorialCTAGroup({ ariaLabel, children, className, id }: FoundationProps) {
  return (
    <div aria-label={ariaLabel} className={cx("editorial-cta-group", className)} id={id}>
      {children}
    </div>
  );
}

export type EditorialGridProps = FoundationProps & {
  columns?: "auto" | "two" | "three" | "four";
};

export function EditorialGrid({
  ariaLabel,
  children,
  className,
  columns = "auto",
  id,
}: EditorialGridProps) {
  return (
    <div
      aria-label={ariaLabel}
      className={cx("editorial-grid", `is-${columns}`, className)}
      id={id}
    >
      {children}
    </div>
  );
}

export type EditorialCardProps = FoundationProps & {
  as?: ElementType;
  dataCapability?: string;
  hrefSlot?: ReactNode;
};

export function EditorialCard({
  as: Component = "article",
  children,
  className,
  dataCapability,
  hrefSlot,
  id,
}: EditorialCardProps) {
  return (
    <Component
      className={cx("editorial-card", className)}
      data-capability={dataCapability}
      id={id}
    >
      <div className="editorial-card-body">{children}</div>
      {hrefSlot ? <div className="editorial-card-cta">{hrefSlot}</div> : null}
    </Component>
  );
}

export type JourneyCardProps = FoundationProps & {
  cta?: ReactNode;
  dataCapability?: string;
  description?: ReactNode;
  headline?: ReactNode;
  index?: string;
  insight?: ReactNode;
  label?: ReactNode;
  poweredBy?: ReactNode;
  tone?: "collector" | "magnet" | "forge" | "dataforge" | "neutral";
  visual?: ReactNode;
};

export function JourneyCard({
  children,
  className,
  cta,
  ariaLabel,
  dataCapability,
  description,
  headline,
  id,
  index,
  insight,
  label,
  poweredBy,
  tone = "neutral",
  visual,
}: JourneyCardProps) {
  if (headline || visual || description || insight || cta || poweredBy) {
    return (
      <article
        aria-label={ariaLabel}
        className={cx("journey-card", "journey-card-canonical", className)}
        data-capability={dataCapability}
        id={id}
      >
        {index ? <span className="journey-card-level">{index}</span> : null}
        {headline ? <h3>{headline}</h3> : null}
        {poweredBy ? (
          <div className="journey-card-powered-by">
            <span>
              Powered by <strong>{poweredBy}</strong>
            </span>
          </div>
        ) : null}
        {visual ? <div className="journey-card-visual">{visual}</div> : null}
        {description ? <div className="journey-card-description">{description}</div> : null}
        {insight ? (
          <blockquote className="journey-card-insight">
            <span>Insight</span>
            <p>{insight}</p>
          </blockquote>
        ) : null}
        {cta ? <div className="journey-card-cta">{cta}</div> : null}
      </article>
    );
  }

  return (
    <EditorialCard className={cx("journey-card", className)} dataCapability={dataCapability}>
      {index ? <span className="journey-card-index">{index}</span> : null}
      {label ? <p className="journey-card-label">{label}</p> : null}
      <div data-level={tone}>{children}</div>
    </EditorialCard>
  );
}

export function ReferenceMarquee({ ariaLabel, children, className, id }: FoundationProps) {
  return (
    <div aria-label={ariaLabel} className={cx("reference-marquee", className)} id={id}>
      {children}
    </div>
  );
}

export function TrustRow({ ariaLabel, children, className, id }: FoundationProps) {
  return (
    <div aria-label={ariaLabel} className={cx("trust-row", className)} id={id}>
      {children}
    </div>
  );
}
