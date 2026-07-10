import Link from "next/link";
import {
  EditorialCard,
  EditorialCTAGroup,
  EditorialGrid,
  EditorialSection,
  EditorialSectionHeader,
} from "../components/brand/BrandCanonFoundation";
import { EditorialEyebrow } from "../components/brand/EditorialEyebrow";
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
    "Direkt anschlussfähig an das aiio Organizational Intelligence System.",
  );
  const relatedTitle = getEditableContent(`layer.${slug}.related.title`, "Das System bleibt verbunden.");

  return (
    <main>
      <MainHeader variant="solid" />

      <section className="subhero">
        <div className="subhero-content">
          <EditorialEyebrow>{layerName}</EditorialEyebrow>
          <h1>{product}</h1>
          <p className="hero-copy">{headline}</p>
          <EditorialCTAGroup className="hero-actions">
            <Link className="button button-primary" href="/#architektur">
              Plattform verstehen
            </Link>
            <Link className="button button-secondary" href="/live-demo/kontakt">
              Demo anfordern
            </Link>
          </EditorialCTAGroup>
        </div>
      </section>

      <EditorialSection className="section section-split" shell={false}>
        <div>
          <EditorialEyebrow>{stage}</EditorialEyebrow>
          <h2>{verb}</h2>
        </div>
        <p className="lead-text">{layer.detail}</p>
      </EditorialSection>

      <EditorialSection className="section" shell={false}>
        <EditorialSectionHeader
          className="section-intro compact"
          eyebrow="Wirkung"
          title={impactTitle}
        />
        <EditorialGrid className="outcome-grid">
          {layer.outcomes.map((outcome) => (
            <EditorialCard className="outcome-card" key={outcome}>
              <span />
              <p>{outcome}</p>
            </EditorialCard>
          ))}
        </EditorialGrid>
      </EditorialSection>

      <EditorialSection className="section section-modules" shell={false}>
        <div>
          <EditorialEyebrow>Bausteine</EditorialEyebrow>
          <h2>{modulesTitle}</h2>
        </div>
        <div className="module-list">
          {layer.modules.map((module) => (
            <div key={module}>{module}</div>
          ))}
        </div>
      </EditorialSection>

      <EditorialSection className="section" shell={false}>
        <EditorialSectionHeader
          className="section-intro compact"
          eyebrow="Weitere Layer"
          title={relatedTitle}
        />
        <EditorialGrid className="story-grid two" columns="two">
          {relatedLayers.map((item) => (
            <EditorialCard className="story-card" key={item.slug}>
              <p className="layer-name">
                {getEditableContent(`layer.${item.slug}.layerName`, item.layerName)}
              </p>
              <h3>{getEditableContent(`layer.${item.slug}.product`, item.product)}</h3>
              <p>{item.summary}</p>
              <Link href={`/${item.slug}`}>Layer ansehen</Link>
            </EditorialCard>
          ))}
        </EditorialGrid>
      </EditorialSection>
    </main>
  );
}
