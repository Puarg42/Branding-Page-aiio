import type { SVGProps } from "react";

type EditorialJumpArrowProps = SVGProps<SVGSVGElement>;

export function EditorialJumpArrow({
  className,
  ...props
}: EditorialJumpArrowProps) {
  const classNames = ["editorial-jump-arrow", className].filter(Boolean).join(" ");

  return (
    <svg
      aria-hidden="true"
      className={classNames}
      fill="none"
      focusable="false"
      viewBox="0 0 18 18"
      {...props}
    >
      <path
        d="M5.25 12.75 12.75 5.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M7.1 5.25h5.65v5.65"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
