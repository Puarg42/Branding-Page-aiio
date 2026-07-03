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
      "Create a human-readable representation of your organization so teams can see its structure, responsibilities and decisions clearly.",
    illustrationVariant: "BC201",
    product: "ProcessCollector",
    quote:
      "When software works, nobody looks at the source code. When it doesn't, the source code explains why. The same is true for organizations.",
    href: "#processcollector",
  },
  {
    title: "Build Organizational Self-Understanding",
    copy:
      "Connect organizational reality into self-understanding so your organization can interpret its structures, relationships and decisions.",
    illustrationVariant: "BC202",
    product: "ProcessMagnet",
    quote:
      "A library stores knowledge. Understanding begins when every piece of knowledge becomes connected.",
    href: "#processmagnet",
  },
  {
    title: "Enable Organizational Capabilities",
    copy:
      "Turn self-understanding into capabilities your organization can repeat, improve and trust in daily execution.",
    illustrationVariant: "BC203",
    product: "ProcessForge",
    quote:
      "A recipe doesn't cook dinner. A capability turns knowledge into repeatable execution.",
    href: "#processforge",
  },
  {
    title: "Continuously Evolve Your Organization",
    copy:
      "Use goals, scenarios and operational reality to evolve capabilities and strengthen resilience under change.",
    illustrationVariant: "BC204",
    product: "DataForge",
    quote:
      "Organizations don't become resilient by standing still. They become resilient by continuously evolving their capabilities.",
    href: "#dataforge",
  },
];

export default function PlatformPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Platform"
      intro="Organizations need more than disconnected software. They need a system that turns organizational reality into understanding, understanding into capabilities and capabilities into continuous evolution."
      title={"One Organizational\nIntelligence System\n\nfor organizations that\ncontinuously understand themselves,\ndevelop new capabilities\nand become resilient."}
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
                the organization, developing Organizational Self-Understanding,
                enabling organizational capabilities and driving continuous
                evolution. Together, they form one Organizational Intelligence
                System.
              </p>
            </div>
            <div className="website-capability-layer-visual">
              <BrandIllustration variant="BC-002" />
            </div>
          </div>
        </div>
      </section>
      <CapabilityTeaserGrid capabilities={capabilities} />
      <section className="website-architecture-section website-platform-outcome-section">
        <div className="website-page-shell">
          <div className="website-platform-conclusion">
            <p className="website-eyebrow">Outcome</p>
            <h2>The outcome is organizational resilience.</h2>
            <p>
              The outcome is not another software platform.
            </p>
            <p>
              The outcome is an organization that continuously understands
              itself, develops new capabilities and increasingly empowers itself
              to adapt, improve and respond to change.
            </p>
            <div
              aria-label="Organizational Intelligence outcome hierarchy"
              className="website-platform-outcome-ladder"
            >
              <div>
                <span>Level 1</span>
                <strong>Organizational Self-Understanding</strong>
              </div>
              <div>
                <span>Level 2</span>
                <strong>Organizational Intelligence</strong>
              </div>
              <div>
                <span>Level 3</span>
                <strong>Organizational Capabilities</strong>
              </div>
              <div>
                <span>Business Outcome</span>
                <strong>Organizational Resilience</strong>
              </div>
            </div>
            <p>
              Organizations that continuously understand themselves gradually
              become self-empowering. They no longer rely solely on individual
              knowledge. They continuously develop new organizational
              capabilities.
            </p>
            <p className="website-platform-conclusion-thesis">
              This is the foundation of Organizational Resilience.
            </p>
            <p className="website-platform-conclusion-final">
              The goal is not better documentation. The goal is not another AI
              platform. The goal is an organization that continuously
              understands itself, develops new capabilities and becomes
              increasingly resilient.
            </p>
          </div>
        </div>
      </section>
    </WebsiteArchitecturePage>
  );
}
