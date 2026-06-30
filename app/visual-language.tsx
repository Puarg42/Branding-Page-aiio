type LayeredVisualVariant = "hero" | "platform" | "thinking";
type ProductVisual = "ProcessCollector" | "ProcessMagnet" | "ProcessForge" | "DataForge";

const knowledgeSignals = [
  "Documents",
  "People",
  "Processes",
  "Policies",
  "ERP",
  "Emails",
  "Standards",
] as const;

const understandingSignals = [
  "Context",
  "Relationships",
  "Memory",
  "Meaning",
] as const;

const capabilitySignals = [
  "Decisions",
  "Agents",
  "Reports",
  "Actions",
] as const;

const productDetails: Record<
  ProductVisual,
  {
    className: string;
    label: string;
    signals: readonly string[];
  }
> = {
  ProcessCollector: {
    className: "collector",
    label: "Knowledge Layer",
    signals: ["Docs", "People", "ERP", "Policies"],
  },
  ProcessMagnet: {
    className: "magnet",
    label: "Understanding Layer",
    signals: ["Graph", "Context", "Memory", "Meaning"],
  },
  ProcessForge: {
    className: "forge",
    label: "Capability Layer",
    signals: ["Agents", "Decisions", "Reports", "Actions"],
  },
  DataForge: {
    className: "dataforge",
    label: "Evolution Layer",
    signals: ["KPIs", "Growth", "Feedback", "Learning"],
  },
};

const stackStages = [
  {
    title: "Capture + Connect",
    label: "ProcessCollector + ProcessMagnet",
    layers: ["Knowledge", "Understanding"],
  },
  {
    title: "Understand + Decide",
    label: "ProcessMagnet + ProcessForge",
    layers: ["Understanding", "Capabilities"],
  },
  {
    title: "Act + Evolve",
    label: "ProcessForge + DataForge",
    layers: ["Capabilities", "Evolution"],
  },
] as const;

export function LayeredIntelligenceVisual({
  variant = "platform",
}: {
  variant?: LayeredVisualVariant;
}) {
  return (
    <div className={`vl-architecture vl-architecture-${variant}`}>
      <div className="vl-particles" aria-hidden="true">
        {Array.from({ length: variant === "hero" ? 32 : 20 }, (_, index) => (
          <span key={index} />
        ))}
      </div>

      <div className="vl-layer vl-layer-capabilities">
        <div className="vl-layer-ring" />
        <div className="vl-layer-content">
          <span className="vl-layer-label">Layer 3</span>
          <strong>Organizational Capabilities</strong>
          <div className="vl-signal-row">
            {capabilitySignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="vl-layer vl-layer-understanding">
        <div className="vl-layer-ring" />
        <div className="vl-understanding-core" />
        <div className="vl-layer-content">
          <span className="vl-layer-label">Layer 2</span>
          <strong>Organizational Understanding</strong>
          <div className="vl-network" aria-hidden="true">
            {understandingSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="vl-layer vl-layer-knowledge">
        <div className="vl-layer-ring" />
        <div className="vl-layer-content">
          <span className="vl-layer-label">Layer 1</span>
          <strong>Organizational Knowledge</strong>
          <div className="vl-fragments">
            {knowledgeSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="vl-vertical-flow" aria-hidden="true" />
    </div>
  );
}

export function CapabilityCardVisual({ product }: { product: ProductVisual }) {
  const detail = productDetails[product];

  return (
    <div className={`vl-card-visual is-${detail.className}`} aria-hidden="true">
      <div className="vl-card-orbit" />
      <div className="vl-card-core" />
      <div className="vl-card-signals">
        {detail.signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
      <p>{detail.label}</p>
    </div>
  );
}

export function TheoryModelVisual() {
  return (
    <div className="vl-theory-model" aria-label="Knowledge to Understanding to Capabilities">
      <div className="vl-theory-node knowledge">
        <span>Knowledge</span>
      </div>
      <div className="vl-theory-arrow" aria-hidden="true" />
      <div className="vl-theory-node understanding">
        <span>Understanding</span>
      </div>
      <div className="vl-theory-arrow" aria-hidden="true" />
      <div className="vl-theory-node capabilities">
        <span>Capabilities</span>
      </div>
    </div>
  );
}

export function CapabilityStackVisual() {
  return (
    <div className="vl-stack-visual" aria-label="Capability evolution stacks">
      {stackStages.map((stage, index) => (
        <article className="vl-stack-stage" key={stage.title}>
          <span className="vl-stack-number">{String(index + 1).padStart(2, "0")}</span>
          <div className="vl-stack-plates" aria-hidden="true">
            {stage.layers.map((layer) => (
              <span className={`vl-stack-plate ${layer.toLowerCase()}`} key={layer} />
            ))}
          </div>
          <h3>{stage.title}</h3>
          <p>{stage.label}</p>
        </article>
      ))}
    </div>
  );
}
