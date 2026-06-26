import type { Metadata } from "next";
import {
  CapabilityTeaserGrid,
  WebsiteArchitecturePage,
  type CapabilityTeaser,
} from "../website-architecture";

export const metadata: Metadata = {
  title: "Platform | aiio",
  description:
    "The Organizational Intelligence System as one integrated aiio platform.",
};

const capabilities: CapabilityTeaser[] = [
  {
    title: "Capture Knowledge",
    copy: "Make organizational knowledge visible, preserved and ready to become shared context.",
    product: "ProcessCollector",
    href: "#processcollector",
  },
  {
    title: "Build Understanding",
    copy: "Transform fragmented information into one coherent understanding of the organization.",
    product: "ProcessMagnet",
    href: "#processmagnet",
  },
  {
    title: "Enable Action",
    copy: "Activate organizational intelligence for people, agents, workflows and existing systems.",
    product: "ProcessForge",
    href: "#processforge",
  },
  {
    title: "Evolve Organizations",
    copy: "Create the foundation for organizations that continuously learn and develop capabilities.",
    product: "DataForge",
    href: "#dataforge",
    badge: "Coming Soon",
  },
];

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      intro="The Organizational Intelligence System introduces four platform capabilities that turn organizational knowledge into lasting organizational capability."
      title="The platform for Organizational Intelligence."
    >
      <CapabilityTeaserGrid capabilities={capabilities} />
    </WebsiteArchitecturePage>
  );
}
