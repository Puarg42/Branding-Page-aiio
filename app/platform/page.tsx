import type { Metadata } from "next";
import {
  CapabilityTeaserGrid,
  WebsiteArchitecturePage,
  type CapabilityTeaser,
} from "../website-architecture";
import { BrandIllustration } from "../../components/brand/BrandIllustration";

export const metadata: Metadata = {
  title: "Platform | aiio",
  description:
    "The Organizational Intelligence System for organizations that continuously develop new capabilities.",
};

const capabilities: CapabilityTeaser[] = [
  {
    title: "Understand Your Organization",
    copy:
      "Create, model and continuously refine the human-readable representation of your organization. It becomes the organizational source code that explains how your organization works and why.",
    product: "ProcessCollector",
    quote:
      "When software works, nobody looks at the source code. When it doesn't, the source code explains why. The same is true for organizations.",
    href: "#processcollector",
  },
  {
    title: "Build Organizational Understanding",
    copy:
      "AI agents continuously capture and connect organizational reality from people, systems, documents, operational data, standards, market knowledge and external intelligence to build organizational understanding.",
    secondaryCopy:
      "Everything modeled in ProcessCollector also becomes part of this continuously evolving organizational understanding.",
    product: "ProcessMagnet",
    href: "#processmagnet",
  },
  {
    title: "Enable Organizational Capabilities",
    copy:
      "Continuously develop new organizational capabilities from complete organizational understanding, not only from documented processes.",
    secondaryCopy:
      "These capabilities help people make better decisions every day.",
    product: "ProcessForge",
    href: "#processforge",
  },
  {
    title: "Evolve Organizations",
    copy:
      "Continuously evolve your organization using goals, scenarios, operational reality and Organizational Intelligence.",
    secondaryCopy:
      "Organizational resilience becomes the business outcome of continuous evolution.",
    product: "DataForge",
    href: "#dataforge",
    badge: "Coming Soon",
  },
];

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      intro="The Organizational Intelligence System connects organizational reality, AI and action so your organization can understand itself, develop new capabilities and become more resilient over time."
      title="The system for organizations that continuously evolve."
    >
      <section
        className="website-architecture-section website-platform-visual-section"
        id="capability-layer"
      >
        <div className="website-page-shell">
          <div className="website-capability-layer-visual" aria-hidden="true">
            <BrandIllustration variant="BC-002" />
          </div>
        </div>
      </section>
      <CapabilityTeaserGrid capabilities={capabilities} />
    </WebsiteArchitecturePage>
  );
}
