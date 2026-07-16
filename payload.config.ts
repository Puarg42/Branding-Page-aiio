import path from "node:path";
import { fileURLToPath } from "node:url";

import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Authors } from "./collections/Authors";
import { Categories } from "./collections/Categories";
import { Leads } from "./collections/Leads";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Publications } from "./collections/Publications";
import { SuccessStories } from "./collections/SuccessStories";
import { Users } from "./collections/Users";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { SiteSettings } from "./globals/SiteSettings";
import { defaultLocale, localeLabels, locales } from "./lib/i18n/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// The vercel-postgres adapter reads POSTGRES_URL by default; DATABASE_URL is an
// accepted alias. An empty string is fine at build time (no connection is made
// until the first query at runtime).
const connectionString =
  process.env.POSTGRES_URL || process.env.DATABASE_URL || "";

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · aiio",
    },
  },
  collections: [Users, Media, Pages, Authors, Categories, Publications, SuccessStories, Leads],
  globals: [Header, Footer, SiteSettings],
  localization: {
    locales: locales.map((code) => ({
      code,
      label: localeLabels[code],
    })),
    defaultLocale,
    fallback: true,
  },
  editor: lexicalEditor(),
  // Real deployments MUST set PAYLOAD_SECRET (bootstrap provisions it). The
  // fallback exists only so `next build` can run in environments without the
  // secret; tokens are never trusted across environments.
  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME_BUILD_ONLY_SECRET",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: { connectionString },
    migrationDir: path.resolve(dirname, "migrations"),
    // Migrations are the single source of truth. Disable dev "push" so the
    // schema is never auto-synced (which caused drift against the shared DB and
    // a data-loss prompt in `payload migrate`).
    push: false,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
