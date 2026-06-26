import type { Metadata } from "next";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Partners | aiio",
  description:
    "The partner architecture for organizations building on the aiio platform.",
};

const sections = [
  { title: "Partner Ecosystem" },
  { title: "Business Model" },
  { title: "Partner Benefits" },
  { title: "Partner Portal" },
  { title: "Call to Action" },
] as const;

export default function PartnersPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Partners"
      intro="The partner area will explain how partners build on aiio and extend the Organizational Intelligence category."
      sections={sections}
      title="Build on the Organizational Intelligence System."
    />
  );
}
