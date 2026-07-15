/**
 * The single source of truth for the aiio capability spine — the four-level
 * customer transformation from Organizational Memory to Organizational
 * Resilience.
 *
 * Home (`CapabilityJourney`), the platform ladder, and the academy modules
 * should all read from this model so the narrative never drifts between pages.
 */

export type CapabilityTone = "graphite" | "cyan" | "purple" | "amber";

export type CapabilityStep = {
  /** Ordinal label, e.g. "Level 1". */
  level: string;
  /** Short imperative headline, e.g. "Build memory". */
  title: string;
  /** One-sentence outcome statement. */
  copy: string;
  /** Product that powers this step, when applicable. */
  product?: "ProcessCollector" | "ProcessMagnet" | "ProcessForge" | "DataForge";
  tone: CapabilityTone;
};

export const capabilitySpine: readonly CapabilityStep[] = [
  {
    level: "Level 1",
    title: "Build memory",
    copy: "Your organization preserves knowledge, context and decisions as shared Organizational Memory.",
    product: "ProcessCollector",
    tone: "graphite",
  },
  {
    level: "Level 2",
    title: "Understand itself",
    copy: "Organizational Memory becomes continuously interpretable as Organizational Self-Understanding.",
    product: "ProcessMagnet",
    tone: "cyan",
  },
  {
    level: "Level 3",
    title: "Create capabilities",
    copy: "Self-understanding becomes intelligence and repeatable behavior people and AI can apply.",
    product: "ProcessForge",
    tone: "purple",
  },
  {
    level: "Level 4",
    title: "Become resilient",
    copy: "The organization adapts faster because its capabilities improve with feedback and change.",
    product: "DataForge",
    tone: "amber",
  },
] as const;
