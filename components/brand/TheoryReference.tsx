import Link from "next/link";
import type { ReactNode } from "react";
import { EditorialJumpArrow } from "./EditorialJumpArrow";

type TheoryReferenceProps = {
  children: ReactNode;
  href?: string;
};

export function TheoryReference({
  children,
  href = "/thinking/theory",
}: TheoryReferenceProps) {
  const label = typeof children === "string" ? children : "this concept";

  return (
    <Link
      aria-label={`Read theoretical foundation for ${label}`}
      className="theory-reference"
      href={href}
      title="Read theoretical foundation"
    >
      <span className="theory-reference-text">{children}</span>
      <EditorialJumpArrow />
    </Link>
  );
}
