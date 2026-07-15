import { ResourcePage } from "../../resource-pages";
import { resourceRouteMetadata } from "../../seo";

export const metadata = resourceRouteMetadata("product-news", "/platform/product-news");

export default function ProductNewsPage() {
  return <ResourcePage slug="product-news" />;
}
