import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("support", "/support");

export default function SupportPage() {
  return <ResourcePage slug="support" />;
}
