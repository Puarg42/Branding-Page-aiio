import type { SVGProps } from "react";

type EditorialJumpArrowProps = SVGProps<SVGSVGElement>;

export function EditorialJumpArrow({
  className,
  ...props
}: EditorialJumpArrowProps) {
  const classNames = ["editorial-jump-arrow", "editorial-reference-icon", className]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      aria-hidden="true"
      className={classNames}
      focusable="false"
      viewBox="0 0 14 14"
      {...props}
    >
      <circle cx="7" cy="7" fill="currentColor" r="5.5" />
      <text
        fill="#ffffff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="7.7"
        fontWeight="700"
        textAnchor="middle"
        x="7"
        y="9.8"
      >
        i
      </text>
    </svg>
  );
}
