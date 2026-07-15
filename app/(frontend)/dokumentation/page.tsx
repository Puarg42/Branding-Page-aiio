import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("dokumentation", "/dokumentation");

export default function DokumentationPage() {
  return <ResourcePage slug="dokumentation" />;
}
