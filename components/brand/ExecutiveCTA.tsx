import Link from "next/link";
import { EditorialCTAGroup } from "./BrandCanonFoundation";
import { EditorialEyebrow } from "./EditorialEyebrow";

type ExecutiveCTALink = {
  href: string;
  label: string;
};

type ExecutiveCTAProps = {
  copy: string;
  eyebrow?: string;
  headline: string;
  id?: string;
  primary: ExecutiveCTALink;
  secondary?: ExecutiveCTALink;
};

export function ExecutiveCTA({
  copy,
  eyebrow = "Executive CTA",
  headline,
  id,
  primary,
  secondary,
}: ExecutiveCTAProps) {
  return (
    <section className="contextual-executive-cta-section" id={id}>
      <div className="contextual-executive-cta-inner">
        <div className="contextual-executive-cta-copy">
          <EditorialEyebrow>{eyebrow}</EditorialEyebrow>
          <h2>{headline}</h2>
          <p>{copy}</p>
        </div>
        <EditorialCTAGroup
          ariaLabel={`${headline} actions`}
          className="contextual-executive-cta-actions"
        >
          <Link className="button hero-button" href={primary.href}>
            {primary.label}
          </Link>
          {secondary ? (
            <Link className="button hero-button secondary" href={secondary.href}>
              {secondary.label}
            </Link>
          ) : null}
        </EditorialCTAGroup>
      </div>
    </section>
  );
}
