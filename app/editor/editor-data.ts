import { getEditableContent } from "./content";
import { resourcePages, type ResourceSlug } from "../resource-pages";
import { layers } from "../site-content";

export type EditableBlock = {
  field: "html" | "text";
  helper: string;
  id: string;
  label: string;
  source: string;
  value: string;
};

export type EditableGroup = {
  blocks: EditableBlock[];
  id: string;
  title: string;
};

function block({
  field = "text",
  helper,
  id,
  label,
  source,
  value,
}: {
  field?: "html" | "text";
  helper: string;
  id: string;
  label: string;
  source: string;
  value: string;
}): EditableBlock {
  return {
    field,
    helper,
    id,
    label,
    source,
    value: getEditableContent(id, value),
  };
}

const resourceEntries = Object.entries(resourcePages) as Array<
  [ResourceSlug, (typeof resourcePages)[ResourceSlug]]
>;

const resourceHeadingBlocks = resourceEntries.flatMap(([slug, page]) => {
  const pageLabel = page.eyebrow;
  const blocks: EditableBlock[] = [
    block({
      helper: `Kleiner Label-Text oberhalb der Hero-Headline auf der Seite ${pageLabel}.`,
      id: `resource.${slug}.eyebrow`,
      label: `${pageLabel}: Hero Label`,
      source: `app/resource-pages.tsx · ${slug}`,
      value: page.eyebrow,
    }),
    block({
      helper: `Hero-Hauptüberschrift auf der Seite ${pageLabel}.`,
      id: `resource.${slug}.title`,
      label: `${pageLabel}: Hero Headline`,
      source: `app/resource-pages.tsx · ${slug}`,
      value: page.title,
    }),
    block({
      field: "html",
      helper: `Einleitungstext direkt unter der Hero-Headline auf der Seite ${pageLabel}.`,
      id: `resource.${slug}.intro`,
      label: `${pageLabel}: Hero Einleitung`,
      source: `app/resource-pages.tsx · ${slug}`,
      value: page.intro,
    }),
  ];

  if (page.cta) {
    blocks.push(
      block({
        helper: `Button-Text im Hero der Seite ${pageLabel}.`,
        id: `resource.${slug}.cta.label`,
        label: `${pageLabel}: Hero CTA`,
        source: `app/resource-pages.tsx · ${slug}`,
        value: page.cta.label,
      }),
    );
  }

  page.sections.forEach((section, sectionIndex) => {
    if (section.eyebrow) {
      blocks.push(
        block({
          helper: `Kleiner Label-Text oberhalb der Abschnittsüberschrift auf der Seite ${pageLabel}.`,
          id: `resource.${slug}.section.${sectionIndex}.eyebrow`,
          label: `${pageLabel}: Abschnitt ${sectionIndex + 1} Label`,
          source: `app/resource-pages.tsx · ${slug} · section ${sectionIndex + 1}`,
          value: section.eyebrow,
        }),
      );
    }

    blocks.push(
      block({
        helper: `Abschnittsüberschrift auf der Seite ${pageLabel}.`,
        id: `resource.${slug}.section.${sectionIndex}.title`,
        label: `${pageLabel}: Abschnitt ${sectionIndex + 1} Headline`,
        source: `app/resource-pages.tsx · ${slug} · section ${sectionIndex + 1}`,
        value: section.title,
      }),
    );

    section.cards?.forEach((card, cardIndex) => {
      if (card.eyebrow) {
        blocks.push(
          block({
            helper: `Kleiner Label-Text in einer Karte auf der Seite ${pageLabel}.`,
            id: `resource.${slug}.section.${sectionIndex}.card.${cardIndex}.eyebrow`,
            label: `${pageLabel}: Karte ${cardIndex + 1} Label`,
            source: `app/resource-pages.tsx · ${slug} · section ${sectionIndex + 1}`,
            value: card.eyebrow,
          }),
        );
      }

      blocks.push(
        block({
          helper: `Kartenüberschrift auf der Seite ${pageLabel}.`,
          id: `resource.${slug}.section.${sectionIndex}.card.${cardIndex}.title`,
          label: `${pageLabel}: Karte ${cardIndex + 1} Headline`,
          source: `app/resource-pages.tsx · ${slug} · section ${sectionIndex + 1}`,
          value: card.title,
        }),
      );
    });
  });

  if (page.form) {
    blocks.push(
      block({
        helper: `Formularüberschrift auf der Seite ${pageLabel}.`,
        id: `resource.${slug}.form.title`,
        label: `${pageLabel}: Formular Headline`,
        source: `app/resource-pages.tsx · ${slug} · form`,
        value: page.form.title,
      }),
      block({
        helper: `Button-Text im Formular auf der Seite ${pageLabel}.`,
        id: `resource.${slug}.form.buttonLabel`,
        label: `${pageLabel}: Formular Button`,
        source: `app/resource-pages.tsx · ${slug} · form`,
        value: page.form.buttonLabel,
      }),
    );
  }

  return blocks;
});

