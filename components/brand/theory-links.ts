export const canonicalTheoryIds = {
  missingCapability: "2-the-missing-layer",
  organizationalCapabilities: "organizational-capabilities",
  organizationalIntelligence: "organizational-intelligence",
  organizationalResilience: "organizational-resilience",
  organizationalSelfEmpowering: "organizational-self-empowering",
  organizationalSelfEmpowerment: "organizational-self-empowering",
  organizationalSelfUnderstanding: "organizational-self-understanding",
  organizationalUnderstanding: "organizational-understanding",
  referenceArchitecture: "reference-architecture-for-organizational-intelligence",
  whyNow: "14-why-now",
} as const;

export const canonicalTheoryLinks = {
  missingCapability: `/thinking/theory#${canonicalTheoryIds.missingCapability}`,
  organizationalCapabilities: `/thinking/theory#${canonicalTheoryIds.organizationalCapabilities}`,
  organizationalIntelligence: `/thinking/theory#${canonicalTheoryIds.organizationalIntelligence}`,
  organizationalResilience: `/thinking/theory#${canonicalTheoryIds.organizationalResilience}`,
  organizationalSelfEmpowering: `/thinking/theory#${canonicalTheoryIds.organizationalSelfEmpowering}`,
  organizationalSelfEmpowerment: `/thinking/theory#${canonicalTheoryIds.organizationalSelfEmpowerment}`,
  organizationalSelfUnderstanding: `/thinking/theory#${canonicalTheoryIds.organizationalSelfUnderstanding}`,
  organizationalUnderstanding: `/thinking/theory#${canonicalTheoryIds.organizationalUnderstanding}`,
  referenceArchitecture: `/thinking/theory#${canonicalTheoryIds.referenceArchitecture}`,
  whyNow: `/thinking/theory#${canonicalTheoryIds.whyNow}`,
} as const;

export const theoryReturnStorageKey = "aiio:theory-return";
export const theoryRestoreStorageKey = "aiio:restore-scroll";

export type TheoryReturnState = {
  hash: string;
  path: string;
  scrollY: number;
  search: string;
  sectionId?: string;
  sourceLabel: string;
  timestamp: number;
};

const canonicalIdsByChapterTitle: Record<string, string> = {
  "Organizational Capabilities": canonicalTheoryIds.organizationalCapabilities,
  "Organizational Intelligence": canonicalTheoryIds.organizationalIntelligence,
  "Organizational Intelligence System": canonicalTheoryIds.referenceArchitecture,
  "Organizational Resilience": canonicalTheoryIds.organizationalResilience,
  "Organizational Self-Empowering": canonicalTheoryIds.organizationalSelfEmpowering,
  "Organizational Self-Empowerment": canonicalTheoryIds.organizationalSelfEmpowerment,
  "Organizational Self-Understanding": canonicalTheoryIds.organizationalSelfUnderstanding,
  "Organizational Understanding": canonicalTheoryIds.organizationalUnderstanding,
  "Reference Architecture for Organizational Intelligence": canonicalTheoryIds.referenceArchitecture,
  "Self-Empowering Organization": canonicalTheoryIds.organizationalSelfEmpowering,
  "Self-Empowering Organizations": canonicalTheoryIds.organizationalSelfEmpowering,
  "The Missing Capability": canonicalTheoryIds.missingCapability,
  "Why Now?": canonicalTheoryIds.whyNow,
};

export function getCanonicalTheoryChapterId(title: string, fallbackId: string) {
  const titleWithoutNumber = title.replace(/^\d+\.\s*/, "");

  return canonicalIdsByChapterTitle[titleWithoutNumber] ?? fallbackId;
}

export function getCanonicalTheoryLinkForLabel(label: string) {
  const normalized = label.trim().toLowerCase();

  if (normalized === "organizational self-understanding") {
    return canonicalTheoryLinks.organizationalSelfUnderstanding;
  }

  if (normalized === "the missing capability" || normalized === "missing capability") {
    return canonicalTheoryLinks.missingCapability;
  }

  if (normalized === "why now" || normalized === "why now?") {
    return canonicalTheoryLinks.whyNow;
  }

  if (
    normalized === "organizational intelligence system" ||
    normalized === "reference architecture for organizational intelligence" ||
    normalized === "platform"
  ) {
    return canonicalTheoryLinks.referenceArchitecture;
  }

  if (normalized === "organizational intelligence") {
    return canonicalTheoryLinks.organizationalIntelligence;
  }

  if (
    normalized === "organizational capabilities" ||
    normalized === "organizational capability"
  ) {
    return canonicalTheoryLinks.organizationalCapabilities;
  }

  if (normalized === "organizational resilience") {
    return canonicalTheoryLinks.organizationalResilience;
  }

  if (
    normalized === "organizational self-empowering" ||
    normalized === "organizational self-empowerment" ||
    normalized === "self-empowering organization" ||
    normalized === "self-empowering organizations"
  ) {
    return canonicalTheoryLinks.organizationalSelfEmpowerment;
  }

  if (normalized === "organizational understanding") {
    return canonicalTheoryLinks.organizationalUnderstanding;
  }

  return "/thinking/theory";
}
