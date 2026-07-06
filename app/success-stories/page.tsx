import { ResourcePage } from "../resource-pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Impact | aiio",
  description:
    "Business Impact examples for how Organizational Intelligence creates measurable value across different organizational challenges.",
};

export default function SuccessStoriesPage() {
  return <ResourcePage slug="success-stories" />;
}
