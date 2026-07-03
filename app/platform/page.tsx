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
    "One Organizational Intelligence System for organizations that continuously understand, develop and evolve.",
};

const capabilities: CapabilityTeaser[] = [
  {
    title: "Understand Your Organization",
    copy:
      "Create and continuously refine the human-readable source code of your organization: how it works, why it works and where decisions depend on it.",
    illustrationVariant: "BC201",
    product: "ProcessCollector",
    quote:
      "When software works, nobody looks at the source code. When it doesn't, the source code explains why. The same is true for organizations.",
    href: "#processcollector",
  },
  {
    title: "Build Organizational Understanding",
    copy:
      "Connect organizational reality across people, systems, documents, operations, standards and external intelligence.",
    secondaryCopy:
      "What ProcessCollector models becomes part of the same living understanding, making ProcessCollector and ProcessMagnet two perspectives of one system.",
    illustrationVariant: "BC202",
    product: "ProcessMagnet",
    href: "#processmagnet",
  },
  {
    title: "Enable Organizational Capabilities",
    copy:
      "Turn organizational understanding into capabilities your organization can repeat, improve and trust.",
    secondaryCopy:
      "Those capabilities help people make better decisions and coordinate action every day.",
    illustrationVariant: "BC203",
    product: "ProcessForge",
    href: "#processforge",
  },
  {
    title: "Evolve Organizations",
    copy:
      "Use goals, scenarios, operational reality and Organizational Intelligence to keep capabilities improving.",
    secondaryCopy:
      "Resilience becomes the outcome of continuous organizational evolution.",
    illustrationVariant: "BC204",
    product: "DataForge",
    href: "#dataforge",
  },
];

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      intro="Organizations need more than disconnected software. They need a system that turns organizational reality into understanding, understanding into capabilities and capabilities into continuous evolution."
      title="One Organizational Intelligence System for organizations that continuously understand, develop and evolve."
    >
      <section
        className="website-architecture-section website-platform-system-section"
        id="capability-layer"
      >
        <div className="website-page-shell">
          <div className="website-platform-system-layout">
            <div className="website-section-heading website-platform-system-copy">
              <p className="website-eyebrow">The System</p>
              <h2>Organizational Intelligence emerges through four capabilities.</h2>
              <p>
                Organizational Intelligence does not emerge from isolated tools.
                It emerges when four capabilities work together: understanding
                the organization, building organizational understanding, enabling
                capabilities and driving continuous evolution. Together, they
                form one Organizational Intelligence System.
              </p>
            </div>
            <div className="website-capability-layer-visual">
              <BrandIllustration variant="BC-002" />
              <p className="website-figure-caption">
                <span>Figure 1</span>
                {" "}
                The Organizational Intelligence System
              </p>
            </div>
          </div>
        </div>
      </section>
      <CapabilityTeaserGrid capabilities={capabilities} />
      <section className="website-architecture-section website-platform-conclusion-section">
        <div className="website-page-shell">
          <div className="website-platform-conclusion">
            <p className="website-eyebrow">Outcome</p>
            <h2>Organizations that understand themselves evolve.</h2>
            <p>
              Organizations that understand themselves develop new capabilities
              with confidence.
            </p>
            <p>
              As these capabilities continuously evolve, the organization becomes
              more resilient, more adaptive and better prepared for change.
            </p>
            <p className="website-platform-conclusion-thesis">
              That is Organizational Intelligence.
            </p>
            <p className="website-platform-conclusion-final">
              aiio is the Organizational Intelligence System that enables it.
            </p>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
