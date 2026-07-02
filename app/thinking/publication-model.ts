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
  lastUpdated: "July 2, 2026",
  readingTime: "Approx. 40 min reading",
  title: "Theory",
  version: "Version 0.10",
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
    id: "2-the-missing-layer",
    title: "The Missing Layer",
  },
  organizationalSelfUnderstanding: {
    id: "3-organizations-cannot-understand-themselves",
    title: "Organizations Cannot Understand Themselves",
  },
  organizationalUnderstanding: {
    id: "4-organizational-understanding",
    title: "Organizational Understanding",
  },
  organizationalIntelligence: {
    id: "5-organizational-intelligence",
    title: "Organizational Intelligence",
  },
} satisfies Record<string, TheoryChapterReference>;

export const theoryJournalEntries: TheoryJournalEntry[] = [
  {
    affectedChapters: [
      theoryChapterReferences.prologue,
      theoryChapterReferences.observation,
      theoryChapterReferences.missingLayer,
      theoryChapterReferences.organizationalSelfUnderstanding,
      theoryChapterReferences.organizationalUnderstanding,
      theoryChapterReferences.organizationalIntelligence,
    ],
    coreThesis:
      "Organizations are not their people. An organization is an autonomous socio-technical system that currently lacks the capability to understand itself continuously. Organizational Self-Understanding closes this gap.",
    date: "July 2, 2026",
    version: "0.10",
    whyItMatters:
      "This revision clarifies the terminology between Organizational Understanding and Organizational Self-Understanding. Organizational Understanding connects knowledge, context, relationships and reasoning. Organizational Self-Understanding names the capability of the organization itself to continuously interpret its own structures, decisions, processes and capabilities.",
  },
];
