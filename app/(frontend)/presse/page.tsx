import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("presse", "/presse");

export default function PressePage() {
  return <ResourcePage slug="presse" />;
}
