import { ResourcePage } from "../resource-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/success-stories" },
  title: "Business Impact | aiio",
  description:
    "Business Impact as category proof for how Organizational Intelligence addresses different executive business challenges.",
};

export default function SuccessStoriesPage() {
  return <ResourcePage slug="success-stories" />;
}
