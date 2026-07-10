import type { ReactNode } from "react";

type EditorialEyebrowProps = {
  children: ReactNode;
};

export function EditorialEyebrow({ children }: EditorialEyebrowProps) {
  return <p className="editorial-eyebrow eyebrow">{children}</p>;
}
