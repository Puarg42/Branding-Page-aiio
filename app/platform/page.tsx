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
    "One Organizational Intelligence System with four complementary capabilities.",
};

const capabilities: CapabilityTeaser[] = [
  {
    title: "Understand Your Organization",
    copy:
      "Create and continuously refine the human-readable representation of your organization. It becomes the organizational source code that explains how your organization works and why.",
    illustrationVariant: "BC201",
    product: "ProcessCollector",
    quote:
      "When software works, nobody looks at the source code. When it doesn't, the source code explains why. The same is true for organizations.",
    href: "#processcollector",
  },
  {
    title: "Build Organizational Understanding",
    copy:
      "Connect organizational reality from people, systems, documents, operational data, standards, market knowledge and external intelligence.",
    secondaryCopy:
      "Everything modeled in ProcessCollector expands this understanding, making ProcessCollector and ProcessMagnet two perspectives of one system.",
    illustrationVariant: "BC202",
    product: "ProcessMagnet",
    href: "#processmagnet",
  },
  {
    title: "Enable Organizational Capabilities",
    copy:
      "Transform organizational understanding into executable organizational capabilities.",
    secondaryCopy:
      "These capabilities help people make better decisions and coordinate action every day.",
    illustrationVariant: "BC203",
    product: "ProcessForge",
    href: "#processforge",
  },
  {
    title: "Evolve Organizations",
    copy:
      "Continuously evolve organizational capabilities using goals, scenarios, operational reality and Organizational Intelligence.",
    secondaryCopy:
      "Resilience becomes the business outcome of continuous organizational evolution.",
    illustrationVariant: "BC204",
    product: "DataForge",
    href: "#dataforge",
    badge: "Coming Soon",
  },
];

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      intro="aiio is one Organizational Intelligence System with four complementary capabilities: understand your organization, build organizational understanding, enable organizational capabilities and evolve continuously."
      title="One system for organizations that continuously evolve."
    >
      <section
        className="website-architecture-section website-platform-system-section"
        id="capability-layer"
      >
        <div className="website-page-shell">
          <div className="website-platform-system-layout">
            <div className="website-section-heading website-platform-system-copy">
              <p className="website-eyebrow">The System</p>
              <h2>Four capabilities that work as one.</h2>
              <p>
                Together, they create one continuous path from organizational
                reality to organizational evolution.
              </p>
            </div>
            <div className="website-capability-layer-visual" aria-hidden="true">
              <BrandIllustration variant="BC-002" />
            </div>
          </div>
        </div>
      </section>
      <CapabilityTeaserGrid capabilities={capabilities} />
      <section className="website-architecture-section website-platform-conclusion-section">
        <div className="website-page-shell">
          <div className="website-platform-conclusion">
            <p className="website-eyebrow">Outcome</p>
            <h2>One continuously evolving Organizational Intelligence System.</h2>
            <p>
              Together, these four capabilities help your organization understand
              reality, develop new capabilities, make better decisions and become
              more resilient over time.
            </p>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
