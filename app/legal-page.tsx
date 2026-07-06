import {
  EditorialCard,
  EditorialGrid,
  EditorialHero,
  EditorialNavigation,
  EditorialSection,
} from "../components/brand/BrandCanonFoundation";
import { MainHeader } from "./main-navigation";
import { resourcePages } from "./resource-pages";

type LegalSlug = "datenschutz" | "impressum";

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = resourcePages[slug];
  const sectionNavigator = [
    { id: `${slug}-hero`, label: "Hero" },
    { id: `${slug}-content`, label: page.eyebrow },
  ] as const;

  return (
    <main className="legal-page">
      <MainHeader />

      <EditorialHero
        className="legal-hero"
        eyebrow={page.eyebrow}
        id={`${slug}-hero`}
        intro={page.intro}
        shellClassName="legal-shell"
        title={page.title}
        titleId={`${slug}-title`}
      />

      <EditorialSection
        ariaLabel={page.title}
        className="legal-content"
        id={`${slug}-content`}
        shellClassName="legal-shell"
      >
        <EditorialGrid className="legal-card-stack" columns="two">
          {page.sections.map((section) => (
            <EditorialCard className="legal-card" key={section.title}>
              <h2>{section.title}</h2>
              {section.copy ? <p>{section.copy}</p> : null}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </EditorialCard>
          ))}
        </EditorialGrid>
      </EditorialSection>
      <EditorialNavigation
        ariaLabel={`${page.title} sections`}
        sections={sectionNavigator}
      />
    </main>
  );
}
