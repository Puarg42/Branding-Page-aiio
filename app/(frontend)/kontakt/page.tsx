import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("kontakt", "/kontakt");

export default function KontaktPage() {
  return <ResourcePage slug="kontakt" />;
}
