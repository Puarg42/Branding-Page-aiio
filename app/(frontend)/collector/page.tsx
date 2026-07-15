import type { Metadata } from "next";
import { LayerPage } from "../layer-page";

export const metadata: Metadata = {
  alternates: { canonical: "/collector" },
  title: "ProcessCollector | aiio Organizational Representation",
  description:
    "ProcessCollector schafft die menschenlesbare Repräsentation der Organisation für das aiio Organizational Intelligence System.",
};

export default function CollectorPage() {
  return <LayerPage slug="collector" />;
}
