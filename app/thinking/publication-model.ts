import { canonicalTheoryIds } from "../../components/brand/theory-links";

export type TheoryChapterReference = {
  id: string;
  title: string;
};

export type TheoryJournalEntry = {
  affectedChapters: TheoryChapterReference[];
  coreThesis: string;
  date: string;
  version: string;
  whyItMatters: string;
};

export const theoryPublication = {
  edition: "Living Publication",
  lastUpdated: "July 8, 2026",
  readingTime: "Approx. 40 min reading",
  title: "Theory",
  version: "Version 0.14",
} as const;

export const theoryEditorialRules = [
  "Every Theory revision updates Thinking.",
  "Thinking always references affected Theory chapters.",
  "Theory always represents the current consolidated state.",
  "Thinking documents the evolution.",
] as const;

export const theoryChapterReferences = {
  prologue: {
    id: "prologue",
    title: "Prologue",
  },
  observation: {
    id: "1-observation",
    title: "Observation",
  },
  missingLayer: {
    id: canonicalTheoryIds.missingCapability,
    title: "The Missing Capability",
  },
  organizationsCannotUnderstandThemselves: {
    id: "3-organizations-cannot-understand-themselves",
    title: "Organizations Cannot Understand Themselves",
  },
  organizationalSelfUnderstanding: {
    id: canonicalTheoryIds.organizationalSelfUnderstanding,
    title: "Organizational Self-Understanding",
  },
  organizationalUnderstanding: {
    id: canonicalTheoryIds.organizationalUnderstanding,
    title: "Organizational Understanding",
  },
  organizationalIntelligence: {
    id: canonicalTheoryIds.organizationalIntelligence,
    title: "Organizational Intelligence",
  },
  organizationalCapabilities: {
    id: canonicalTheoryIds.organizationalCapabilities,
    title: "Organizational Capabilities",
  },
  organizationalSelfEmpowering: {
    id: canonicalTheoryIds.organizationalSelfEmpowering,
    title: "Organizational Self-Empowerment",
  },
  organizationalResilience: {
    id: canonicalTheoryIds.organizationalResilience,
    title: "Organizational Resilience",
  },
  organizationalMemory: {
    id: "10-organizational-memory",
    title: "Organizational Memory",
  },
  emergence: {
    id: "11-emergence",
    title: "Emergence",
  },
  hypothesis: {
    id: "12-the-organizational-intelligence-hypothesis",
    title: "The Organizational Intelligence Hypothesis",
  },
  evolution: {
    id: "13-the-evolution-of-organizational-management",
    title: "The Evolution of Organizational Management",
  },
  whyNow: {
    id: canonicalTheoryIds.whyNow,
    title: "Why Now?",
  },
  consulting: {
    id: "15-the-transformation-of-consulting",
    title: "The Transformation of Consulting",
  },
  referenceArchitecture: {
    id: canonicalTheoryIds.referenceArchitecture,
    title: "Reference Architecture for Organizational Intelligence",
  },
} satisfies Record<string, TheoryChapterReference>;

export const theoryJournalEntries: TheoryJournalEntry[] = [
  {
    affectedChapters: [
      theoryChapterReferences.missingLayer,
      theoryChapterReferences.organizationalUnderstanding,
      theoryChapterReferences.organizationalSelfUnderstanding,
      theoryChapterReferences.organizationalIntelligence,
      theoryChapterReferences.organizationalCapabilities,
      theoryChapterReferences.organizationalSelfEmpowering,
      theoryChapterReferences.organizationalResilience,
      theoryChapterReferences.referenceArchitecture,
    ],
    coreThesis:
      "The Theory now separates the timeless management theory of Organizational Self-Understanding from the reference architecture that implements Organizational Intelligence.",
    date: "July 8, 2026",
    version: "0.14",
    whyItMatters:
      "This revision formalizes Organizational Self-Understanding as a management capability, introduces the Capability Model, clarifies the Capability -> Outcome -> Business Value distinction, sharpens the difference between Knowledge and Understanding, positions Organizational Resilience as the business outcome and creates stable reference markers for the entire website.",
  },
  {
    affectedChapters: [
      theoryChapterReferences.organizationalSelfUnderstanding,
      theoryChapterReferences.organizationalIntelligence,
      theoryChapterReferences.organizationalCapabilities,
      theoryChapterReferences.organizationalSelfEmpowering,
      theoryChapterReferences.organizationalResilience,
    ],
    coreThesis:
      "Theory Version 0.13 introduces a major conceptual refinement of the Organizational Intelligence narrative.",
    date: "July 4, 2026",
    version: "0.13",
    whyItMatters:
      "This revision clarifies the distinction between Business Narrative and Theory, refines Organizational Self-Understanding, repositions Organizational Intelligence, clarifies Organizational Capabilities, introduces Organizational Self-Empowerment as organizational maturity, synchronizes the website and Platform narrative, restructures the journey and rewrites the capability cards.",
  },
  {
    affectedChapters: [
      theoryChapterReferences.organizationalSelfUnderstanding,
      theoryChapterReferences.organizationalIntelligence,
      theoryChapterReferences.organizationalCapabilities,
      theoryChapterReferences.organizationalSelfEmpowering,
      theoryChapterReferences.organizationalResilience,
    ],
    coreThesis:
      "Organizational evolution now progresses from reality to self-understanding, intelligence, capabilities, self-empowering and resilience.",
    date: "July 4, 2026",
    version: "0.12",
    whyItMatters:
      "This major conceptual refinement positions Organizational Intelligence as an intermediate organizational capability, introduces Organizational Self-Empowerment as the direct outcome of continuously evolving capabilities, refines the product-to-capability mapping and synchronizes the Brand Book, Theory and Platform narrative.",
  },
  {
    affectedChapters: [
      theoryChapterReferences.organizationalSelfUnderstanding,
      theoryChapterReferences.organizationalIntelligence,
      theoryChapterReferences.organizationalCapabilities,
      theoryChapterReferences.organizationalResilience,
    ],
    coreThesis:
      "Theory becomes the canonical knowledge reference for the aiio website.",
    date: "July 3, 2026",
    version: "0.11",
    whyItMatters:
      "This revision introduces canonical chapter anchors, context-aware return navigation, alignment with Platform terminology, an updated capability hierarchy and the deep-link architecture that connects website concepts to their consolidated Theory chapters.",
  },
  {
    affectedChapters: [
      theoryChapterReferences.prologue,
      theoryChapterReferences.observation,
      theoryChapterReferences.missingLayer,
      theoryChapterReferences.organizationalSelfUnderstanding,
      theoryChapterReferences.organizationalUnderstanding,
      theoryChapterReferences.organizationalIntelligence,
      theoryChapterReferences.organizationalCapabilities,
      theoryChapterReferences.organizationalResilience,
    ],
    coreThesis:
      "Organizational Self-Understanding as the Missing Management Capability",
    date: "July 3, 2026",
    version: "0.10",
    whyItMatters:
      "This revision formalizes Organizational Self-Understanding as a management capability, introduces the Capability Model, clarifies the Capability -> Outcome -> Business Value distinction, separates Knowledge from Understanding and positions Organizational Resilience as the business outcome of continuously developed organizational capabilities.",
  },
];
