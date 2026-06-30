type LayeredVisualVariant = "brand" | "hero" | "platform" | "thinking";
type ProductVisual = "ProcessCollector" | "ProcessMagnet" | "ProcessForge" | "DataForge";

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
    signals: ["Knowledge", "Structure", "Memory"],
  },
  ProcessMagnet: {
    className: "magnet",
    label: "Build Understanding",
    signals: ["Context", "Relations", "Meaning"],
  },
  ProcessForge: {
    className: "forge",
    label: "Enable Action",
    signals: ["Decision", "Action", "Enablement"],
  },
  DataForge: {
    className: "dataforge",
    label: "Evolve Organizations",
    signals: ["Feedback", "Learning", "Evolution"],
  },
};

const layerModel = [
  {
    className: "knowledge",
    title: "Knowledge",
    caption: "Frost White",
  },
  {
    className: "understanding",
    title: "Understanding",
    caption: "Cyan",
  },
  {
    className: "action",
    title: "Action",
    caption: "Deep Violet",
  },
  {
    className: "evolution",
    title: "Evolution",
    caption: "Warm Amber",
  },
] as const;

const stackStages = [
  {
    title: "Capture Knowledge",
    label: "Transparent Knowledge",
    layers: ["knowledge"],
  },
  {
    title: "Build Understanding",
    label: "Connected Understanding",
    layers: ["knowledge", "understanding"],
  },
  {
    title: "Enable Action",
    label: "Coordinated Action",
    layers: ["understanding", "action"],
  },
  {
    title: "Evolve Organizations",
    label: "Continuous Evolution",
    layers: ["action", "evolution"],
  },
] as const;

export function LayeredIntelligenceVisual({
  variant = "platform",
}: {
  variant?: LayeredVisualVariant;
}) {
  return (
    <div
      className={`vl-architecture vl-architecture-${variant}`}
      aria-label="Capability layers: Knowledge, Understanding, Action and Evolution"
    >
      <div className="vl-visual-field" aria-hidden="true">
        <span className="vl-light-column" />
        <span className="vl-light-flow" />
        {layerModel.map((layer, index) => (
          <div className={`vl-layer-orbit ${layer.className}`} key={layer.title}>
            <span className="vl-layer-glass" />
            <span className="vl-layer-line" />
            <span className="vl-layer-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="vl-layer-copy">
              <strong>{layer.title}</strong>
              <span>{layer.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BrandIllustration() {
  return <LayeredIntelligenceVisual variant="brand" />;
}

export function CapabilityLayerIllustration() {
  return <LayeredIntelligenceVisual variant="platform" />;
}

export function CapabilityCardVisual({ product }: { product: ProductVisual }) {
  const detail = productDetails[product];

  return (
    <div className={`vl-card-visual is-${detail.className}`} aria-hidden="true">
      <span className="vl-card-material" />
      <span className="vl-card-light" />
      <div className="vl-card-signals">
        {detail.signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
      <p>{detail.label}</p>
    </div>
  );
}

export function VisualLanguageLibraryVisual() {
  return (
    <div className="vl-library-visual" aria-label="aiio visual language: transparent optical objects">
      <div className="vl-library-row row-one" aria-hidden="true">
        {["panel", "graph", "memory", "material", "wave"].map((shape) => (
          <span className={`vl-library-object ${shape}`} key={shape} />
        ))}
      </div>
      <div className="vl-library-row row-two" aria-hidden="true">
        {["knowledge", "understanding", "action", "evolution"].map((shape) => (
          <span className={`vl-library-system ${shape}`} key={shape} />
        ))}
      </div>
      <span className="vl-library-light" aria-hidden="true" />
    </div>
  );
}

export function OrganizationalMindVisual() {
  return (
    <div className="vl-organizational-mind" aria-label="Living Organizational Memory becoming understanding">
      <span className="vl-mind-light" aria-hidden="true" />
      <span className="vl-mind-core" aria-hidden="true">
        <strong>Understanding</strong>
      </span>
      {["Knowledge", "Context", "Memory", "Relations", "Reasoning", "Capability"].map(
        (node, index) => (
          <span className={`vl-mind-node node-${index + 1}`} key={node}>
            {node}
          </span>
        ),
      )}
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
              <span className={`vl-stack-plate ${layer}`} key={layer} />
            ))}
          </div>
          <h3>{stage.title}</h3>
          <p>{stage.label}</p>
        </article>
      ))}
    </div>
  );
}
