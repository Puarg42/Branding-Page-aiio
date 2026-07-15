const fallbackSiteUrl = "https://branding-page-aiio.vercel.app";

function normalizeSiteUrl(url?: string) {
  if (!url) {
    return fallbackSiteUrl;
  }

  const withProtocol = url.startsWith("http") ? url : `https://${url}`;

  return withProtocol.replace(/\/$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL,
);

export const deploymentUrl = normalizeSiteUrl(
  process.env.VERCEL_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
);
