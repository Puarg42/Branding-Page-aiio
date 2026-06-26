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
    title: "Capture",
    copy: "Preserve organizational knowledge before it disappears.",
    product: "ProcessCollector",
    href: "#processcollector",
  },
  {
    title: "Understand",
    copy: "Turn fragmented knowledge into shared organizational understanding.",
    product: "ProcessMagnet",
    href: "#processmagnet",
  },
  {
    title: "Enable",
    copy: "Make organizational intelligence usable for people, agents and systems.",
    product: "ProcessForge",
    href: "#processforge",
  },
  {
    title: "Evolve",
    copy: "Prepare the organization to learn continuously from its own memory.",
    product: "DataForge",
    href: "#dataforge",
    badge: "Coming Soon",
  },
];

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      intro="The Organizational Intelligence System brings capture, understanding, enablement and evolution into one integrated platform."
      title="The platform for Organizational Intelligence."
    >
      <CapabilityTeaserGrid capabilities={capabilities} />
    </WebsiteArchitecturePage>
  );
}