const layerHeadingBlocks = layers.flatMap((layer) => [
  block({
    helper: `Layer-Label auf der Produktseite ${layer.product}.`,
    id: `layer.${layer.slug}.layerName`,
    label: `${layer.product}: Layer Label`,
    source: `app/layer-page.tsx · ${layer.slug}`,
    value: layer.layerName,
  }),
  block({
    helper: `Hero-Hauptüberschrift auf der Produktseite ${layer.product}.`,
    id: `layer.${layer.slug}.product`,
    label: `${layer.product}: Hero Headline`,
    source: `app/layer-page.tsx · ${layer.slug}`,
    value: layer.product,
  }),
  block({
    helper: `Subline unter der Hero-Hauptüberschrift auf der Produktseite ${layer.product}.`,
    id: `layer.${layer.slug}.headline`,
    label: `${layer.product}: Hero Subline`,
    source: `app/layer-page.tsx · ${layer.slug}`,
    value: layer.headline,
  }),
  block({
    helper: `Label im ersten Inhaltsschnitt auf der Produktseite ${layer.product}.`,
    id: `layer.${layer.slug}.stage`,
    label: `${layer.product}: Stage Label`,
    source: `app/layer-page.tsx · ${layer.slug}`,
    value: layer.stage,
  }),
  block({
    helper: `H2 im ersten Inhaltsschnitt auf der Produktseite ${layer.product}.`,
    id: `layer.${layer.slug}.verb`,
    label: `${layer.product}: Stage Headline`,
    source: `app/layer-page.tsx · ${layer.slug}`,
    value: layer.verb,
  }),
  block({
    helper: `H2 im Wirkungsabschnitt auf der Produktseite ${layer.product}.`,
    id: `layer.${layer.slug}.impact.title`,
    label: `${layer.product}: Wirkung Headline`,
    source: `app/layer-page.tsx · ${layer.slug}`,
    value: "Was dieser Baustein für die Organisation leistet.",
  }),
  block({
    helper: `H2 im Bausteine-Abschnitt auf der Produktseite ${layer.product}.`,
    id: `layer.${layer.slug}.modules.title`,
    label: `${layer.product}: Bausteine Headline`,
    source: `app/layer-page.tsx · ${layer.slug}`,
    value: "Direkt anschlussfähig an den aiio Produkt-Stack.",
  }),
  block({
    helper: `H2 im Abschnitt zu weiteren Layern auf der Produktseite ${layer.product}.`,
    id: `layer.${layer.slug}.related.title`,
    label: `${layer.product}: Weitere Layer Headline`,
    source: `app/layer-page.tsx · ${layer.slug}`,
    value: "Der Stack bleibt verbunden.",
  }),
]);

