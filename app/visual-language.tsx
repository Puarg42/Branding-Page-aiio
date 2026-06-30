type LayeredVisualVariant = "hero" | "platform" | "thinking";
type ProductVisual = "ProcessCollector" | "ProcessMagnet" | "ProcessForge" | "DataForge";

const capabilityLayers = [
  {
    id: "evolution",
    label: "Layer 4",
    product: "DataForge",
    signals: ["KPIs", "Feedback", "Measurement", "Learning"],
    title: "Evolve Organizations",
  },
  {
    id: "action",
    label: "Layer 3",
    product: "ProcessForge",
    signals: ["Agents", "Recommendations", "Reports", "Actions"],
    title: "Enable Action",
  },
  {
    id: "understanding",
    label: "Layer 2",
    product: "ProcessMagnet",
    signals: ["Context", "Knowledge Graph", "Connections", "Meaning"],
    title: "Build Understanding",
  },
  {
    id: "knowledge",
    label: "Layer 1",
    product: "ProcessCollector",
    signals: ["Documents", "Policies", "Processes", "People", "Systems", "Standards"],
    title: "Capture Knowledge",
  },
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
    label: "Capture Knowledge",
    signals: ["Docs", "People", "Processes", "Policies"],
  },
  ProcessMagnet: {
    className: "magnet",
    label: "Build Understanding",
    signals: ["Graph", "Context", "Memory", "Meaning"],
  },
  ProcessForge: {
    className: "forge",
    label: "Enable Action",
    signals: ["Agents", "Recommendations", "Reports", "Actions"],
  },
  DataForge: {
    className: "dataforge",
    label: "Evolve Organizations",
    signals: ["KPIs", "Feedback", "Optimization", "Learning"],
  },
};

const stackStages = [
  {
    title: "Capture Knowledge",
    label: "Foundation - ProcessCollector",
    layers: ["Knowledge"],
  },
  {
    title: "Build Understanding",
    label: "Intelligence - ProcessCollector + ProcessMagnet",
    layers: ["Knowledge", "Understanding"],
  },
  {
    title: "Enable Action",
    label: "Execution - ProcessMagnet + ProcessForge",
    layers: ["Understanding", "Action"],
  },
  {
    title: "Evolve Organizations",
    label: "Evolution - ProcessForge + DataForge",
    layers: ["Action", "Evolution"],
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

      {capabilityLayers.map((layer) => (
        <div className={`vl-layer vl-layer-${layer.id}`} key={layer.id}>
          <div className="vl-layer-ring" />
          {layer.id === "understanding" ? <div className="vl-understanding-core" /> : null}
          <div className="vl-layer-content">
            <span className="vl-layer-label">
              {layer.label} - Powered by {layer.product}
            </span>
            <strong>{layer.title}</strong>
            <div className="vl-signal-row">
              {layer.signals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>
        </div>
      ))}

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
