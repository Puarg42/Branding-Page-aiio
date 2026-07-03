import type { ReactNode } from "react";

type EditorialEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function EditorialEyebrow({
  children,
  className = "",
}: EditorialEyebrowProps) {
  return (
    <p className={["website-eyebrow", "editorial-eyebrow", className].filter(Boolean).join(" ")}>
      {children}
    </p>
  );
}
