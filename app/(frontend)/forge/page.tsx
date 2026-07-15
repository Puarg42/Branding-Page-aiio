import type { Metadata } from "next";
import { LayerPage } from "../layer-page";

export const metadata: Metadata = {
  alternates: { canonical: "/forge" },
  title: "ProcessForge | aiio Activation Layer",
  description:
    "ProcessForge ist der KI-driven Outlet für geschmiedetes Organisationswissen über Agenten, Chat, API, MCP und Umsysteme.",
};

export default function ForgePage() {
  return <LayerPage slug="forge" />;
}
