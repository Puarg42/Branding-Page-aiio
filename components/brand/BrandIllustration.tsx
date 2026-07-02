export type BrandIllustrationVariant =
  | "BC-001"
  | "BC-002"
  | "BC-003"
  | "BC-004"
  | "BC201"
  | "BC202"
  | "BC203"
  | "BC204";

const brandCanonAssets: Record<
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
    alt: "Transparent Intelligence material illustration",
    src: "/brand-canon/003-transparent-intelligence-material.png",
  },
  "BC-004": {
    alt: "Organizational Intelligence Elements brand illustration",
    src: "/brand-canon/004-visual-language-library.png",
  },
  BC201: {
    alt: "Organizational Source Code brand illustration",
    src: "/brand-canon/201-organizational-source-code.png",
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
  priority?: boolean;
  variant: BrandIllustrationVariant;
};

export function BrandIllustration({
  className = "",
  decorative = true,
  priority = false,
  variant,
}: BrandIllustrationProps) {
  const asset = brandCanonAssets[variant];

  return (
    <figure
      aria-hidden={decorative ? "true" : undefined}
      className={`brand-canon-figure is-${variant.toLowerCase()} ${className}`.trim()}
    >
      <img
        alt={decorative ? "" : asset.alt}
        className="brand-canon-image"
        loading={priority ? "eager" : "lazy"}
        src={asset.src}
      />
    </figure>
  );
}
