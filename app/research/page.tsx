import type { Metadata } from "next";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Research | aiio",
  description:
    "The research foundation for Organizational Intelligence and Self-Enabling Organizations.",
};

const sections = [
  { title: "Core Thesis" },
  { title: "Organizational Intelligence" },
  { title: "Whitepapers" },
  { title: "Research" },
  { title: "Publications" },
  { title: "Future Dissertation" },
] as const;

export default function ResearchPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Research"
      intro="The research area will become the thought-leadership home for Organizational Intelligence."
      sections={sections}
      title="The scientific foundation of Organizational Intelligence."
    />
  );
}
