import type { Metadata } from "next";
import { LayerPage } from "../layer-page";

export const metadata: Metadata = {
  title: "ProcessMagnet | aiio Recognition Layer",
  description:
    "ProcessMagnet überführt multimodale Inhalte in wertorientierte, BPMN-konforme Prozess- und Organisationsmodelle.",
};

export default function MagnetPage() {
  return <LayerPage slug="magnet" />;
}
