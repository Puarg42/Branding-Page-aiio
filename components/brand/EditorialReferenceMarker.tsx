import type { CSSProperties, SVGProps } from "react";

export type EditorialReferenceMarkerProps = SVGProps<SVGSVGElement>;

const markerStyle: CSSProperties = {
  display: "inline-block",
  flex: "0 0 17px",
  height: "17px",
  lineHeight: 0,
  marginLeft: "3px",
  maxHeight: "17px",
  maxWidth: "17px",
  minHeight: "17px",
  minWidth: "17px",
  transform: "translateY(-0.28em)",
  transition: "color 180ms ease, filter 180ms ease, opacity 180ms ease",
  verticalAlign: "baseline",
  width: "17px",
};

export function EditorialReferenceMarker({
  className,
  style,
  ...props
}: EditorialReferenceMarkerProps) {
  const classNames = ["editorial-reference-marker", className]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      {...props}
      aria-hidden="true"
      className={classNames}
      focusable="false"
      height={17}
      style={{ ...style, ...markerStyle }}
      viewBox="0 0 18 18"
      width={17}
    >
      <circle cx="9" cy="9" fill="currentColor" r="8" />
      <text
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="9.8"
        fontWeight="700"
        textAnchor="middle"
        x="9"
        y="12.45"
      >
        i
      </text>
    </svg>
  );
}
