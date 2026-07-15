import { ResourcePage } from "../resource-pages";
import { resourceRouteMetadata } from "../seo";

export const metadata = resourceRouteMetadata("downloadcenter", "/downloadcenter");

export default function DownloadcenterPage() {
  return <ResourcePage slug="downloadcenter" />;
}
