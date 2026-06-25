import type { Metadata } from "next";
import { LayerPage } from "../layer-page";

export const metadata: Metadata = {
  title: "ProcessCollector | aiio Grounding Layer",
  description:
    "ProcessCollector macht Organisationswissen sichtbar und schafft den Single Point of Truth für den aiio Produkt-Stack.",
};

export default function CollectorPage() {
  return <LayerPage slug="collector" />;
}
