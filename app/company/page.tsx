import type { Metadata } from "next";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Company | aiio",
  description:
    "Why aiio exists and how the company advances Organizational Intelligence.",
};

const sections = [
  { title: "Mission" },
  { title: "Belief" },
  { title: "Journey" },
  { title: "Leadership" },
  { title: "Careers", purpose: "Placeholder" },
] as const;

export default function CompanyPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Company"
      intro="This page will explain why aiio exists, not simply describe who aiio is."
      sections={sections}
      title="Why aiio exists."
    />
  );
}
