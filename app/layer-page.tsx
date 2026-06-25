import Link from "next/link";
import { getEditableContent } from "./editor/content";
import { MainHeader } from "./main-navigation";
import { getLayer, layers, type LayerSlug } from "./site-content";

export function LayerPage({ slug }: { slug: LayerSlug }) {
  const layer = getLayer(slug);
  const relatedLayers = layers.filter((item) => item.slug !== slug);
  const layerName = getEditableContent(`layer.${slug}.layerName`, layer.layerName);
  const product = getEditableContent(`layer.${slug}.product`, layer.product);
  const headline = getEditableContent(`layer.${slug}.headline`, layer.headline);
  const stage = getEditableContent(`layer.${slug}.stage`, layer.stage);
  const verb = getEditableContent(`layer.${slug}.verb`, layer.verb);
  const impactTitle = getEditableContent(
    `layer.${slug}.impact.title`,
    "Was dieser Baustein für die Organisation leistet.",
  );
  const modulesTitle = getEditableContent(
    `layer.${slug}.modules.title`,
    "Direkt anschlussfähig an den aiio Produkt-Stack.",
  );
  const relatedTitle = getEditableContent(`layer.${slug}.related.title`, "Der Stack bleibt verbunden.");

  return (
    <main>
      <MainHeader variant="solid" />

      <section className="subhero">
        <div className="subhero-content">
          <p className="eyebrow">{layerName}</p>
          <h1>{product}</h1>
          <p className="hero-copy">{headline}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/#architektur">
              Plattform verstehen
            </Link>
            <Link className="button button-secondary" href="/live-demo/kontakt">
              Demo anfordern
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-split">
        <div>
          <p className="eyebrow">{stage}</p>
          <h2>{verb}</h2>
        </div>
        <p className="lead-text">{layer.detail}</p>
      </section>

      <section className="section">
        <div className="section-intro compact">
          <p className="eyebrow">Wirkung</p>
          <h2>{impactTitle}</h2>
        </div>
        <div className="outcome-grid">
          {layer.outcomes.map((outcome) => (
            <article className="outcome-card" key={outcome}>
              <span />
              <p>{outcome}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-modules">
        <div>
          <p className="eyebrow">Bausteine</p>
          <h2>{modulesTitle}</h2>
        </div>
        <div className="module-list">
          {layer.modules.map((module) => (
            <div key={module}>{module}</div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-intro compact">
          <p className="eyebrow">Weitere Layer</p>
          <h2>{relatedTitle}</h2>
        </div>
        <div className="story-grid two">
          {relatedLayers.map((item) => (
            <article className="story-card" key={item.slug}>
              <p className="layer-name">
                {getEditableContent(`layer.${item.slug}.layerName`, item.layerName)}
              </p>
              <h3>{getEditableContent(`layer.${item.slug}.product`, item.product)}</h3>
              <p>{item.summary}</p>
              <Link href={`/${item.slug}`}>Layer ansehen</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
