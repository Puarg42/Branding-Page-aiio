import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("services", "/services");

export default function ServicesPage() {
  return <ResourcePage slug="services" />;
}
