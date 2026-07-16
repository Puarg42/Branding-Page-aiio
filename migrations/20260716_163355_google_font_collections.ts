import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_font_families_provider" AS ENUM('local', 'google');
  CREATE TABLE "font_collections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"display_id" integer NOT NULL,
  	"body_id" integer NOT NULL,
  	"mono_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "font_families_files" ALTER COLUMN "file_id" DROP NOT NULL;
  ALTER TABLE "font_families_files" ALTER COLUMN "weight" DROP NOT NULL;
  ALTER TABLE "font_families" ADD COLUMN "provider" "enum_font_families_provider" DEFAULT 'local' NOT NULL;
  ALTER TABLE "font_families" ADD COLUMN "google_fonts_u_r_l" varchar;
  ALTER TABLE "themes" ADD COLUMN "typography_collection_id" integer;
  ALTER TABLE "_themes_v" ADD COLUMN "version_typography_collection_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "font_collections_id" integer;
  ALTER TABLE "font_collections" ADD CONSTRAINT "font_collections_display_id_font_families_id_fk" FOREIGN KEY ("display_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "font_collections" ADD CONSTRAINT "font_collections_body_id_font_families_id_fk" FOREIGN KEY ("body_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "font_collections" ADD CONSTRAINT "font_collections_mono_id_font_families_id_fk" FOREIGN KEY ("mono_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "font_collections_name_idx" ON "font_collections" USING btree ("name");
  CREATE INDEX "font_collections_display_idx" ON "font_collections" USING btree ("display_id");
  CREATE INDEX "font_collections_body_idx" ON "font_collections" USING btree ("body_id");
  CREATE INDEX "font_collections_mono_idx" ON "font_collections" USING btree ("mono_id");
  CREATE INDEX "font_collections_updated_at_idx" ON "font_collections" USING btree ("updated_at");
  CREATE INDEX "font_collections_created_at_idx" ON "font_collections" USING btree ("created_at");
  ALTER TABLE "themes" ADD CONSTRAINT "themes_typography_collection_id_font_collections_id_fk" FOREIGN KEY ("typography_collection_id") REFERENCES "public"."font_collections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_themes_v" ADD CONSTRAINT "_themes_v_version_typography_collection_id_font_collections_id_fk" FOREIGN KEY ("version_typography_collection_id") REFERENCES "public"."font_collections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_font_collections_fk" FOREIGN KEY ("font_collections_id") REFERENCES "public"."font_collections"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "themes_typography_typography_collection_idx" ON "themes" USING btree ("typography_collection_id");
  CREATE INDEX "_themes_v_version_typography_version_typography_collecti_idx" ON "_themes_v" USING btree ("version_typography_collection_id");
  CREATE INDEX "payload_locked_documents_rels_font_collections_id_idx" ON "payload_locked_documents_rels" USING btree ("font_collections_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "font_collections" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "font_collections" CASCADE;
  ALTER TABLE "themes" DROP CONSTRAINT "themes_typography_collection_id_font_collections_id_fk";
  
  ALTER TABLE "_themes_v" DROP CONSTRAINT "_themes_v_version_typography_collection_id_font_collections_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_font_collections_fk";
  
  DROP INDEX "themes_typography_typography_collection_idx";
  DROP INDEX "_themes_v_version_typography_version_typography_collecti_idx";
  DROP INDEX "payload_locked_documents_rels_font_collections_id_idx";
  ALTER TABLE "font_families_files" ALTER COLUMN "file_id" SET NOT NULL;
  ALTER TABLE "font_families_files" ALTER COLUMN "weight" SET NOT NULL;
  ALTER TABLE "font_families" DROP COLUMN "provider";
  ALTER TABLE "font_families" DROP COLUMN "google_fonts_u_r_l";
  ALTER TABLE "themes" DROP COLUMN "typography_collection_id";
  ALTER TABLE "_themes_v" DROP COLUMN "version_typography_collection_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "font_collections_id";
  DROP TYPE "public"."enum_font_families_provider";`)
}
