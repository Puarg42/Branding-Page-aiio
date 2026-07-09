import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputPath = path.join(root, "docs", "review", "website-review.md");

function readProjectFile(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function evaluateGeneratedConstArray(relativePath, constName) {
  const source = readProjectFile(relativePath);
  let match = source.match(
    new RegExp(`export const ${constName} = ([\\s\\S]*?) as const;`),
  );

  if (!match) {
    match = source.match(
      new RegExp(`export const ${constName}(?::[^=]+)? = (\\[[\\s\\S]*?\\]);`),
    );
  }

  if (!match) {
    throw new Error(`Could not find ${constName} in ${relativePath}`);
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function evaluateGeneratedConstObject(relativePath, constName) {
  const source = readProjectFile(relativePath);
  const match = source.match(
    new RegExp(`export const ${constName} = (\\{[\\s\\S]*?\\}) as const;`),
  );

  if (!match) {
    throw new Error(`Could not find ${constName} in ${relativePath}`);
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function extractBrandCanonAssets() {
  const source = readProjectFile("components/brand/BrandIllustration.tsx");
  const assetPattern =
    /["']?([A-Z0-9-]+)["']?:\s*\{\s*alt:\s*"([^"]+)",\s*src:\s*"([^"]+)"/g;
  const assets = [];

  for (const match of source.matchAll(assetPattern)) {
    assets.push({
      id: match[1],
      alt: match[2],
      src: match[3],
    });
  }

  return assets;
}

function firstReadableBlock(chapter) {
  const block = chapter.blocks.find((item) => item.text);
  return block?.text ?? "";
}

function markdownList(items) {
  if (!items?.length) return "";
  return items.map((item) => `- ${item}`).join("\n");
}

function renderCards(cards = []) {
  if (!cards.length) return "";

  return cards
    .map((card) => {
      const lines = [`- ${card.title}`];

      if (card.copy) lines.push(`  Copy: ${card.copy}`);
      if (card.cta) lines.push(`  CTA: ${card.cta}`);
      if (card.asset) lines.push(`  Asset: ${card.asset}`);
      if (card.theory) lines.push(`  Theory reference: ${card.theory}`);

      return lines.join("\n");
    })
    .join("\n");
}

function renderSections(sections = []) {
  return sections
    .map((section, index) => {
      const lines = [`### ${index + 1}. ${section.title}`];

      if (section.routeAnchor) lines.push(`Anchor: ${section.routeAnchor}`);
      if (section.eyebrow) lines.push(`Eyebrow: ${section.eyebrow}`);
      if (section.h2) lines.push(`H2: ${section.h2}`);
      if (section.lead) lines.push(`Lead: ${section.lead}`);
      if (section.copy?.length) lines.push(`Copy:\n${markdownList(section.copy)}`);
      if (section.cards?.length) lines.push(`Cards:\n${renderCards(section.cards)}`);
      if (section.ctas?.length) lines.push(`CTAs:\n${markdownList(section.ctas)}`);
      if (section.assets?.length) lines.push(`Image / Brand Canon references:\n${markdownList(section.assets)}`);
      if (section.theoryRefs?.length) lines.push(`Theory references:\n${markdownList(section.theoryRefs)}`);
      if (section.notes?.length) lines.push(`Notes:\n${markdownList(section.notes)}`);

      return lines.join("\n\n");
    })
    .join("\n\n");
}

function renderPage(page, index) {
  const lines = [
    `## ${index + 1}. ${page.name}`,
    `Route: ${page.route}`,
    `Page title: ${page.pageTitle}`,
    `Meta title: ${page.metaTitle}`,
    `Meta description: ${page.metaDescription}`,
    "",
    "### Hero",
  ];

  if (page.hero.eyebrow) lines.push(`Eyebrow: ${page.hero.eyebrow}`);
  lines.push(`H1: ${page.hero.h1}`);
  if (page.hero.intro?.length) lines.push(`Intro copy:\n${markdownList(page.hero.intro)}`);
  if (page.hero.ctas?.length) lines.push(`CTAs:\n${markdownList(page.hero.ctas)}`);
  if (page.hero.assets?.length) lines.push(`Image / Brand Canon references:\n${markdownList(page.hero.assets)}`);
  if (page.hero.theoryRefs?.length) lines.push(`Theory references:\n${markdownList(page.hero.theoryRefs)}`);
  if (page.hero.notes?.length) lines.push(`Notes:\n${markdownList(page.hero.notes)}`);

  lines.push("", "### Section Order", markdownList(page.sectionOrder), "", renderSections(page.sections));

  return lines.join("\n");
}

const theoryPublication = evaluateGeneratedConstObject(
  "app/thinking/publication-model.ts",
  "theoryPublication",
);
const theoryChapters = evaluateGeneratedConstArray(
  "app/thinking/theory/theory-content.generated.ts",
  "theoryChapters",
);
const blogPosts = evaluateGeneratedConstArray("app/blog/blog-posts.ts", "blogPosts");
const brandAssets = extractBrandCanonAssets();

const canonicalTheoryLinks = [
  "/thinking/theory#2-the-missing-layer",
  "/thinking/theory#organizational-self-understanding",
  "/thinking/theory#organizational-understanding",
  "/thinking/theory#organizational-intelligence",
  "/thinking/theory#organizational-capabilities",
  "/thinking/theory#organizational-self-empowering",
  "/thinking/theory#organizational-resilience",
  "/thinking/theory#reference-architecture-for-organizational-intelligence",
  "/thinking/theory#14-why-now",
];

const pages = [
  {
    name: "Home",
    route: "/",
    pageTitle: "Home",
    metaTitle: "aiio | Organizational Intelligence with System",
    metaDescription: "Build organizations that continuously understand themselves.",
    hero: {
      h1: "The future belongs to organizations that understand themselves.",
      intro: [
        "Organizations have entered an era where complexity grows faster than human understanding.",
        "aiio enables an organization to continuously understand itself, continuously develop new organizational capabilities and empower every person to make better decisions.",
      ],
      ctas: ["Explore the system -> #organizational-intelligence", "Request a demo -> /live-demo/kontakt"],
      assets: ["BC-001 /brand-canon/001-organizational-mind.png"],
    },
    sectionOrder: [
      "Hero",
      "Imagine Monday Morning",
      "Why Now",
      "The Missing Capability",
      "The System",
      "The Journey",
      "Business Impact",
      "Enterprise Trust",
      "Start",
    ],
    sections: [
      {
        title: "Imagine Monday Morning",
        routeAnchor: "#monday-morning",
        eyebrow: "Imagine Monday Morning",
        cards: [
          { title: "A key expert leaves.", copy: "The context remains available. Decisions do not start from zero." },
          { title: "A production issue occurs.", copy: "Your organization can trace what changed, what depends on it and who needs to act." },
          { title: "A new regulation appears.", copy: "Obligations connect to processes, owners and capabilities before work fragments." },
        ],
        notes: ["Scrollytelling section: one scenario card active at a time."],
      },
      {
        title: "Why Now",
        routeAnchor: "#category-evolution",
        eyebrow: "Why Now",
        h2: "A new era of complexity requires a new organizational capability.",
        cards: [
          { title: "Industrial Age", copy: "Machines" },
          { title: "Process Age", copy: "Business Process Management" },
          { title: "Digital Age", copy: "Digital Systems" },
          { title: "AI Age", copy: "Artificial Intelligence" },
          { title: "Next Age", copy: "Organizational Intelligence", theory: "/thinking/theory#organizational-intelligence" },
          { title: "Outcome", copy: "Organizational Resilience", theory: "/thinking/theory#organizational-resilience" },
        ],
      },
      {
        title: "The Missing Capability",
        routeAnchor: "#organizational-intelligence",
        eyebrow: "The Missing Capability",
        h2: "The missing capability is continuous self-understanding.",
        copy: [
          "Organizations collect information, document processes and introduce AI.",
          "Yet they still struggle to turn all of this into coordinated action.",
          "Not because information is missing, but because continuous Organizational Self-Understanding is.",
          "This is why the category needs to exist: organizations need a foundation that makes context continuously understandable before decisions and action depend on scattered memory.",
        ],
        assets: ["BC-005 /brand-canon/005-missing-capability.png"],
        theoryRefs: ["/thinking/theory#organizational-self-understanding"],
      },
      {
        title: "The System",
        routeAnchor: "#architektur",
        eyebrow: "The System",
        h2: "The Organizational Intelligence System gives this capability a place to operate.",
        copy: [
          "It connects organizational reality, context, decisions and action into one foundation for continuous capability development.",
          "The system is not the destination. The outcome is a more capable and resilient organization.",
        ],
        assets: ["BC-002 /brand-canon/002-organizational-intelligence-engine.png"],
      },
      {
        title: "The Journey",
        routeAnchor: "#capabilities",
        eyebrow: "The Journey",
        h2: "From understanding itself to becoming resilient.",
        lead: "This is the customer transformation. aiio helps the organization move from shared understanding to stronger capabilities and better adaptation.",
        cards: [
          { title: "Understand itself", copy: "Your organization gains a shared view of how work, context and decisions connect." },
          { title: "Develop intelligence", copy: "That shared context becomes continuously interpretable and usable for better decisions." },
          { title: "Create capabilities", copy: "Interpretation becomes repeatable behavior that people and AI can apply in daily work." },
          { title: "Become resilient", copy: "The organization adapts faster because its capabilities improve with feedback and change." },
        ],
      },
      {
        title: "Business Impact",
        routeAnchor: "#self-empowering-organization",
        eyebrow: "Business Impact",
        h2: "A more resilient organization creates better work.",
        copy: [
          "Your organization makes better decisions, executes with less rework and adapts with more confidence.",
          "Less rework. Faster decisions. Stronger organizational capability.",
          "Faster decisions. Less rework. Stronger execution. More resilience.",
        ],
      },
      {
        title: "Enterprise Trust",
        routeAnchor: "#trust",
        eyebrow: "Enterprise Trust",
        h2: "Trusted by organizations operating in complex, regulated and knowledge-intensive environments.",
        lead: "Organizations across industry, mobility, healthcare, consulting and the public sector use aiio to build Organizational Intelligence.",
        cards: [
          { title: "Enterprise Complexity", copy: "For organizations where decisions depend on context, ownership and operational reality." },
          { title: "Organizational Intelligence", copy: "A category foundation for making organizational context continuously usable." },
          { title: "People, Teams, AI", copy: "One shared organizational context for humans, teams and intelligent systems." },
        ],
        notes: ["Trust logo marquee appears as global Trust Layer on Home, Platform and Business Impact."],
      },
      {
        title: "Start",
        routeAnchor: "#executive-cta",
        eyebrow: "Start",
        h2: "Start with the right conversation.",
        lead: "Explore where Organizational Intelligence can create value in your organization and what the first credible next step should be.",
        ctas: ["Request a demo -> /live-demo/kontakt", "Explore the system -> /platform"],
      },
    ],
  },
  {
    name: "Platform",
    route: "/platform",
    pageTitle: "Platform",
    metaTitle: "Platform | aiio",
    metaDescription:
      "One Organizational Intelligence System with four complementary capabilities for organizations that continuously understand, develop and evolve.",
    hero: {
      h1: "The Organizational Intelligence System",
      intro: [
        "For organizations that continuously understand themselves, develop new capabilities and become resilient.",
        "Organizational reality continuously becomes self-understanding, self-understanding becomes Organizational Intelligence, intelligence becomes capabilities and capabilities become resilience.",
      ],
      assets: ["BC-003 /brand-canon/003-organizational-intelligence-core.png", "Trust logo marquee"],
      theoryRefs: [
        "/thinking/theory#organizational-intelligence",
        "/thinking/theory#organizational-resilience",
      ],
    },
    sectionOrder: ["Hero", "Missing Capability", "Journey", "The System", "Outcome", "Start"],
    sections: [
      {
        title: "The Missing Capability",
        routeAnchor: "#platform-missing-capability",
        eyebrow: "The Missing Capability",
        h2: "Organizations already collect more than they can continuously understand.",
        copy: [
          "They collect information, documents, processes and AI. Yet they still struggle to continuously understand themselves.",
          "The missing capability is not more information. It is continuous Organizational Self-Understanding.",
        ],
        theoryRefs: ["/thinking/theory#organizational-self-understanding"],
      },
      {
        title: "The Journey",
        routeAnchor: "#platform-journey",
        eyebrow: "The Journey",
        h2: "How aiio creates organizational capabilities.",
        cards: [
          {
            title: "Understand Your Organization",
            copy: "ProcessCollector models structures, responsibilities, rules and process logic into a human-readable representation people and AI can work from.",
            cta: "Learn more -> #processcollector",
            asset: "BC201",
          },
          {
            title: "Develop Organizational Intelligence",
            copy: "ProcessMagnet makes organizational reality continuously interpretable by connecting signals from people, systems, documents and operations into one coherent context.",
            cta: "Learn more -> #processmagnet",
            asset: "BC202",
          },
          {
            title: "Forge Organizational Capabilities",
            copy: "ProcessForge turns interpreted context into reusable behavior: decisions, workflows, assistants and execution patterns people and AI can apply.",
            cta: "Learn more -> #processforge",
            asset: "BC203",
          },
          {
            title: "Enable Organizational Self-Empowerment",
            copy: "DataForge feeds goals, scenarios, KPIs and operational feedback back into the system so those behaviors improve continuously.",
            cta: "Learn more -> #dataforge",
            asset: "BC204",
          },
        ],
      },
      {
        title: "The System",
        routeAnchor: "#capability-layer",
        eyebrow: "The System",
        h2: "One system turns organizational reality into continuously evolving capability.",
        copy: [
          "The four capabilities do not work as isolated tools. They form one Organizational Intelligence System that connects reality, understanding, capability development and continuous evolution.",
          "ProcessCollector makes the organization readable. ProcessMagnet builds organizational intelligence. ProcessForge turns that intelligence into capabilities. DataForge evolves those capabilities against operational reality.",
        ],
        assets: ["BC-002 /brand-canon/002-organizational-intelligence-engine.png"],
      },
      {
        title: "The Impact",
        routeAnchor: "#platform-outcome",
        eyebrow: "The Impact",
        h2: "Every capability creates a measurable organizational outcome. The ultimate outcome is Organizational Resilience.",
        copy: [
          "The outcome is not another software platform.",
          "Each platform capability creates immediate business value. Each outcome enables the next one. Only together do they create an organization that becomes more resilient under change.",
          "The goal is not better documentation. The goal is not another AI platform. The goal is an organization that becomes understandable, develops intelligence, creates capabilities and improves under change.",
          "Every capability creates value. Together, they create Organizational Resilience.",
        ],
        theoryRefs: [
          "/thinking/theory#organizational-intelligence",
          "/thinking/theory#organizational-capabilities",
          "/thinking/theory#organizational-self-empowering",
          "/thinking/theory#organizational-resilience",
        ],
      },
      {
        title: "Start",
        routeAnchor: "#start",
        h2: "See Organizational Intelligence in action.",
        lead: "Experience how the Organizational Intelligence System connects your organizational reality into one continuously evolving foundation.",
        ctas: ["Request a Demo -> /live-demo/kontakt", "Explore the Theory -> /thinking/theory"],
      },
    ],
  },
  {
    name: "Business Impact",
    route: "/success-stories",
    pageTitle: "Business Impact",
    metaTitle: "Business Impact | aiio",
    metaDescription:
      "Business Impact as category proof for how Organizational Intelligence addresses different executive business challenges.",
    hero: {
      h1: "Different business challenges. One missing capability.",
      intro: [
        "Business Impact is the category proof of Organizational Intelligence.",
        "Different organizations face different business realities. Yet each transformation depends on the same missing organizational capability: continuous Organizational Intelligence.",
      ],
      ctas: ["Explore the Platform -> /platform", "Understand the Theory -> /thinking/theory"],
      assets: ["BC-007 /brand-canon/bc007-business-impact.png", "Trust logo marquee"],
    },
    sectionOrder: ["Hero", "Challenges", "Proof", "Insight", "Outcome", "Start"],
    sections: [
      {
        title: "Business Challenge Landscape",
        routeAnchor: "#business-impact-landscape",
        eyebrow: "Business Challenge Landscape",
        h2: "Organizational Intelligence starts where executive priorities get stuck.",
        cards: [
          "Digital Transformation",
          "Operational Excellence",
          "Compliance & Governance",
          "AI Enablement",
          "Knowledge Retention",
          "Organizational Change",
          "Mergers & Integration",
          "Process Excellence",
        ].map((title) => ({ title })),
      },
      {
        title: "Category Proof",
        routeAnchor: "#business-impact-scenarios",
        eyebrow: "Category Proof",
        h2: "Customer work becomes proof of the business challenge.",
        cards: [
          { title: "Knowledge Retention", copy: "Reference organization: Euromobil" },
          { title: "Digital Transformation", copy: "Reference organization: Windpunx" },
          { title: "Compliance & Governance", copy: "Reference organization: HVLE" },
          { title: "Process Excellence", copy: "Reference organization: ABB Busch-Jaeger" },
        ],
      },
      {
        title: "Cross-Scenario Insight",
        routeAnchor: "#business-impact-insight",
        eyebrow: "Cross-Scenario Insight",
        h2: "Different Challenges. One Missing Capability.",
        lead: "Although every organization faced a different business problem, every successful transformation required the same organizational capability: continuous Organizational Intelligence.",
        cards: [
          { title: "Organizational Understanding" },
          { title: "Organizational Intelligence" },
          { title: "Organizational Capabilities" },
          { title: "Organizational Self-Empowerment" },
        ],
      },
      {
        title: "Outcome",
        routeAnchor: "#business-impact-closing",
        copy: [
          "Every organization faces different business realities.",
          "The capability that enables successful transformation is always the same.",
          "Organizational Intelligence.",
          "Business Impact is not a gallery of references. It is evidence that Organizational Intelligence answers a recurring executive problem: organizations need continuous understanding before they can improve, adapt and transform with confidence.",
        ],
      },
      {
        title: "Start",
        routeAnchor: "#start",
        h2: "Create measurable Organizational Intelligence.",
        lead: "Discover how organizations transform knowledge into measurable business capability.",
        ctas: ["Request a Demo -> /live-demo/kontakt", "Explore the Platform -> /platform"],
      },
    ],
  },
  {
    name: "Thinking",
    route: "/thinking",
    pageTitle: "Thinking",
    metaTitle: "Thinking | aiio",
    metaDescription:
      "The living Theory Journal for Organizational Intelligence and the evolution of organizational self-understanding.",
    hero: {
      h1: "The Theory behind aiio's Organizational Intelligence System",
      intro: [
        "Thinking is the public journal of the Theory of Organizational Intelligence. It records what changed, why it matters and which chapters were affected.",
      ],
      ctas: ["Read the current Theory -> /thinking/theory"],
    },
    sectionOrder: ["Hero", "Journal", "Publication", "Start"],
    sections: [
      {
        title: "Theory Journal",
        routeAnchor: "#journal",
        eyebrow: "Theory Journal",
        h2: "What has changed recently at Theory?",
        notes: ["Journal entries are generated from app/thinking/publication-model.ts and listed in the Theory section below."],
      },
      {
        title: "Publication",
        routeAnchor: "#publication",
        copy: [
          `${theoryPublication.title}, ${theoryPublication.version}, ${theoryPublication.edition}`,
          `Last updated ${theoryPublication.lastUpdated}`,
          theoryPublication.readingTime,
          "Thinking documents the evolution. The Theory page contains the current consolidated state of the publication.",
        ],
        ctas: ["Read the current Theory -> /thinking/theory"],
      },
      {
        title: "Start",
        routeAnchor: "#start",
        h2: "Turn theory into organizational reality.",
        lead: "See how Organizational Intelligence becomes operational inside real organizations.",
        ctas: ["Request a Demo -> /live-demo/kontakt", "Explore the Platform -> /platform"],
      },
    ],
  },
  {
    name: "Theory",
    route: "/thinking/theory",
    pageTitle: "Theory",
    metaTitle: "Theory | aiio",
    metaDescription: "Read the digital theory of Organizational Intelligence.",
    hero: {
      eyebrow: "Theory",
      h1: "Organizational Intelligence",
      intro: ["The Theory of Organizational Intelligence"],
      assets: ["/brand-canon/001-organizational-mind-theory-neu.png"],
      notes: ["Theory uses its own persistent left chapter table of contents instead of the right-side editorial navigator."],
    },
    sectionOrder: theoryChapters.map((chapter, index) => `T${String(index).padStart(2, "0")} ${chapter.title}`),
    sections: theoryChapters.map((chapter, index) => ({
      title: `T${String(index).padStart(2, "0")} ${chapter.title}`,
      routeAnchor: `#${chapter.id}`,
      copy: [firstReadableBlock(chapter)],
      notes: [`Canonical anchor: /thinking/theory#${chapter.id}`],
    })),
  },
  {
    name: "Academy",
    route: "/academy",
    pageTitle: "Academy",
    metaTitle: "Academy | aiio",
    metaDescription:
      "The aiio Academy teaches leaders and organizations how to learn, apply and master Organizational Intelligence.",
    hero: {
      h1: "Learn Organizational Intelligence.",
      intro: [
        "Organizational Intelligence is not a feature to activate.",
        "It is an organizational capability that leaders, teams and AI systems continuously develop together.",
        "The Academy combines tutorials, executive sessions, practical examples and applied learning into one continuous learning experience.",
      ],
      ctas: ["Start Learning -> #academy-learning-path", "Request a Demo -> /live-demo/kontakt"],
      assets: ["BC-006 /brand-canon/006-organizational-intelligence-system.png"],
    },
    sectionOrder: ["Hero", "Learning Path", "Continue Learning", "Start"],
    sections: [
      {
        title: "Learning Path",
        routeAnchor: "#academy-learning-path",
        eyebrow: "Learning Path",
        h2: "From Understanding to Organizational Capability.",
        lead: "Every learning module builds on the previous one. Together they explain how organizations continuously develop Organizational Intelligence.",
        cards: [
          { title: "Understand Organizational Reality", copy: "Learn how organizations become understandable by documenting structures, responsibilities, processes and knowledge.", cta: "View Module" },
          { title: "Build Organizational Self-Understanding", copy: "Learn how connected organizational reality becomes continuous Organizational Self-Understanding.", cta: "View Module" },
          { title: "Transform Understanding into Organizational Capabilities", copy: "Learn how Organizational Intelligence becomes reusable organizational capabilities that people and AI can apply.", cta: "View Module" },
          { title: "Create Self-Empowering Organizations", copy: "Learn how continuously evolving organizational capabilities enable organizations to become increasingly self-empowering and resilient.", cta: "View Module" },
        ],
      },
      {
        title: "Continue Learning",
        routeAnchor: "#academy-formats",
        eyebrow: "Continue Learning",
        h2: "Choose the learning format that fits your role.",
        cards: [
          { title: "Tutorials", copy: "Structured learning modules for teams building a shared foundation." },
          { title: "Executive Sessions", copy: "Focused formats for leaders who need to understand the discipline and its implications." },
          { title: "Practical Examples", copy: "Applied scenarios that connect Organizational Intelligence to real organizational situations." },
          { title: "Articles", copy: "Editorial thinking that explains concepts, terminology and management implications." },
          { title: "Live Learning", copy: "Sessions, workshops and office hours for questions that emerge during implementation." },
        ],
      },
      {
        title: "Start",
        routeAnchor: "#start",
        h2: "Start building Organizational Intelligence.",
        lead: "Every organization learns differently. The capability they develop is always the same. Organizational Intelligence.",
        ctas: ["Request a Demo -> /live-demo/kontakt", "Explore the Platform -> /platform"],
      },
    ],
  },
  {
    name: "Partners",
    route: "/partners",
    pageTitle: "Partners",
    metaTitle: "Partners | aiio",
    metaDescription: "The partner architecture for organizations building Organizational Intelligence.",
    hero: {
      h1: "Help organizations build lasting capability.",
      intro: ["Partners help turn Organizational Intelligence into lasting customer capability."],
      ctas: ["Become a Partner -> /live-demo/kontakt", "Contact Us -> /contact"],
      assets: ["BC-008 /brand-canon/008-partner-ecosystem.png"],
      theoryRefs: ["/thinking/theory#organizational-intelligence"],
    },
    sectionOrder: ["Hero", "Ecosystem", "Start"],
    sections: [
      {
        title: "Partner Ecosystem",
        routeAnchor: "#partners-ecosystem",
        eyebrow: "Partner Ecosystem",
        h2: "Partners become capability builders.",
        cards: [
          { title: "Develop understanding", copy: "Help organizations turn fragmented knowledge into shared Organizational Understanding." },
          { title: "Build capabilities", copy: "Enable customers to move from temporary projects toward continuously improving organizational capabilities." },
          { title: "Support evolution", copy: "Guide organizations as decision quality, Organizational Self-Empowerment and resilience become operating principles." },
        ],
        theoryRefs: ["/thinking/theory#organizational-self-empowering"],
      },
      {
        title: "Start",
        routeAnchor: "#start",
        h2: "Build Organizational Intelligence together.",
        lead: "Become part of the Organizational Intelligence ecosystem.",
        ctas: ["Become a Partner -> /live-demo/kontakt", "Contact Us -> /contact"],
      },
    ],
  },
  {
    name: "Company",
    route: "/company",
    pageTitle: "Company",
    metaTitle: "Company | aiio",
    metaDescription:
      "The people, principles and institutional foundation behind aiio and Organizational Intelligence.",
    hero: {
      h1: "Building the future of Organizational Intelligence.",
      intro: [
        "aiio exists to help organizations continuously understand themselves, transform knowledge into capability and remain resilient in an increasingly complex world.",
      ],
      assets: ["COMPANY-OI /brand-canon/007-company-organizational-intelligence.png"],
    },
    sectionOrder: ["Hero", "Purpose", "Story", "Belief", "Leadership", "Expertise", "Recognition", "Start"],
    sections: [
      {
        title: "Our Purpose",
        routeAnchor: "#company-purpose",
        eyebrow: "Our Purpose",
        h2: "Why aiio exists.",
        lead: "Organizations have entered an era where complexity grows faster than human understanding.",
        copy: [
          "Organizational Intelligence is our answer.",
          "This is not about software.",
          "This is about enabling organizations to continuously understand themselves, develop new capabilities and act with more confidence under change.",
        ],
      },
      {
        title: "Our Story",
        routeAnchor: "#company-story",
        eyebrow: "Our Story",
        h2: "From Process Management to Organizational Intelligence.",
        cards: [
          { title: "2006 Lintra", copy: "Foundation of structured organizational knowledge and the first discipline for making organizational reality explicit." },
          { title: "2015 Quam", copy: "Semantic process intelligence connected processes, structures and governance into a more coherent organizational model." },
          { title: "2023 aiio", copy: "Transformation from process software into an Organizational Intelligence System built for continuous self-understanding." },
          { title: "2024 Series A", copy: "Institutional growth accelerated the category and strengthened the long-term platform foundation." },
          { title: "Today OIS", copy: "Establishing Organizational Intelligence as a new management discipline for organizations that need to evolve continuously." },
        ],
      },
      {
        title: "Our Belief",
        routeAnchor: "#company-belief",
        eyebrow: "Our Belief",
        h2: "The principles that guide us.",
        copy: [
          "Organizations should continuously understand themselves.",
          "Knowledge alone does not create intelligence.",
          "Capabilities emerge from connected understanding.",
          "AI requires organizational context.",
          "Continuous understanding creates resilience.",
          "Technology should make organizations more capable, not more dependent.",
        ],
      },
      {
        title: "Leadership",
        routeAnchor: "#company-team",
        eyebrow: "Leadership",
        h2: "The executive management behind aiio.",
        cards: [
          { title: "Dr. Christian Graup", copy: "Chief Executive Officer. Category, theory and product direction." },
          { title: "Knut Koechli", copy: "Chief Operating Officer. Operations, delivery and execution." },
          { title: "Jobst von Heintze", copy: "Chief Marketing Officer. Market narrative and category communication." },
          { title: "Lars Bendler", copy: "Chief Partner Officer. Partner ecosystem and capability delivery." },
        ],
      },
      {
        title: "Recognition",
        routeAnchor: "#company-recognition",
        eyebrow: "Recognition",
        h2: "Trusted by organizations shaping the future.",
        cards: [
          { title: "CHIP Leading Software 2024" },
          { title: "CHIP Leading Software 2025" },
          { title: "KI Bundesverband", copy: "Mitglied seit 2024" },
          { title: "International reach", copy: "aiio works with organizations and partners across enterprise, consulting, industry, public sector and transformation contexts." },
        ],
      },
      {
        title: "Start",
        routeAnchor: "#start",
        eyebrow: "Join the Journey",
        h2: "Help shape the future of Organizational Intelligence.",
        ctas: ["Request a Demo -> /live-demo/kontakt", "Become a Partner -> /partners", "Careers -> /contact", "Contact -> /contact"],
      },
    ],
  },
  {
    name: "Get Started",
    route: "/live-demo/kontakt",
    pageTitle: "Get Started",
    metaTitle: "Inherited global metadata",
    metaDescription: "Inherited global metadata",
    hero: {
      h1: "Start with the right conversation.",
      intro: [
        "We do not sell software first. We help organizations understand themselves, identify where Organizational Intelligence creates value and decide what should happen next.",
        "Contact card: Lars Bendler, Managing Director & Chief Partner Officer.",
      ],
      ctas: ["Request a Conversation -> #request-demo-form"],
      assets: ["/people/lars-bendler.jpg"],
    },
    sectionOrder: ["Hero", "Outcomes", "Trust", "Start", "Close"],
    sections: [
      {
        title: "What to Expect",
        routeAnchor: "#request-demo-expectations",
        eyebrow: "What to Expect",
        h2: "A conversation designed to create executive clarity.",
        cards: [
          { title: "Executive clarity", copy: "Clarify which business question should lead the discussion before technology enters the room.", cta: "Clarify the starting point" },
          { title: "Value assessment", copy: "Identify where Organizational Intelligence can reduce friction, accelerate decisions or strengthen capability.", cta: "Find the value path" },
          { title: "Practical path", copy: "Leave with a credible next step: conversation, assessment, partner route or platform deep dive.", cta: "Define the next step" },
        ],
      },
      {
        title: "Trust",
        routeAnchor: "#request-demo-trust",
        lead: "Trusted by organizations including",
        assets: [
          "/brand/references/abb.png",
          "/brand/references/thyssenkrupp.png",
          "/brand/references/vtg.png",
          "/brand/references/busch-jaeger.svg",
          "/brand/references/euromobil.svg",
        ],
        notes: ["Reference marquee; CHIP seals and KI Bundesverband are not shown in this section."],
      },
      {
        title: "Start here",
        routeAnchor: "#request-demo-form",
        eyebrow: "Start here",
        h2: "Tell us what you want to understand.",
        lead: "Every Organizational Intelligence journey begins with one conversation. Tell us a little about your organization. We will prepare the discussion around your specific context.",
        ctas: ["Request a Conversation"],
        notes: ["mailto form to info@aiio.de"],
      },
      {
        title: "Conversation",
        routeAnchor: "#request-demo-closing",
        eyebrow: "Conversation",
        h2: "Understanding always starts with a conversation.",
        copy: [
          "Organizational Intelligence is not a product demonstration.",
          "It is the beginning of understanding how an organization can continuously understand itself, build capabilities and create long-term resilience.",
        ],
      },
    ],
  },
  {
    name: "Blog & News",
    route: "/blog",
    pageTitle: "Blog & News",
    metaTitle: "Blog & News | aiio",
    metaDescription: "Insights, product news and organizational intelligence perspectives from aiio.",
    hero: {
      eyebrow: "Blog & News",
      h1: "Insights for organizations that want to understand themselves.",
      intro: [
        "Articles, product news and field notes from the aiio team on process management, Organizational Intelligence and the evolution of work.",
      ],
    },
    sectionOrder: ["Hero", "Latest", "Archive", "Contact"],
    sections: [
      {
        title: "Latest article",
        routeAnchor: "#blog-featured",
        eyebrow: "Latest article",
        h2: "The latest from aiio.",
        lead: "The newest perspective from the aiio journal.",
        cards: blogPosts.slice(0, 1).map((post) => ({
          title: post.title,
          copy: `${post.category}, ${post.date}, ${post.readingTime}. ${post.excerpt}`,
          cta: `Read article -> /blog/${post.slug}`,
          asset: post.heroImage,
        })),
      },
      {
        title: "Archive",
        routeAnchor: "#blog-archive",
        cards: blogPosts.slice(0, 12).map((post) => ({
          title: post.title,
          copy: `${post.category}, ${post.date}, ${post.readingTime}. ${post.excerpt}`,
          cta: `/blog/${post.slug}`,
          asset: post.heroImage,
        })),
        notes: [`Total published posts currently exported from source: ${blogPosts.length}. Complete title list is included in the Blog Archive section below.`],
      },
      {
        title: "Stay connected",
        routeAnchor: "#blog-subscribe",
        eyebrow: "Stay connected",
        h2: "Follow the evolution of Organizational Intelligence.",
        lead: "For executive briefings, product updates or media requests, talk to the aiio team directly.",
        ctas: ["Request a Demo -> /live-demo/kontakt", "Contact aiio -> /contact"],
      },
    ],
  },
];

const brandUsage = {
  "BC-001": "Home hero; image viewer.",
  "BC-002": "Home System section, Platform System figure, global social preview image.",
  "BC-003": "Platform hero.",
  "BC-004": "Brand Canon visual language library.",
  "BC-005": "Home Missing Capability editorial hero.",
  "BC-006": "Academy hero.",
  "BC-007": "Business Impact hero.",
  "BC-008": "Partners hero.",
  "COMPANY-OI": "Company hero.",
  BC201: "Platform ProcessCollector / Organizational Source Code card.",
  BC202: "Platform ProcessMagnet / Organizational Understanding card.",
  BC203: "Platform ProcessForge / Organizational Capability card.",
  BC204: "Platform DataForge / Organizational Evolution card.",
};

const footerLinks = [
  "Platform -> /platform",
  "Business Impact -> /success-stories",
  "Thinking -> /thinking",
  "Get Started -> /live-demo/kontakt",
  "Partners -> /partners",
  "Academy -> /academy",
  "Company -> /company",
  "Blog & News -> /blog",
  "Privacy -> /datenschutz",
  "Legal -> /impressum",
];

const socialLinks = [
  "Facebook -> https://de-de.facebook.com/aiio.official/",
  "Instagram -> https://www.instagram.com/aiio_official/",
  "X -> https://x.com/aiio_gmbh",
  "LinkedIn -> https://www.linkedin.com/company/aiio-gmbh/",
  "YouTube -> https://www.youtube.com/channel/UC3U8d_ByXWqbKR5xnHQHilg",
];

const navigationLinks = [
  "Home -> /",
  "Platform -> /platform",
  "Business Impact -> /success-stories",
  "Thinking -> /thinking",
  "Get Started -> /live-demo/kontakt",
  "Partners -> /partners",
  "Academy -> /academy",
  "Company -> /company",
];

const lines = [
  "# aiio Website Review",
  "",
  "> This file is an internal editorial review artifact.",
  "> It should be regenerated after every major content or layout sprint.",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Website Metadata",
  "",
  "Global title: aiio | Organizational Intelligence with System",
  "",
  "Global description: Build organizations that continuously understand themselves.",
  "",
  "Metadata base: configured through app/site-url.ts",
  "",
  "Theme color: #050509",
  "",
  "Open Graph / Twitter image: /og-home-bc002-1200x630.jpg",
  "",
  "Twitter card: summary_large_image",
  "",
  "Robots: index and follow enabled, large image preview enabled.",
  "",
  "## Header Navigation",
  "",
  markdownList(navigationLinks),
  "",
  "## Canonical Theory Links",
  "",
  markdownList(canonicalTheoryLinks),
  "",
  ...pages.flatMap((page, index) => [renderPage(page, index), ""]),
  "## Theory Publication Metadata",
  "",
  `Title: ${theoryPublication.title}`,
  "",
  `Version: ${theoryPublication.version}`,
  "",
  `Edition: ${theoryPublication.edition}`,
  "",
  `Last updated: ${theoryPublication.lastUpdated}`,
  "",
  `Reading time: ${theoryPublication.readingTime}`,
  "",
  "### Theory Chapter List",
  "",
  theoryChapters
    .map(
      (chapter, index) =>
        `- T${String(index).padStart(2, "0")} ${chapter.title} -> /thinking/theory#${chapter.id}`,
    )
    .join("\n"),
  "",
  "### Theory Chapter Opening Excerpts",
  "",
  theoryChapters
    .map(
      (chapter, index) =>
        `#### T${String(index).padStart(2, "0")} ${chapter.title}\n\nAnchor: /thinking/theory#${chapter.id}\n\nOpening excerpt: ${firstReadableBlock(chapter)}`,
    )
    .join("\n\n"),
  "",
  "### Thinking Journal Entries",
  "",
  "- Version 0.14, July 8, 2026: The Theory now separates the timeless management theory of Organizational Self-Understanding from the reference architecture that implements Organizational Intelligence.",
  "- Version 0.13, July 4, 2026: Theory Version 0.13 introduces a major conceptual refinement of the Organizational Intelligence narrative.",
  "- Version 0.12, July 4, 2026: Organizational evolution now progresses from reality to self-understanding, intelligence, capabilities, self-empowering and resilience.",
  "- Version 0.11, July 3, 2026: Theory becomes the canonical knowledge reference for the aiio website.",
  "- Version 0.10, July 3, 2026: Organizational Self-Understanding as the Missing Management Capability.",
  "",
  "## Blog Archive",
  "",
  `Published posts exported: ${blogPosts.length}`,
  "",
  blogPosts
    .map(
      (post) =>
        `- ${post.date} | ${post.category} | ${post.title} | /blog/${post.slug} | ${post.readingTime}`,
    )
    .join("\n"),
  "",
  "## Brand Canon Assets Used",
  "",
  brandAssets
    .map((asset) => {
      const usage = brandUsage[asset.id] ?? "Registered Brand Canon asset; usage should be reviewed in page context.";
      return `- ${asset.id}: ${asset.alt}\n  Path: ${asset.src}\n  Usage: ${usage}`;
    })
    .join("\n"),
  "",
  "## Customer, Recognition and Footer Assets",
  "",
  "- Customer marquee logos: ABB, thyssenkrupp, VTG, Busch-Jaeger, Euromobil and additional recognition logos under public/brand/references/.",
  "- Footer recognition logos: ISO/IEC 27001 certified (/brand/references/iso-27001-certified-white.png) and KI Bundesverband (/brand/references/ki-bundesverband-footer.png).",
  "- Company recognition includes CHIP Leading Software 2024, CHIP Leading Software 2025 and KI Bundesverband with the note 'Mitglied seit 2024'.",
  "",
  "## Footer",
  "",
  "Footer navigation:",
  "",
  markdownList(footerLinks),
  "",
  "Social links:",
  "",
  markdownList(socialLinks),
  "",
  "Footer copyright: © 2026 aiio GmbH",
  "",
  "## Dynamic Content Notes",
  "",
  "- Blog & News uses dynamic category filtering via the category query parameter.",
  "- Individual blog article pages are generated from app/blog/blog-posts.ts.",
  "- Theory content is generated from the Theory source pipeline into app/thinking/theory/theory-content.generated.ts.",
  "- Brand Canon figures open through the shared Brand Canon figure viewer/lightbox.",
  "- Editorial section navigators are configured per page; Theory is the exception because it uses a dedicated left chapter table of contents.",
  "- Get Started form actions use mailto behavior and do not submit to a backend.",
  "",
  "## Source Files Used",
  "",
  markdownList([
    "app/layout.tsx",
    "app/main-navigation.tsx",
    "app/site-footer.tsx",
    "app/page.tsx",
    "app/platform/page.tsx",
    "app/resource-pages.tsx",
    "app/success-stories/page.tsx",
    "app/thinking/page.tsx",
    "app/thinking/publication-model.ts",
    "app/thinking/theory/page.tsx",
    "app/thinking/theory/theory-content.generated.ts",
    "app/academy/page.tsx",
    "app/partners/page.tsx",
    "app/company/page.tsx",
    "app/live-demo/kontakt/page.tsx",
    "app/blog/page.tsx",
    "app/blog/blog-posts.ts",
    "components/brand/BrandIllustration.tsx",
  ]),
  "",
];

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");

console.log(`Generated ${path.relative(root, outputPath)}`);
