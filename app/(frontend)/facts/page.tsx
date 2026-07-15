import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("facts", "/facts");

export default function FactsPage() {
  return <ResourcePage slug="facts" />;
}
