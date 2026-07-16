import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_statement_tone" AS ENUM('light', 'dark', 'accent');
  CREATE TYPE "public"."enum_pages_blocks_module_module" AS ENUM('realityCheck', 'categoryEvolution', 'capabilityJourney', 'trustLogos', 'brandIllustration', 'theoryReader', 'successStories');
  CREATE TYPE "public"."enum_pages_blocks_module_illustration_variant" AS ENUM('BC-001', 'BC-002', 'BC-005');
  CREATE TYPE "public"."enum__pages_v_blocks_statement_tone" AS ENUM('light', 'dark', 'accent');
  CREATE TYPE "public"."enum__pages_v_blocks_module_module" AS ENUM('realityCheck', 'categoryEvolution', 'capabilityJourney', 'trustLogos', 'brandIllustration', 'theoryReader', 'successStories');
  CREATE TYPE "public"."enum__pages_v_blocks_module_illustration_variant" AS ENUM('BC-001', 'BC-002', 'BC-005');
  CREATE TABLE "pages_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"copy" varchar,
  	"tone" "enum_pages_blocks_statement_tone" DEFAULT 'light',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_lead_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"copy" varchar,
  	"button_label" varchar,
  	"topic" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_module" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"module" "enum_pages_blocks_module_module",
  	"heading" varchar,
  	"copy" varchar,
  	"illustration_variant" "enum_pages_blocks_module_illustration_variant",
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"copy" varchar,
  	"tone" "enum__pages_v_blocks_statement_tone" DEFAULT 'light',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_lead_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"copy" varchar,
  	"button_label" varchar,
  	"topic" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_module" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"module" "enum__pages_v_blocks_module_module",
  	"heading" varchar,
  	"copy" varchar,
  	"illustration_variant" "enum__pages_v_blocks_module_illustration_variant",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "source_key" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_source_key" varchar;
  ALTER TABLE "pages_blocks_statement" ADD CONSTRAINT "pages_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_lead_form" ADD CONSTRAINT "pages_blocks_lead_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_module" ADD CONSTRAINT "pages_blocks_module_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_statement" ADD CONSTRAINT "_pages_v_blocks_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_lead_form" ADD CONSTRAINT "_pages_v_blocks_lead_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_module" ADD CONSTRAINT "_pages_v_blocks_module_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_statement_order_idx" ON "pages_blocks_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_statement_parent_id_idx" ON "pages_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_statement_path_idx" ON "pages_blocks_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_statement_locale_idx" ON "pages_blocks_statement" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_order_idx" ON "pages_blocks_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_parent_id_idx" ON "pages_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_path_idx" ON "pages_blocks_media" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_locale_idx" ON "pages_blocks_media" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_image_idx" ON "pages_blocks_media" USING btree ("image_id");
  CREATE INDEX "pages_blocks_lead_form_order_idx" ON "pages_blocks_lead_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_lead_form_parent_id_idx" ON "pages_blocks_lead_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_lead_form_path_idx" ON "pages_blocks_lead_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_lead_form_locale_idx" ON "pages_blocks_lead_form" USING btree ("_locale");
  CREATE INDEX "pages_blocks_module_order_idx" ON "pages_blocks_module" USING btree ("_order");
  CREATE INDEX "pages_blocks_module_parent_id_idx" ON "pages_blocks_module" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_module_path_idx" ON "pages_blocks_module" USING btree ("_path");
  CREATE INDEX "pages_blocks_module_locale_idx" ON "pages_blocks_module" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_statement_order_idx" ON "_pages_v_blocks_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_statement_parent_id_idx" ON "_pages_v_blocks_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_statement_path_idx" ON "_pages_v_blocks_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_statement_locale_idx" ON "_pages_v_blocks_statement" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_order_idx" ON "_pages_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_parent_id_idx" ON "_pages_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_path_idx" ON "_pages_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_locale_idx" ON "_pages_v_blocks_media" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_image_idx" ON "_pages_v_blocks_media" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_lead_form_order_idx" ON "_pages_v_blocks_lead_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_lead_form_parent_id_idx" ON "_pages_v_blocks_lead_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_lead_form_path_idx" ON "_pages_v_blocks_lead_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_lead_form_locale_idx" ON "_pages_v_blocks_lead_form" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_module_order_idx" ON "_pages_v_blocks_module" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_module_parent_id_idx" ON "_pages_v_blocks_module" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_module_path_idx" ON "_pages_v_blocks_module" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_module_locale_idx" ON "_pages_v_blocks_module" USING btree ("_locale");
  CREATE UNIQUE INDEX "pages_source_key_idx" ON "pages" USING btree ("source_key");
  CREATE INDEX "_pages_v_version_version_source_key_idx" ON "_pages_v" USING btree ("version_source_key");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_lead_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_module" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_lead_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_module" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_statement" CASCADE;
  DROP TABLE "pages_blocks_media" CASCADE;
  DROP TABLE "pages_blocks_lead_form" CASCADE;
  DROP TABLE "pages_blocks_module" CASCADE;
  DROP TABLE "_pages_v_blocks_statement" CASCADE;
  DROP TABLE "_pages_v_blocks_media" CASCADE;
  DROP TABLE "_pages_v_blocks_lead_form" CASCADE;
  DROP TABLE "_pages_v_blocks_module" CASCADE;
  DROP INDEX "pages_source_key_idx";
  DROP INDEX "_pages_v_version_version_source_key_idx";
  ALTER TABLE "pages" DROP COLUMN "source_key";
  ALTER TABLE "_pages_v" DROP COLUMN "version_source_key";
  DROP TYPE "public"."enum_pages_blocks_statement_tone";
  DROP TYPE "public"."enum_pages_blocks_module_module";
  DROP TYPE "public"."enum_pages_blocks_module_illustration_variant";
  DROP TYPE "public"."enum__pages_v_blocks_statement_tone";
  DROP TYPE "public"."enum__pages_v_blocks_module_module";
  DROP TYPE "public"."enum__pages_v_blocks_module_illustration_variant";`)
}
