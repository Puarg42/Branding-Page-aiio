import type { Metadata } from "next";
import { LayerPage } from "../layer-page";

export const metadata: Metadata = {
  title: "ProcessMagnet | aiio Self-Understanding Capability",
  description:
    "ProcessMagnet interpretiert organisatorische Realität kontinuierlich und erzeugt Organizational Self-Understanding.",
};

export default function MagnetPage() {
  return <LayerPage slug="magnet" />;
}
