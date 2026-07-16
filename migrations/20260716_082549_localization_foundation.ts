import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'de');
  CREATE TYPE "public"."enum_pages_blocks_hero_primary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_secondary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_cta_primary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_cta_secondary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('standard', 'home', 'platform', 'thinking', 'theory', 'company', 'legal', 'conversion');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_primary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_secondary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_primary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_secondary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('standard', 'home', 'platform', 'thinking', 'theory', 'company', 'legal', 'conversion');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'de');
  CREATE TYPE "public"."enum__publications_v_published_locale" AS ENUM('en', 'de');
  CREATE TYPE "public"."enum__success_stories_v_published_locale" AS ENUM('en', 'de');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_footer_legal_items_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"video_url" varchar,
  	"video_poster_id" integer,
  	"video_transcript" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"translation_complete" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"publications_id" integer
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_translation_complete" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"publications_id" integer
  );
  
  CREATE TABLE "authors_locales" (
  	"role" varchar,
  	"bio" varchar,
  	"avatar_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "publications_locales" (
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"reading_time" varchar,
  	"category_id" integer,
  	"hero_image_id" integer,
  	"hero_image_url" varchar,
  	"hero_image_alt" varchar,
  	"body" jsonb,
  	"body_html" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"translation_complete" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_publications_v_locales" (
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_reading_time" varchar,
  	"version_category_id" integer,
  	"version_hero_image_id" integer,
  	"version_hero_image_url" varchar,
  	"version_hero_image_alt" varchar,
  	"version_body" jsonb,
  	"version_body_html" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_seo_no_index" boolean DEFAULT false,
  	"version_translation_complete" boolean DEFAULT false,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "success_stories_locales" (
  	"industry" varchar,
  	"slug" varchar,
  	"challenge" varchar,
  	"action" varchar,
  	"result" varchar,
  	"logo_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_success_stories_v_locales" (
  	"version_industry" varchar,
  	"version_slug" varchar,
  	"version_challenge" varchar,
  	"version_action" varchar,
  	"version_result" varchar,
  	"version_logo_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"publications_id" integer
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"pages_id" integer,
  	"publications_id" integer
  );
  
  CREATE TABLE "site_settings_locales" (
  	"primary_cta_label" varchar DEFAULT 'Request a conversation',
  	"primary_cta_href" varchar DEFAULT '/live-demo/kontakt',
  	"secondary_cta_label" varchar DEFAULT 'Explore the platform',
  	"secondary_cta_href" varchar DEFAULT '/platform',
  	"announcement" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "authors" DROP CONSTRAINT "authors_avatar_id_media_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_category_id_categories_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_hero_image_id_media_id_fk";
  
  ALTER TABLE "_publications_v" DROP CONSTRAINT "_publications_v_version_category_id_categories_id_fk";
  
  ALTER TABLE "_publications_v" DROP CONSTRAINT "_publications_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "success_stories" DROP CONSTRAINT "success_stories_logo_id_media_id_fk";
  
  ALTER TABLE "_success_stories_v" DROP CONSTRAINT "_success_stories_v_version_logo_id_media_id_fk";
  
  DROP INDEX "pages_slug_idx";
  DROP INDEX "_pages_v_version_version_slug_idx";
  DROP INDEX "authors_avatar_idx";
  DROP INDEX "categories_slug_idx";
  DROP INDEX "publications_slug_idx";
  DROP INDEX "publications_category_idx";
  DROP INDEX "publications_hero_image_idx";
  DROP INDEX "_publications_v_version_version_slug_idx";
  DROP INDEX "_publications_v_version_version_category_idx";
  DROP INDEX "_publications_v_version_version_hero_image_idx";
  DROP INDEX "success_stories_slug_idx";
  DROP INDEX "success_stories_logo_idx";
  DROP INDEX "_success_stories_v_version_version_slug_idx";
  DROP INDEX "_success_stories_v_version_version_logo_idx";
  DROP INDEX "publications_rels_authors_id_idx";
  DROP INDEX "_publications_v_rels_authors_id_idx";
  ALTER TABLE "header_nav_items" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "footer_legal_items" ALTER COLUMN "href" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "primary_cta_type" "enum_pages_blocks_hero_primary_cta_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "primary_cta_url" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "primary_cta_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_type" "enum_pages_blocks_hero_secondary_cta_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_url" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_prose" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_feature_grid" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "primary_cta_type" "enum_pages_blocks_cta_primary_cta_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "primary_cta_url" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "primary_cta_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "secondary_cta_type" "enum_pages_blocks_cta_secondary_cta_type" DEFAULT 'internal';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "secondary_cta_url" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "secondary_cta_new_tab" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "page_type" "enum_pages_page_type" DEFAULT 'standard';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "primary_cta_type" "enum__pages_v_blocks_hero_primary_cta_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "primary_cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "primary_cta_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "secondary_cta_type" "enum__pages_v_blocks_hero_secondary_cta_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "secondary_cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "secondary_cta_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_prose" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "primary_cta_type" "enum__pages_v_blocks_cta_primary_cta_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "primary_cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "primary_cta_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "secondary_cta_type" "enum__pages_v_blocks_cta_secondary_cta_type" DEFAULT 'internal';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "secondary_cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "secondary_cta_new_tab" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_page_type" "enum__pages_v_version_page_type" DEFAULT 'standard';
  ALTER TABLE "_pages_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_pages_v" ADD COLUMN "published_locale" "enum__pages_v_published_locale";
  ALTER TABLE "publications_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_publications_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_publications_v" ADD COLUMN "published_locale" "enum__publications_v_published_locale";
  ALTER TABLE "_publications_v_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "success_stories_proof_points" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_success_stories_v_version_proof_points" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "_success_stories_v" ADD COLUMN "snapshot" boolean;
  ALTER TABLE "_success_stories_v" ADD COLUMN "published_locale" "enum__success_stories_v_published_locale";
  ALTER TABLE "header_nav_items" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_type" "enum_header_nav_items_link_type" DEFAULT 'internal' NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_label" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_new_tab" boolean DEFAULT false;
  ALTER TABLE "footer_nav_items" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_type" "enum_footer_nav_items_link_type" DEFAULT 'internal' NOT NULL;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_label" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_new_tab" boolean DEFAULT false;
  ALTER TABLE "footer_legal_items" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "footer_legal_items" ADD COLUMN "link_type" "enum_footer_legal_items_link_type" DEFAULT 'internal' NOT NULL;
  ALTER TABLE "footer_legal_items" ADD COLUMN "link_label" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "footer_legal_items" ADD COLUMN "link_url" varchar;
  ALTER TABLE "footer_legal_items" ADD COLUMN "link_new_tab" boolean DEFAULT false;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_video_poster_id_media_id_fk" FOREIGN KEY ("video_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors_locales" ADD CONSTRAINT "authors_locales_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors_locales" ADD CONSTRAINT "authors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_locales" ADD CONSTRAINT "publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_publications_v_locales" ADD CONSTRAINT "_publications_v_locales_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_locales" ADD CONSTRAINT "_publications_v_locales_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_locales" ADD CONSTRAINT "_publications_v_locales_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v_locales" ADD CONSTRAINT "_publications_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_locales" ADD CONSTRAINT "success_stories_locales_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_locales" ADD CONSTRAINT "success_stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_success_stories_v_locales" ADD CONSTRAINT "_success_stories_v_locales_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v_locales" ADD CONSTRAINT "_success_stories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_success_stories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "media_video_video_poster_idx" ON "media_locales" USING btree ("video_poster_id");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages_locales" USING btree ("slug","_locale");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages_locales" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "pages_rels_publications_id_idx" ON "pages_rels" USING btree ("publications_id","locale");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_pages_v_version_seo_version_seo_image_idx" ON "_pages_v_locales" USING btree ("version_seo_image_id");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_publications_id_idx" ON "_pages_v_rels" USING btree ("publications_id","locale");
  CREATE INDEX "authors_avatar_idx" ON "authors_locales" USING btree ("avatar_id","_locale");
  CREATE UNIQUE INDEX "authors_locales_locale_parent_id_unique" ON "authors_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories_locales" USING btree ("slug","_locale");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "publications_slug_idx" ON "publications_locales" USING btree ("slug","_locale");
  CREATE INDEX "publications_category_idx" ON "publications_locales" USING btree ("category_id","_locale");
  CREATE INDEX "publications_hero_image_idx" ON "publications_locales" USING btree ("hero_image_id","_locale");
  CREATE INDEX "publications_seo_seo_image_idx" ON "publications_locales" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "publications_locales_locale_parent_id_unique" ON "publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_publications_v_version_version_slug_idx" ON "_publications_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_publications_v_version_version_category_idx" ON "_publications_v_locales" USING btree ("version_category_id","_locale");
  CREATE INDEX "_publications_v_version_version_hero_image_idx" ON "_publications_v_locales" USING btree ("version_hero_image_id","_locale");
  CREATE INDEX "_publications_v_version_seo_version_seo_image_idx" ON "_publications_v_locales" USING btree ("version_seo_image_id");
  CREATE UNIQUE INDEX "_publications_v_locales_locale_parent_id_unique" ON "_publications_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "success_stories_slug_idx" ON "success_stories_locales" USING btree ("slug","_locale");
  CREATE INDEX "success_stories_logo_idx" ON "success_stories_locales" USING btree ("logo_id","_locale");
  CREATE UNIQUE INDEX "success_stories_locales_locale_parent_id_unique" ON "success_stories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_success_stories_v_version_version_slug_idx" ON "_success_stories_v_locales" USING btree ("version_slug","_locale");
  CREATE INDEX "_success_stories_v_version_version_logo_idx" ON "_success_stories_v_locales" USING btree ("version_logo_id","_locale");
  CREATE UNIQUE INDEX "_success_stories_v_locales_locale_parent_id_unique" ON "_success_stories_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_locale_idx" ON "header_rels" USING btree ("locale");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id","locale");
  CREATE INDEX "header_rels_publications_id_idx" ON "header_rels" USING btree ("publications_id","locale");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_locale_idx" ON "footer_rels" USING btree ("locale");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id","locale");
  CREATE INDEX "footer_rels_publications_id_idx" ON "footer_rels" USING btree ("publications_id","locale");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_prose_locale_idx" ON "pages_blocks_prose" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_grid_items_locale_idx" ON "pages_blocks_feature_grid_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_feature_grid_locale_idx" ON "pages_blocks_feature_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_locale_idx" ON "pages_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_locale_idx" ON "_pages_v_blocks_hero" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_prose_locale_idx" ON "_pages_v_blocks_prose" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_locale_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_feature_grid_locale_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_locale_idx" ON "_pages_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "publications_rels_locale_idx" ON "publications_rels" USING btree ("locale");
  CREATE INDEX "_publications_v_snapshot_idx" ON "_publications_v" USING btree ("snapshot");
  CREATE INDEX "_publications_v_published_locale_idx" ON "_publications_v" USING btree ("published_locale");
  CREATE INDEX "_publications_v_rels_locale_idx" ON "_publications_v_rels" USING btree ("locale");
  CREATE INDEX "success_stories_proof_points_locale_idx" ON "success_stories_proof_points" USING btree ("_locale");
  CREATE INDEX "_success_stories_v_version_proof_points_locale_idx" ON "_success_stories_v_version_proof_points" USING btree ("_locale");
  CREATE INDEX "_success_stories_v_snapshot_idx" ON "_success_stories_v" USING btree ("snapshot");
  CREATE INDEX "_success_stories_v_published_locale_idx" ON "_success_stories_v" USING btree ("published_locale");
  CREATE INDEX "header_nav_items_locale_idx" ON "header_nav_items" USING btree ("_locale");
  CREATE INDEX "footer_nav_items_locale_idx" ON "footer_nav_items" USING btree ("_locale");
  CREATE INDEX "footer_legal_items_locale_idx" ON "footer_legal_items" USING btree ("_locale");
  CREATE INDEX "publications_rels_authors_id_idx" ON "publications_rels" USING btree ("authors_id","locale");
  CREATE INDEX "_publications_v_rels_authors_id_idx" ON "_publications_v_rels" USING btree ("authors_id","locale");

  -- Preserve existing content while moving formerly non-localized columns into
  -- Payload's locale tables. Existing marketing Pages are English; imported
  -- legacy Publications are German. Shared taxonomy/settings are copied to
  -- both locales so editors can refine them independently after migration.
  INSERT INTO "media_locales" ("alt", "caption", "_locale", "_parent_id")
    SELECT "alt", "caption", 'en', "id" FROM "media";
  INSERT INTO "pages_locales"
    ("title", "slug", "seo_title", "seo_description", "translation_complete", "_locale", "_parent_id")
    SELECT "title", "slug", "seo_title", "seo_description", true, 'en', "id" FROM "pages";
  INSERT INTO "_pages_v_locales"
    ("version_title", "version_slug", "version_seo_title", "version_seo_description", "version_translation_complete", "_locale", "_parent_id")
    SELECT "version_title", "version_slug", "version_seo_title", "version_seo_description", true, 'en', "id" FROM "_pages_v";
  INSERT INTO "authors_locales" ("role", "bio", "avatar_id", "_locale", "_parent_id")
    SELECT "role", "bio", "avatar_id", 'en', "id" FROM "authors";
  INSERT INTO "categories_locales" ("title", "slug", "_locale", "_parent_id")
    SELECT "title", "slug", 'en', "id" FROM "categories";
  INSERT INTO "categories_locales" ("title", "slug", "_locale", "_parent_id")
    SELECT "title", "slug", 'de', "id" FROM "categories";
  INSERT INTO "publications_locales"
    ("title", "slug", "excerpt", "reading_time", "category_id", "hero_image_id", "hero_image_url", "hero_image_alt", "body", "body_html", "seo_title", "seo_description", "translation_complete", "_locale", "_parent_id")
    SELECT "title", "slug", "excerpt", "reading_time", "category_id", "hero_image_id", "hero_image_url", "hero_image_alt", "body", "body_html", "seo_title", "seo_description", true, 'de', "id" FROM "publications";
  INSERT INTO "_publications_v_locales"
    ("version_title", "version_slug", "version_excerpt", "version_reading_time", "version_category_id", "version_hero_image_id", "version_hero_image_url", "version_hero_image_alt", "version_body", "version_body_html", "version_seo_title", "version_seo_description", "version_translation_complete", "_locale", "_parent_id")
    SELECT "version_title", "version_slug", "version_excerpt", "version_reading_time", "version_category_id", "version_hero_image_id", "version_hero_image_url", "version_hero_image_alt", "version_body", "version_body_html", "version_seo_title", "version_seo_description", true, 'de', "id" FROM "_publications_v";
  INSERT INTO "success_stories_locales"
    ("industry", "slug", "challenge", "action", "result", "logo_id", "_locale", "_parent_id")
    SELECT "industry", "slug", "challenge", "action", "result", "logo_id", 'en', "id" FROM "success_stories";
  INSERT INTO "_success_stories_v_locales"
    ("version_industry", "version_slug", "version_challenge", "version_action", "version_result", "version_logo_id", "_locale", "_parent_id")
    SELECT "version_industry", "version_slug", "version_challenge", "version_action", "version_result", "version_logo_id", 'en', "id" FROM "_success_stories_v";
  INSERT INTO "site_settings_locales"
    ("primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "announcement", "_locale", "_parent_id")
    SELECT "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "announcement", 'en', "id" FROM "site_settings";
  INSERT INTO "site_settings_locales"
    ("primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "announcement", "_locale", "_parent_id")
    SELECT 'Gespräch starten', '/gespraech', 'Plattform entdecken', '/plattform', "announcement", 'de', "id" FROM "site_settings";

  UPDATE "pages_blocks_hero"
    SET "primary_cta_type" = 'external', "primary_cta_url" = "primary_cta_href",
        "secondary_cta_type" = 'external', "secondary_cta_url" = "secondary_cta_href";
  UPDATE "pages_blocks_cta"
    SET "primary_cta_type" = 'external', "primary_cta_url" = "primary_cta_href",
        "secondary_cta_type" = 'external', "secondary_cta_url" = "secondary_cta_href";
  UPDATE "_pages_v_blocks_hero"
    SET "primary_cta_type" = 'external', "primary_cta_url" = "primary_cta_href",
        "secondary_cta_type" = 'external', "secondary_cta_url" = "secondary_cta_href";
  UPDATE "_pages_v_blocks_cta"
    SET "primary_cta_type" = 'external', "primary_cta_url" = "primary_cta_href",
        "secondary_cta_type" = 'external', "secondary_cta_url" = "secondary_cta_href";
  UPDATE "header_nav_items"
    SET "link_type" = 'external', "link_label" = "label", "link_url" = "href";
  UPDATE "footer_nav_items"
    SET "link_type" = 'external', "link_label" = "label", "link_url" = "href";
  UPDATE "footer_legal_items"
    SET "link_type" = 'external', "link_label" = "label", "link_url" = "href";
  UPDATE "publications_rels" SET "locale" = 'de' WHERE "locale" IS NULL;
  UPDATE "_publications_v_rels" SET "locale" = 'de' WHERE "locale" IS NULL;

  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "media" DROP COLUMN "caption";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "primary_cta_href";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_href";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "primary_cta_href";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "secondary_cta_href";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "slug";
  ALTER TABLE "pages" DROP COLUMN "seo_title";
  ALTER TABLE "pages" DROP COLUMN "seo_description";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "primary_cta_href";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "secondary_cta_href";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "primary_cta_href";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "secondary_cta_href";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_slug";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "authors" DROP COLUMN "role";
  ALTER TABLE "authors" DROP COLUMN "bio";
  ALTER TABLE "authors" DROP COLUMN "avatar_id";
  ALTER TABLE "categories" DROP COLUMN "title";
  ALTER TABLE "categories" DROP COLUMN "slug";
  ALTER TABLE "publications" DROP COLUMN "title";
  ALTER TABLE "publications" DROP COLUMN "slug";
  ALTER TABLE "publications" DROP COLUMN "excerpt";
  ALTER TABLE "publications" DROP COLUMN "reading_time";
  ALTER TABLE "publications" DROP COLUMN "category_id";
  ALTER TABLE "publications" DROP COLUMN "hero_image_id";
  ALTER TABLE "publications" DROP COLUMN "hero_image_url";
  ALTER TABLE "publications" DROP COLUMN "hero_image_alt";
  ALTER TABLE "publications" DROP COLUMN "body";
  ALTER TABLE "publications" DROP COLUMN "body_html";
  ALTER TABLE "publications" DROP COLUMN "seo_title";
  ALTER TABLE "publications" DROP COLUMN "seo_description";
  ALTER TABLE "_publications_v" DROP COLUMN "version_title";
  ALTER TABLE "_publications_v" DROP COLUMN "version_slug";
  ALTER TABLE "_publications_v" DROP COLUMN "version_excerpt";
  ALTER TABLE "_publications_v" DROP COLUMN "version_reading_time";
  ALTER TABLE "_publications_v" DROP COLUMN "version_category_id";
  ALTER TABLE "_publications_v" DROP COLUMN "version_hero_image_id";
  ALTER TABLE "_publications_v" DROP COLUMN "version_hero_image_url";
  ALTER TABLE "_publications_v" DROP COLUMN "version_hero_image_alt";
  ALTER TABLE "_publications_v" DROP COLUMN "version_body";
  ALTER TABLE "_publications_v" DROP COLUMN "version_body_html";
  ALTER TABLE "_publications_v" DROP COLUMN "version_seo_title";
  ALTER TABLE "_publications_v" DROP COLUMN "version_seo_description";
  ALTER TABLE "success_stories" DROP COLUMN "industry";
  ALTER TABLE "success_stories" DROP COLUMN "slug";
  ALTER TABLE "success_stories" DROP COLUMN "challenge";
  ALTER TABLE "success_stories" DROP COLUMN "action";
  ALTER TABLE "success_stories" DROP COLUMN "result";
  ALTER TABLE "success_stories" DROP COLUMN "logo_id";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_industry";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_slug";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_challenge";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_action";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_result";
  ALTER TABLE "_success_stories_v" DROP COLUMN "version_logo_id";
  ALTER TABLE "site_settings" DROP COLUMN "primary_cta_label";
  ALTER TABLE "site_settings" DROP COLUMN "primary_cta_href";
  ALTER TABLE "site_settings" DROP COLUMN "secondary_cta_label";
  ALTER TABLE "site_settings" DROP COLUMN "secondary_cta_href";
  ALTER TABLE "site_settings" DROP COLUMN "announcement";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "authors_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "publications_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_publications_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "success_stories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_success_stories_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "authors_locales" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "publications_locales" CASCADE;
  DROP TABLE "_publications_v_locales" CASCADE;
  DROP TABLE "success_stories_locales" CASCADE;
  DROP TABLE "_success_stories_v_locales" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP INDEX "pages_blocks_hero_locale_idx";
  DROP INDEX "pages_blocks_prose_locale_idx";
  DROP INDEX "pages_blocks_feature_grid_items_locale_idx";
  DROP INDEX "pages_blocks_feature_grid_locale_idx";
  DROP INDEX "pages_blocks_cta_locale_idx";
  DROP INDEX "_pages_v_blocks_hero_locale_idx";
  DROP INDEX "_pages_v_blocks_prose_locale_idx";
  DROP INDEX "_pages_v_blocks_feature_grid_items_locale_idx";
  DROP INDEX "_pages_v_blocks_feature_grid_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_locale_idx";
  DROP INDEX "_pages_v_snapshot_idx";
  DROP INDEX "_pages_v_published_locale_idx";
  DROP INDEX "publications_rels_locale_idx";
  DROP INDEX "_publications_v_snapshot_idx";
  DROP INDEX "_publications_v_published_locale_idx";
  DROP INDEX "_publications_v_rels_locale_idx";
  DROP INDEX "success_stories_proof_points_locale_idx";
  DROP INDEX "_success_stories_v_version_proof_points_locale_idx";
  DROP INDEX "_success_stories_v_snapshot_idx";
  DROP INDEX "_success_stories_v_published_locale_idx";
  DROP INDEX "header_nav_items_locale_idx";
  DROP INDEX "footer_nav_items_locale_idx";
  DROP INDEX "footer_legal_items_locale_idx";
  DROP INDEX "publications_rels_authors_id_idx";
  DROP INDEX "_publications_v_rels_authors_id_idx";
  ALTER TABLE "header_nav_items" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "footer_legal_items" ALTER COLUMN "href" SET NOT NULL;
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "media" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "primary_cta_href" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_href" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "primary_cta_href" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "secondary_cta_href" varchar;
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "slug" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "primary_cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "secondary_cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "primary_cta_href" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "secondary_cta_href" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "authors" ADD COLUMN "role" varchar;
  ALTER TABLE "authors" ADD COLUMN "bio" varchar;
  ALTER TABLE "authors" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "categories" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "publications" ADD COLUMN "title" varchar;
  ALTER TABLE "publications" ADD COLUMN "slug" varchar;
  ALTER TABLE "publications" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "publications" ADD COLUMN "reading_time" varchar;
  ALTER TABLE "publications" ADD COLUMN "category_id" integer;
  ALTER TABLE "publications" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "publications" ADD COLUMN "hero_image_url" varchar;
  ALTER TABLE "publications" ADD COLUMN "hero_image_alt" varchar;
  ALTER TABLE "publications" ADD COLUMN "body" jsonb;
  ALTER TABLE "publications" ADD COLUMN "body_html" varchar;
  ALTER TABLE "publications" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "publications" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_excerpt" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_reading_time" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_category_id" integer;
  ALTER TABLE "_publications_v" ADD COLUMN "version_hero_image_id" integer;
  ALTER TABLE "_publications_v" ADD COLUMN "version_hero_image_url" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_hero_image_alt" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_body" jsonb;
  ALTER TABLE "_publications_v" ADD COLUMN "version_body_html" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_seo_title" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_seo_description" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "industry" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "slug" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "challenge" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "action" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "result" varchar;
  ALTER TABLE "success_stories" ADD COLUMN "logo_id" integer;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_industry" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_challenge" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_action" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_result" varchar;
  ALTER TABLE "_success_stories_v" ADD COLUMN "version_logo_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "primary_cta_label" varchar DEFAULT 'Request a conversation';
  ALTER TABLE "site_settings" ADD COLUMN "primary_cta_href" varchar DEFAULT '/live-demo/kontakt';
  ALTER TABLE "site_settings" ADD COLUMN "secondary_cta_label" varchar DEFAULT 'Explore the platform';
  ALTER TABLE "site_settings" ADD COLUMN "secondary_cta_href" varchar DEFAULT '/platform';
  ALTER TABLE "site_settings" ADD COLUMN "announcement" varchar;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_success_stories_v" ADD CONSTRAINT "_success_stories_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "authors_avatar_idx" ON "authors" USING btree ("avatar_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE UNIQUE INDEX "publications_slug_idx" ON "publications" USING btree ("slug");
  CREATE INDEX "publications_category_idx" ON "publications" USING btree ("category_id");
  CREATE INDEX "publications_hero_image_idx" ON "publications" USING btree ("hero_image_id");
  CREATE INDEX "_publications_v_version_version_slug_idx" ON "_publications_v" USING btree ("version_slug");
  CREATE INDEX "_publications_v_version_version_category_idx" ON "_publications_v" USING btree ("version_category_id");
  CREATE INDEX "_publications_v_version_version_hero_image_idx" ON "_publications_v" USING btree ("version_hero_image_id");
  CREATE UNIQUE INDEX "success_stories_slug_idx" ON "success_stories" USING btree ("slug");
  CREATE INDEX "success_stories_logo_idx" ON "success_stories" USING btree ("logo_id");
  CREATE INDEX "_success_stories_v_version_version_slug_idx" ON "_success_stories_v" USING btree ("version_slug");
  CREATE INDEX "_success_stories_v_version_version_logo_idx" ON "_success_stories_v" USING btree ("version_logo_id");
  CREATE INDEX "publications_rels_authors_id_idx" ON "publications_rels" USING btree ("authors_id");
  CREATE INDEX "_publications_v_rels_authors_id_idx" ON "_publications_v_rels" USING btree ("authors_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "primary_cta_type";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "primary_cta_url";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "primary_cta_new_tab";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_type";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_url";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_new_tab";
  ALTER TABLE "pages_blocks_prose" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_feature_grid_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_feature_grid" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "primary_cta_type";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "primary_cta_url";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "primary_cta_new_tab";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "secondary_cta_type";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "secondary_cta_url";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "secondary_cta_new_tab";
  ALTER TABLE "pages" DROP COLUMN "page_type";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "primary_cta_type";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "primary_cta_url";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "primary_cta_new_tab";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "secondary_cta_type";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "secondary_cta_url";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "secondary_cta_new_tab";
  ALTER TABLE "_pages_v_blocks_prose" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_feature_grid_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_feature_grid" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "primary_cta_type";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "primary_cta_url";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "primary_cta_new_tab";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "secondary_cta_type";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "secondary_cta_url";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "secondary_cta_new_tab";
  ALTER TABLE "_pages_v" DROP COLUMN "version_page_type";
  ALTER TABLE "_pages_v" DROP COLUMN "snapshot";
  ALTER TABLE "_pages_v" DROP COLUMN "published_locale";
  ALTER TABLE "publications_rels" DROP COLUMN "locale";
  ALTER TABLE "_publications_v" DROP COLUMN "snapshot";
  ALTER TABLE "_publications_v" DROP COLUMN "published_locale";
  ALTER TABLE "_publications_v_rels" DROP COLUMN "locale";
  ALTER TABLE "success_stories_proof_points" DROP COLUMN "_locale";
  ALTER TABLE "_success_stories_v_version_proof_points" DROP COLUMN "_locale";
  ALTER TABLE "_success_stories_v" DROP COLUMN "snapshot";
  ALTER TABLE "_success_stories_v" DROP COLUMN "published_locale";
  ALTER TABLE "header_nav_items" DROP COLUMN "_locale";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_type";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_label";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_url";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_new_tab";
  ALTER TABLE "footer_nav_items" DROP COLUMN "_locale";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_type";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_label";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_url";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_new_tab";
  ALTER TABLE "footer_legal_items" DROP COLUMN "_locale";
  ALTER TABLE "footer_legal_items" DROP COLUMN "link_type";
  ALTER TABLE "footer_legal_items" DROP COLUMN "link_label";
  ALTER TABLE "footer_legal_items" DROP COLUMN "link_url";
  ALTER TABLE "footer_legal_items" DROP COLUMN "link_new_tab";
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_pages_blocks_hero_primary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_hero_secondary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_cta_primary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_cta_secondary_cta_type";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_primary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_secondary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_primary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_secondary_cta_type";
  DROP TYPE "public"."enum__pages_v_version_page_type";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum__publications_v_published_locale";
  DROP TYPE "public"."enum__success_stories_v_published_locale";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_footer_legal_items_link_type";`)
}
