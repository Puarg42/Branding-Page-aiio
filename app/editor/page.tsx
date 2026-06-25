import { MainHeader } from "../main-navigation";

export const metadata = {
  title: "aiio Code-Wegweiser",
  description: "Orientierung für direkte Textänderungen in der aiio Branding Seite.",
};

const editAreas = [
  {
    file: "app/page.tsx",
    id: "startseite",
    title: "Startseite",
    text: "Hero, System-Sektor, Layer-Beschreibungen, Demo-Kasten und die drei Systemkarten.",
  },
  {
    file: "app/resource-pages.tsx",
    id: "ressourcen",
    title: "Ressourcen-Seiten",
    text: "Kontakt, Downloadcenter, Success Stories, Services, Support, Presse, Impressum und weitere Ressourcenseiten.",
  },
  {
    file: "app/about-us/page.tsx",
    id: "ueber-uns",
    title: "Über uns",
    text: "Management, Historie, Auszeichnungen, Expert Panel und Unternehmensgeschichte.",
  },
  {
    file: "app/main-navigation.tsx",
    id: "navigation",
    title: "Hauptmenü",
    text: "Menüpunkte, Ressourcen-Ausklapper und die beiden Aktionslinks oben rechts.",
  },
  {
    file: "app/site-footer.tsx",
    id: "footer",
    title: "Footer",
    text: "Footer-CTA, Linkspalten, Kontaktinformationen und rechtliche Links.",
  },
] as const;

export default function EditorPage() {
  return (
    <main className="editor-page">
      <MainHeader variant="solid" />
      <section className="editor-shell">
        <div className="editor-hero">
          <div>
            <p className="eyebrow">Code-Wegweiser</p>
            <h1>Texte direkt im Projekt ändern.</h1>
            <p>
              Der frühere Editor ist deaktiviert. Dauerhafte Änderungen entstehen jetzt
              direkt in den Seiten-Dateien. So findest du Struktur und Inhalt wieder
              genau dort, wo die Seite gebaut wird.
            </p>
          </div>
          <div className="editor-status-card">
            <strong>{editAreas.length}</strong>
            <span>wichtige Dateien</span>
          </div>
        </div>

        <div className="editor-layout">
          <aside className="editor-sidebar" aria-label="Bearbeitungsbereiche">
            {editAreas.map((area) => (
              <a className="editor-block" href={`#${area.id}`} key={area.file}>
                <span>{area.title}</span>
                <small>{area.file}</small>
              </a>
            ))}
          </aside>

          <div className="editor-workspace">
            {editAreas.map((area) => (
              <article className="editor-panel" id={area.id} key={area.file}>
                <div className="editor-panel-heading">
                  <div>
                    <p className="eyebrow">{area.file}</p>
                    <h2>{area.title}</h2>
                    <p>{area.text}</p>
                  </div>
                </div>
              </article>
            ))}
            <div className="editor-actions-panel">
              <p>
                Nach einer Textänderung im Code reicht normalerweise Speichern und
                Browser neu laden. Für GitHub/Vercel anschließend die Änderung committen
                und pushen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
