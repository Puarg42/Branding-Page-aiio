"use client";

export type BrandIllustrationVariant =
  | "BC-001"
  | "BC-002"
  | "BC-003"
  | "BC-004"
  | "BC-005"
  | "BC-006"
  | "BC-007"
  | "COMPANY-OI"
  | "BC201"
  | "BC202"
  | "BC203"
  | "BC204";

export type BrandCanonViewerMode = "gallery" | "figure";

export const brandCanonAssets: Record<
  BrandIllustrationVariant,
  {
    alt: string;
    src: string;
  }
> = {
  "BC-001": {
    alt: "Organizational Understanding brand illustration",
    src: "/brand-canon/001-organizational-mind.png",
  },
  "BC-002": {
    alt: "Organizational Intelligence Engine brand illustration",
    src: "/brand-canon/002-organizational-intelligence-engine.png",
  },
  "BC-003": {
    alt: "Organizational Intelligence Core platform hero illustration",
    src: "/brand-canon/003-organizational-intelligence-core.png",
  },
  "BC-004": {
    alt: "Organizational Intelligence Elements brand illustration",
    src: "/brand-canon/004-visual-language-library.png",
  },
  "BC-005": {
    alt: "Missing Capability brand illustration",
    src: "/brand-canon/005-missing-capability.png",
  },
  "BC-006": {
    alt: "The Organizational Intelligence System brand illustration",
    src: "/brand-canon/006-organizational-intelligence-system.png",
  },
  "BC-007": {
    alt: "Abstract aiio Brand Canon illustration showing Organizational Intelligence transforming into Business Impact.",
    src: "/brand-canon/bc007-business-impact.png",
  },
  "COMPANY-OI": {
    alt: "Company brand illustration for interdisciplinary Organizational Intelligence",
    src: "/brand-canon/007-company-organizational-intelligence.png",
  },
  BC201: {
    alt: "Organizational Source Code brand illustration",
    src: "/brand-canon/201-organizational-source-code.png?v=20260704",
  },
  BC202: {
    alt: "Organizational Understanding brand illustration",
    src: "/brand-canon/202-organizational-understanding.png",
  },
  BC203: {
    alt: "Organizational Capability brand illustration",
    src: "/brand-canon/203-organizational-capability.png",
  },
  BC204: {
    alt: "Organizational Evolution brand illustration",
    src: "/brand-canon/204-organizational-evolution.png",
  },
};

type BrandIllustrationProps = {
  className?: string;
  decorative?: boolean;
  interactive?: boolean;
  priority?: boolean;
  variant: BrandIllustrationVariant;
  viewerMode?: BrandCanonViewerMode;
};

function openBrandCanonLightbox(
  variant: BrandIllustrationVariant,
  viewerMode: BrandCanonViewerMode,
) {
  window.dispatchEvent(
    new CustomEvent("aiio:brand-canon-open", {
      detail: { variant, viewerMode },
    }),
  );
}

export function BrandIllustration({
  className = "",
  decorative = true,
  interactive = false,
  priority = false,
  variant,
  viewerMode = "figure",
}: BrandIllustrationProps) {
  const asset = brandCanonAssets[variant];
  const image = (
    <img
      alt={decorative && !interactive ? "" : asset.alt}
      className="brand-canon-image"
      loading={priority ? "eager" : "lazy"}
      src={asset.src}
    />
  );

  return (
    <figure
      aria-hidden={decorative && !interactive ? "true" : undefined}
      className={`brand-canon-figure is-${variant.toLowerCase()}${
        interactive ? " is-interactive" : ""
      } ${className}`.trim()}
      data-brand-canon-variant={variant}
    >
      {interactive ? (
        <button
          aria-label={`Open ${asset.alt}`}
          className="brand-canon-trigger"
          onClick={() => openBrandCanonLightbox(variant, viewerMode)}
          type="button"
        >
          {image}
        </button>
      ) : (
        image
      )}
    </figure>
  );
}
