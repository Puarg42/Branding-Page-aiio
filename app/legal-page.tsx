import { MainHeader } from "./main-navigation";
import { resourcePages } from "./resource-pages";

type LegalSlug = "datenschutz" | "impressum";

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = resourcePages[slug];

  return (
    <main className="legal-page">
      <MainHeader />

      <section className="legal-hero" aria-labelledby={`${slug}-title`}>
        <div className="legal-shell">
          <p className="legal-eyebrow">{page.eyebrow}</p>
          <h1 id={`${slug}-title`}>{page.title}</h1>
          <p>{page.intro}</p>
        </div>
      </section>

      <section className="legal-content" aria-label={page.title}>
        <div className="legal-shell legal-card-stack">
          {page.sections.map((section) => (
            <article className="legal-card" key={section.title}>
              <h2>{section.title}</h2>
              {section.copy ? <p>{section.copy}</p> : null}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
