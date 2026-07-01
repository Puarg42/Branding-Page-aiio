import type { Metadata } from "next";
import { WebsiteArchitecturePage } from "../../website-architecture";

export const metadata: Metadata = {
  title: "Theory | aiio",
  description: "The digital theory of Organizational Intelligence is being prepared.",
};

export default function TheoryPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="THEORY"
      intro="The digital theory is currently being prepared."
      title="Organizational Intelligence"
    />
  );
}
