import type { Metadata } from "next";
import { WebsiteArchitecturePage } from "../website-architecture";

export const metadata: Metadata = {
  title: "Thinking | aiio",
  description:
    "The thought-leadership home for Organizational Intelligence and the future of organizations.",
};

const sections = [
  { title: "Core Thesis" },
  { title: "Organizational Intelligence" },
  { title: "Whitepapers" },
  { title: "Essays" },
  { title: "Publications" },
  { title: "Dissertation" },
  { title: "Future of Organizations" },
] as const;

export default function ThinkingPage() {
  return (
    <WebsiteArchitecturePage
      eyebrow="Thinking"
      intro="The Thinking area will become aiio's home for the ideas, essays and research behind Organizational Intelligence."
      sections={sections}
      title="The ideas behind Organizational Intelligence."
    />
  );
}