const aboutHeadingBlocks: EditableBlock[] = [
  block({
    helper: "Headline im Auszeichnungsbereich der Über-uns-Seite.",
    id: "about.awards.title",
    label: "Über uns: Auszeichnungen Headline",
    source: "app/about-us/page.tsx · awards",
    value: "CHIP Leading Software im zweiten Jahr in Folge.",
  }),
  block({
    helper: "Hero-Hauptüberschrift auf der Über-uns-Seite.",
    id: "about.hero.title",
    label: "Über uns: Hero Headline",
    source: "app/about-us/page.tsx · hero",
    value: "AI Improves Organizations.",
  }),
  block({
    helper: "H2 im Haltungsabschnitt der Über-uns-Seite.",
    id: "about.intro.title",
    label: "Über uns: Haltung Headline",
    source: "app/about-us/page.tsx · Haltung",
    value: "Prozessmanagement wird zur gemeinsamen Organisationsarbeit.",
  }),
  block({
    helper: "H2 im Managementabschnitt der Über-uns-Seite.",
    id: "about.management.title",
    label: "Über uns: Management Headline",
    source: "app/about-us/page.tsx · Management",
    value: "Ein Führungsteam mit Leidenschaft für einfachere Organisationen.",
  }),
  block({
    helper: "H2 im Historienabschnitt der Über-uns-Seite.",
    id: "about.timeline.title",
    label: "Über uns: Historie Headline",
    source: "app/about-us/page.tsx · Timeline",
    value: "Von SharePoint-BPM zum Organizational Intelligence System.",
  }),
  ...[
    ["2007", "Vom klassischen BPM zur Prozessbasis"],
    ["2020", "Neustart als KI-native Plattform"],
    ["2022", "Process Intelligence für alle"],
    ["2024", "Series-A und nächste Wachstumsphase"],
    ["2025", "Prozesserkennung mit ProcessMagnet"],
    ["2026", "ProcessForge als Prozessschmiede"],
  ].map(([year, title]) =>
    block({
      helper: `H3 im Historienpunkt ${year}.`,
      id: `about.timeline.${year}.title`,
      label: `Über uns: Historie ${year}`,
      source: "app/about-us/page.tsx · Timeline",
      value: title,
    }),
  ),
  block({
    helper: "H2 im Ausblick-Abschnitt der Über-uns-Seite.",
    id: "about.outlook.title",
    label: "Über uns: Ausblick Headline",
    source: "app/about-us/page.tsx · Ausblick",
    value: "Organisationen werden zu lernenden Netzwerken.",
  }),
  block({
    helper: "H2 im Expert-Panel-Abschnitt der Über-uns-Seite.",
    id: "about.advisors.title",
    label: "Über uns: Expert Panel Headline",
    source: "app/about-us/page.tsx · Expert Panel",
    value: "Trusted Minds für Security, Markt und Investment.",
  }),
  block({
    helper: "H2 im Kundennutzen-Abschnitt der Über-uns-Seite.",
    id: "about.proof.title",
    label: "Über uns: Kundennutzen Headline",
    source: "app/about-us/page.tsx · Kundennutzen",
    value: "Warum Organisationen aiio nutzen.",
  }),
  ...[
    "Schneller nutzbar",
    "Beteiligung statt Spezialdisziplin",
    "KI als Kollege",
  ].map((title, index) =>
    block({
      helper: `H3 im Kundennutzen-Punkt ${index + 1}.`,
      id: `about.proof.${index}.title`,
      label: `Über uns: Kundennutzen ${index + 1}`,
      source: "app/about-us/page.tsx · Kundennutzen",
      value: title,
    }),
  ),
  block({
    helper: "H2 im Demo-Band der Über-uns-Seite.",
    id: "about.demo.title",
    label: "Über uns: Demo Headline",
    source: "app/about-us/page.tsx · Demo",
    value: "Lass uns zeigen, wie Wissen als Produkt-Stack aktiviert wird.",
  }),
];

