import type { Metadata } from "next";
import {
  CapabilityTeaserGrid,
  WebsiteArchitecturePage,
  type CapabilityTeaser,
} from "../website-architecture";
import { CapabilityLayerIllustration } from "../visual-language";

export const metadata: Metadata = {
  title: "Platform | aiio",
  description:
    "The Organizational Intelligence System as one integrated aiio platform.",
};

const capabilities: CapabilityTeaser[] = [
  {
    title: "Capture Knowledge",
    copy: "Continuously capture organizational knowledge before it disappears and preserve it as the foundation for future understanding.",
    product: "ProcessCollector",
    href: "#processcollector",
  },
  {
    title: "Build Understanding",
    copy: "Transform fragmented knowledge into Organizational Understanding so relationships, context and meaning become visible.",
    product: "ProcessMagnet",
    href: "#processmagnet",
  },
  {
    title: "Enable Action",
    copy: "Turn contextual understanding into better organizational decisions and coordinated action across people and systems.",
    product: "ProcessForge",
    href: "#processforge",
  },
  {
    title: "Evolve Organizations",
    copy: "Measure how capabilities develop over time and make organizational evolution continuously visible.",
    product: "DataForge",
    href: "#dataforge",
    badge: "Coming Soon",
  },
];

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      intro="The aiio Platform is the first Organizational Intelligence System (OIS). It continuously captures organizational knowledge, develops Organizational Understanding, enables better organizational decisions and supports the continuous evolution of organizational capabilities."
      title="The platform for Organizational Intelligence."
    >
      <section
        className="website-architecture-section website-platform-visual-section"
        id="capability-layer"
      >
        <div className="website-page-shell">
          <div className="website-capability-layer-visual" aria-hidden="true">
            <CapabilityLayerIllustration />
          </div>
        </div>
      </section>
      <CapabilityTeaserGrid capabilities={capabilities} />
    </WebsiteArchitecturePage>
  );
}