const homeHeadingBlocks: EditableBlock[] = [
  block({
    helper: "Kleiner Label-Text oberhalb der Hero-Hauptüberschrift.",
    id: "home.hero.eyebrow",
    label: "Hero Label",
    source: "app/page.tsx · Hero",
    value: "OIS - Das Organizational Intelligence System",
  }),
  block({
    helper: "Kleiner Label-Text oberhalb der Architektur-Headline.",
    id: "home.architecture.eyebrow",
    label: "Architektur Label",
    source: "app/page.tsx · Architecture",
    value: "Systemlogik",
  }),
  block({
    helper: "Hauptüberschrift des Architektur-Sektors.",
    id: "home.architecture.title",
    label: "Architektur Headline",
    source: "app/page.tsx · Architecture",
    value: "Drei Lösungen. Ein Organizational Intelligence System.",
  }),
  block({
    helper: "Kleiner Label-Text der ProcessCollector-Karte.",
    id: "home.card.collector.eyebrow",
    label: "Karte ProcessCollector Label",
    source: "app/page.tsx · cards",
    value: "1. Wissen sichern",
  }),
  block({
    helper: "Headline der ProcessCollector-Karte.",
    id: "home.card.collector.title",
    label: "Karte ProcessCollector Headline",
    source: "app/page.tsx · cards",
    value: "ProcessCollector®",
  }),
  block({
    helper: "Kleiner Label-Text der ProcessMagnet-Karte.",
    id: "home.card.magnet.eyebrow",
    label: "Karte ProcessMagnet Label",
    source: "app/page.tsx · cards",
    value: "2. Prozesse erkennen",
  }),
  block({
    helper: "Headline der ProcessMagnet-Karte.",
    id: "home.card.magnet.title",
    label: "Karte ProcessMagnet Headline",
    source: "app/page.tsx · cards",
    value: "ProcessMagnet®",
  }),
  block({
    helper: "Kleiner Label-Text der ProcessForge-Karte.",
    id: "home.card.forge.eyebrow",
    label: "Karte ProcessForge Label",
    source: "app/page.tsx · cards",
    value: "3. Wissen aktivieren",
  }),
  block({
    helper: "Headline der ProcessForge-Karte.",
    id: "home.card.forge.title",
    label: "Karte ProcessForge Headline",
    source: "app/page.tsx · cards",
    value: "ProcessForge®",
  }),
  block({
    helper: "Kleiner Label-Text im ProcessCollector-Sektor.",
    id: "home.layer.collector.eyebrow",
    label: "Grounding Layer Label",
    source: "app/page.tsx · layerSections",
    value: "1. Grounding Layer",
  }),
  block({
    helper: "H2 im ProcessCollector-Sektor.",
    id: "home.layer.collector.title",
    label: "Grounding Layer Headline",
    source: "app/page.tsx · layerSections",
    value: "Der Grounding Layer für jede Organisation.",
  }),
  block({
    helper: "Kleiner Label-Text im ProcessMagnet-Sektor.",
    id: "home.layer.magnet.eyebrow",
    label: "Recognition Layer Label",
    source: "app/page.tsx · layerSections",
    value: "2. Recognition Layer",
  }),
  block({
    helper: "H2 im ProcessMagnet-Sektor.",
    id: "home.layer.magnet.title",
    label: "Recognition Layer Headline",
    source: "app/page.tsx · layerSections",
    value: "Vom Inhalt zum BPMN-konformen Modell.",
  }),
  block({
    helper: "Kleiner Label-Text im ProcessForge-Sektor.",
    id: "home.layer.forge.eyebrow",
    label: "Activation Layer Label",
    source: "app/page.tsx · layerSections",
    value: "3. Activation Layer",
  }),
  block({
    helper: "H2 im ProcessForge-Sektor.",
    id: "home.layer.forge.title",
    label: "Activation Layer Headline",
    source: "app/page.tsx · layerSections",
    value: "Geschmiedetes Wissen aktivieren.",
  }),
  block({
    helper: "Kleiner Label-Text im Demo-Band.",
    id: "home.demo.eyebrow",
    label: "Demo-Band Label",
    source: "app/page.tsx · Demo",
    value: "Demo",
  }),
  block({
    helper: "Headline im Demo-Band.",
    id: "home.demo.title",
    label: "Demo-Band Headline",
    source: "app/page.tsx · Demo",
    value: "Zeigen, was die Organisation schon weiß.",
  }),
];

export const editableGroups: EditableGroup[] = [
  {
    id: "home",
    title: "Startseite",
    blocks: [
      ...homeHeadingBlocks,
      {
        field: "text",
        helper: "Hero-Hauptüberschrift auf der Startseite.",
        id: "home.hero.title",
        label: "Hero Headline",
        source: "app/page.tsx · Hero",
        value: getEditableContent("home.hero.title", "Organizational Intelligence mit System"),
      },
      {
        field: "text",
        helper: "Kurzer Erklärungstext direkt unter der Hero Headline.",
        id: "home.hero.intro",
        label: "Hero Subline",
        source: "app/page.tsx · Hero",
        value: getEditableContent(
          "home.hero.intro",
          "Mit dem OIS verbindet aiio Wissen, Recognition und Activation von Organisationsinformationen intelligent in einem integrierten Organizational Intelligence System.",
        ),
      },
      {
        field: "html",
        helper: "Einleitung des Architektur-Sektors.",
        id: "home.architecture.intro",
        label: "Systemlogik Einleitung",
        source: "app/page.tsx · Architecture",
        value: getEditableContent(
          "home.architecture.intro",
          "aiio macht aus verstreutem Organisationswissen ein System, das versteht, strukturiert und aktiviert. Jede Lösung schafft für sich sofort Nutzen und wird bei wachsendem Anspruch zur tragenden Schicht der nächsten.",
        ),
      },
      {
        field: "html",
        helper: "Beschreibung des ersten Produkt-Stack-Bausteins.",
        id: "home.card.collector",
        label: "Karte ProcessCollector",
        source: "app/page.tsx · cards",
        value: getEditableContent(
          "home.card.collector",
          "Der <strong>Grounding Layer</strong> für Flow-Charts, Organigramme, Rollen, Versionierungen und dokumentierte Entscheidungen als belastbare Wissensbasis.",
        ),
      },
      {
        field: "html",
        helper: "Beschreibung des zweiten Produkt-Stack-Bausteins.",
        id: "home.card.magnet",
        label: "Karte ProcessMagnet",
        source: "app/page.tsx · cards",
        value: getEditableContent(
          "home.card.magnet",
          "Der <strong>Recognition Layer</strong> für Multimodal Retrieval: Dokumente, E-Mails, Transkripte und Legacy-Systeme werden zu wertorientierten, BPMN-konformen Prozess- und Organisationsmodellen.",
        ),
      },
      {
        field: "html",
        helper: "Beschreibung des dritten Produkt-Stack-Bausteins.",
        id: "home.card.forge",
        label: "Karte ProcessForge",
        source: "app/page.tsx · cards",
        value: getEditableContent(
          "home.card.forge",
          "Der <strong>Activation Layer</strong> für die Verwertung geschmiedeten Wissens: Agenten, APIs, MCP, Chats und Ausgabeformate verteilen Inhalte einmalig oder dauerhaft an Umsysteme.",
        ),
      },
      {
        field: "html",
        helper: "Text im ProcessCollector-Sektor.",
        id: "home.layer.collector",
        label: "Grounding Layer Text",
        source: "app/page.tsx · layerSections",
        value: getEditableContent(
          "home.layer.collector",
          "Alle KI-Systeme sind nur so gut wie das Wissen, auf dem sie arbeiten. <strong>ProcessCollector®</strong> sammelt Interviews, Dokumente und bestehendes Organisationswissen und erzeugt daraus eine strukturierte Wissensbasis.",
        ),
      },
      {
        field: "html",
        helper: "Text im ProcessMagnet-Sektor.",
        id: "home.layer.magnet",
        label: "Recognition Layer Text",
        source: "app/page.tsx · layerSections",
        value: getEditableContent(
          "home.layer.magnet",
          "<strong>ProcessMagnet®</strong> überführt unstrukturierte Inhalte wie Dokumente, E-Mails, Transkripte, Legacy-Systeme, Bilder oder Videos in strukturierte, wertorientierte und BPMN-konforme Prozess- und Organisationsmodelle.",
        ),
      },
      {
        field: "html",
        helper: "Text im ProcessForge-Sektor.",
        id: "home.layer.forge",
        label: "Activation Layer Text",
        source: "app/page.tsx · layerSections",
        value: getEditableContent(
          "home.layer.forge",
          "<strong>ProcessForge®</strong>ist der KI-driven Outlet für geschmiedetes Organisationswissen: verborgenes Wissen aus ProcessMagnet wird in unterschiedlichste, auch multimodale Ausgabeformate transformiert, durch Agenten im Kontext vom manifestierten Wissen im ProcessCollector verwertet und einmalig oder dauerhaft an Umsysteme verteilt.",
        ),
      },
      {
        field: "html",
        helper: "Text im dunklen Demo-Band oberhalb des Footers.",
        id: "home.demo.copy",
        label: "Demo-Band Text",
        source: "app/page.tsx · Demo",
        value: getEditableContent(
          "home.demo.copy",
          "Die beste aiio-Demo beginnt nicht mit einem Tool, sondern mit echtem Organisationswissen: sammeln, strukturieren, modellieren und als aktivierbaren Produkt-Stack in die passenden Umsysteme bringen.",
        ),
      },
    ],
  },
  {
    id: "resources",
    title: "Ressourcen-Seiten Überschriften",
    blocks: resourceHeadingBlocks,
  },
  {
    id: "layers",
    title: "Produktseiten Überschriften",
    blocks: layerHeadingBlocks,
  },
  {
    id: "about",
    title: "Über uns Überschriften",
    blocks: aboutHeadingBlocks,
  },
  {
    id: "navigation",
    title: "Navigation & Footer",
    blocks: [
      {
        field: "text",
        helper: "Hauptmenüpunkt zur Systemlogik.",
        id: "navigation.system",
        label: "Menüpunkt System",
        source: "app/main-navigation.tsx",
        value: getEditableContent("navigation.system", "System"),
      },
      {
        field: "text",
        helper: "Hauptmenüpunkt zum Ressourcen-Menü.",
        id: "navigation.resources",
        label: "Menüpunkt Ressource",
        source: "app/main-navigation.tsx",
        value: getEditableContent("navigation.resources", "Ressource"),
      },
      {
        field: "text",
        helper: "Hauptmenüpunkt zur Unternehmensseite.",
        id: "navigation.about",
        label: "Menüpunkt Über uns",
        source: "app/main-navigation.tsx",
        value: getEditableContent("navigation.about", "Über uns"),
      },
      {
        field: "text",
        helper: "Primärer Header-CTA.",
        id: "navigation.demo",
        label: "CTA Expertengespräch",
        source: "app/main-navigation.tsx",
        value: getEditableContent(
          "navigation.demo",
          "Jetzt Expertengespräch vereinbaren",
        ),
      },
      {
        field: "text",
        helper: "Zweiter Header-CTA.",
        id: "navigation.trial",
        label: "CTA Testversion",
        source: "app/main-navigation.tsx",
        value: getEditableContent("navigation.trial", "14 Tage kostenlos testen"),
      },
      block({
        helper: "Große Überschrift im Footer.",
        id: "footer.cta.title",
        label: "Footer Headline",
        source: "app/site-footer.tsx",
        value: "AI Improves Organizations.",
      }),
      block({
        helper: "Kurzer Claim unter der Footer-Headline.",
        id: "footer.cta.copy",
        label: "Footer Claim",
        source: "app/site-footer.tsx",
        value: "Mit System das Chaos in Ordnung & Intelligenz verwandeln.",
      }),
    ],
  },
];
