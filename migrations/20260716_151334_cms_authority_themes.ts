import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_font_families_files_style" AS ENUM('normal', 'italic');
  CREATE TYPE "public"."enum_themes_motion_easing" AS ENUM('standard', 'expressive', 'linear');
  CREATE TYPE "public"."enum_themes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__themes_v_version_motion_easing" AS ENUM('standard', 'expressive', 'linear');
  CREATE TYPE "public"."enum__themes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__themes_v_published_locale" AS ENUM('en', 'de');
  CREATE TYPE "public"."enum_pages_blocks_hero_media_primary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_hero_media_secondary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_cards_kind" AS ENUM('standard', 'evidence', 'capability', 'resource');
  CREATE TYPE "public"."enum_pages_blocks_people_people_profile_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_awards_proof_items_source_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_link_list_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum_pages_blocks_brand_illustration_variant" AS ENUM('BC-001', 'BC-002', 'BC-005');
  CREATE TYPE "public"."enum_pages_migration_status" AS ENUM('pending', 'parity-review', 'complete');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_media_primary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_media_secondary_cta_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_cards_kind" AS ENUM('standard', 'evidence', 'capability', 'resource');
  CREATE TYPE "public"."enum__pages_v_blocks_people_people_profile_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_awards_proof_items_source_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_link_list_links_link_type" AS ENUM('internal', 'external');
  CREATE TYPE "public"."enum__pages_v_blocks_brand_illustration_variant" AS ENUM('BC-001', 'BC-002', 'BC-005');
  CREATE TYPE "public"."enum__pages_v_version_migration_status" AS ENUM('pending', 'parity-review', 'complete');
  CREATE TYPE "public"."enum_theory_publications_chapters_blocks_type" AS ENUM('paragraph', 'quote', 'model');
  CREATE TYPE "public"."enum_theory_publications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__theory_publications_v_version_chapters_blocks_type" AS ENUM('paragraph', 'quote', 'model');
  CREATE TYPE "public"."enum__theory_publications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__theory_publications_v_published_locale" AS ENUM('en', 'de');
  CREATE TABLE "font_families_files" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer NOT NULL,
  	"weight" varchar DEFAULT '400' NOT NULL,
  	"style" "enum_font_families_files_style" DEFAULT 'normal'
  );
  
  CREATE TABLE "font_families" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"css_family" varchar NOT NULL,
  	"fallback" varchar DEFAULT 'ui-sans-serif, system-ui, sans-serif' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "themes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"description" varchar,
  	"colors_paper" varchar,
  	"colors_paper2" varchar,
  	"colors_ink" varchar,
  	"colors_ink2" varchar,
  	"colors_rule" varchar,
  	"colors_canvas_dark" varchar,
  	"colors_on_dark" varchar,
  	"colors_accent" varchar,
  	"colors_accent_strong" varchar,
  	"colors_accent_ink" varchar,
  	"colors_focus" varchar,
  	"colors_success" varchar,
  	"colors_danger" varchar,
  	"colors_collector" varchar,
  	"colors_magnet" varchar,
  	"colors_forge" varchar,
  	"colors_dataforge" varchar,
  	"typography_display_id" integer,
  	"typography_body_id" integer,
  	"typography_mono_id" integer,
  	"typography_hero_scale" numeric DEFAULT 1,
  	"typography_body_scale" numeric DEFAULT 1,
  	"shape_radius_input" numeric DEFAULT 10,
  	"shape_radius_card" numeric DEFAULT 18,
  	"shape_radius_panel" numeric DEFAULT 28,
  	"shape_rule_width" numeric DEFAULT 1,
  	"motion_fast" numeric DEFAULT 180,
  	"motion_base" numeric DEFAULT 280,
  	"motion_slow" numeric DEFAULT 520,
  	"motion_easing" "enum_themes_motion_easing" DEFAULT 'standard',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_themes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_themes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_colors_paper" varchar,
  	"version_colors_paper2" varchar,
  	"version_colors_ink" varchar,
  	"version_colors_ink2" varchar,
  	"version_colors_rule" varchar,
  	"version_colors_canvas_dark" varchar,
  	"version_colors_on_dark" varchar,
  	"version_colors_accent" varchar,
  	"version_colors_accent_strong" varchar,
  	"version_colors_accent_ink" varchar,
  	"version_colors_focus" varchar,
  	"version_colors_success" varchar,
  	"version_colors_danger" varchar,
  	"version_colors_collector" varchar,
  	"version_colors_magnet" varchar,
  	"version_colors_forge" varchar,
  	"version_colors_dataforge" varchar,
  	"version_typography_display_id" integer,
  	"version_typography_body_id" integer,
  	"version_typography_mono_id" integer,
  	"version_typography_hero_scale" numeric DEFAULT 1,
  	"version_typography_body_scale" numeric DEFAULT 1,
  	"version_shape_radius_input" numeric DEFAULT 10,
  	"version_shape_radius_card" numeric DEFAULT 18,
  	"version_shape_radius_panel" numeric DEFAULT 28,
  	"version_shape_rule_width" numeric DEFAULT 1,
  	"version_motion_fast" numeric DEFAULT 180,
  	"version_motion_base" numeric DEFAULT 280,
  	"version_motion_slow" numeric DEFAULT 520,
  	"version_motion_easing" "enum__themes_v_version_motion_easing" DEFAULT 'standard',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__themes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__themes_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "pages_blocks_hero_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"media_id" integer,
  	"legacy_image_url" varchar,
  	"alt" varchar,
  	"primary_cta_type" "enum_pages_blocks_hero_media_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_label" varchar,
  	"primary_cta_url" varchar,
  	"primary_cta_new_tab" boolean DEFAULT false,
  	"secondary_cta_type" "enum_pages_blocks_hero_media_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_label" varchar,
  	"secondary_cta_url" varchar,
  	"secondary_cta_new_tab" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"copy" varchar,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"image_alt" varchar,
  	"link_type" "enum_pages_blocks_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"kind" "enum_pages_blocks_card_grid_cards_kind" DEFAULT 'standard'
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"copy" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_people_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"profile_link_type" "enum_pages_blocks_people_people_profile_link_type" DEFAULT 'internal',
  	"profile_link_label" varchar,
  	"profile_link_url" varchar,
  	"profile_link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_awards_proof_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"issuer" varchar,
  	"year" varchar,
  	"evidence" varchar,
  	"logo_id" integer,
  	"legacy_image_url" varchar,
  	"source_link_type" "enum_pages_blocks_awards_proof_items_source_link_type" DEFAULT 'internal',
  	"source_link_label" varchar,
  	"source_link_url" varchar,
  	"source_link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_awards_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_link_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_link_list_links_link_type" DEFAULT 'internal',
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_link_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_outcome_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"copy" varchar
  );
  
  CREATE TABLE "pages_blocks_outcome_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_related_pages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"anchor" varchar
  );
  
  CREATE TABLE "pages_blocks_section_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reality_check" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_category_evolution" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_capability_journey" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_trust_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_brand_illustration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"variant" "enum_pages_blocks_brand_illustration_variant" DEFAULT 'BC-002',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_theory_reader" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_success_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"media_id" integer,
  	"legacy_image_url" varchar,
  	"alt" varchar,
  	"primary_cta_type" "enum__pages_v_blocks_hero_media_primary_cta_type" DEFAULT 'internal',
  	"primary_cta_label" varchar,
  	"primary_cta_url" varchar,
  	"primary_cta_new_tab" boolean DEFAULT false,
  	"secondary_cta_type" "enum__pages_v_blocks_hero_media_secondary_cta_type" DEFAULT 'internal',
  	"secondary_cta_label" varchar,
  	"secondary_cta_url" varchar,
  	"secondary_cta_new_tab" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"copy" varchar,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"image_alt" varchar,
  	"link_type" "enum__pages_v_blocks_card_grid_cards_link_type" DEFAULT 'internal',
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"kind" "enum__pages_v_blocks_card_grid_cards_kind" DEFAULT 'standard',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"copy" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_people_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"profile_link_type" "enum__pages_v_blocks_people_people_profile_link_type" DEFAULT 'internal',
  	"profile_link_label" varchar,
  	"profile_link_url" varchar,
  	"profile_link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_awards_proof_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"issuer" varchar,
  	"year" varchar,
  	"evidence" varchar,
  	"logo_id" integer,
  	"legacy_image_url" varchar,
  	"source_link_type" "enum__pages_v_blocks_awards_proof_items_source_link_type" DEFAULT 'internal',
  	"source_link_label" varchar,
  	"source_link_url" varchar,
  	"source_link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_awards_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_link_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_link_list_links_link_type" DEFAULT 'internal',
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_link_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_outcome_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"copy" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_outcome_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_related_pages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reality_check" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_evolution" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_capability_journey" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_trust_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_brand_illustration" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"variant" "enum__pages_v_blocks_brand_illustration_variant" DEFAULT 'BC-002',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_theory_reader" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_success_stories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"copy" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "theory_publications_chapters_blocks_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "theory_publications_chapters_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_theory_publications_chapters_blocks_type",
  	"text" varchar
  );
  
  CREATE TABLE "theory_publications_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "theory_publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"admin_title" varchar,
  	"version" varchar,
  	"source_provenance" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_theory_publications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "theory_publications_locales" (
  	"title" varchar,
  	"edition" varchar,
  	"reading_time" varchar,
  	"translation_complete" boolean,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_theory_publications_v_version_chapters_blocks_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_publications_v_version_chapters_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__theory_publications_v_version_chapters_blocks_type",
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_publications_v_version_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_theory_publications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_admin_title" varchar,
  	"version_version" varchar,
  	"version_source_provenance" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__theory_publications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__theory_publications_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_theory_publications_v_locales" (
  	"version_title" varchar,
  	"version_edition" varchar,
  	"version_reading_time" varchar,
  	"version_translation_complete" boolean,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_settings_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"latest_heading" varchar,
  	"archive_heading" varchar,
  	"read_label" varchar,
  	"all_label" varchar,
  	"cta_heading" varchar,
  	"cta_copy" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "migration_status" "enum_pages_migration_status" DEFAULT 'pending';
  ALTER TABLE "pages" ADD COLUMN "migration_version" varchar;
  ALTER TABLE "pages" ADD COLUMN "source_hash" varchar;
  ALTER TABLE "pages" ADD COLUMN "legacy_source" varchar;
  ALTER TABLE "pages" ADD COLUMN "theme_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_migration_status" "enum__pages_v_version_migration_status" DEFAULT 'pending';
  ALTER TABLE "_pages_v" ADD COLUMN "version_migration_version" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_source_hash" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_legacy_source" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_theme_id" integer;
  ALTER TABLE "publications" ADD COLUMN "theme_id" integer;
  ALTER TABLE "_publications_v" ADD COLUMN "version_theme_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "font_families_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "themes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "theory_publications_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "default_theme_id" integer;
  ALTER TABLE "font_families_files" ADD CONSTRAINT "font_families_files_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "font_families_files" ADD CONSTRAINT "font_families_files_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."font_families"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "themes" ADD CONSTRAINT "themes_typography_display_id_font_families_id_fk" FOREIGN KEY ("typography_display_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "themes" ADD CONSTRAINT "themes_typography_body_id_font_families_id_fk" FOREIGN KEY ("typography_body_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "themes" ADD CONSTRAINT "themes_typography_mono_id_font_families_id_fk" FOREIGN KEY ("typography_mono_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_themes_v" ADD CONSTRAINT "_themes_v_parent_id_themes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_themes_v" ADD CONSTRAINT "_themes_v_version_typography_display_id_font_families_id_fk" FOREIGN KEY ("version_typography_display_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_themes_v" ADD CONSTRAINT "_themes_v_version_typography_body_id_font_families_id_fk" FOREIGN KEY ("version_typography_body_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_themes_v" ADD CONSTRAINT "_themes_v_version_typography_mono_id_font_families_id_fk" FOREIGN KEY ("version_typography_mono_id") REFERENCES "public"."font_families"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_media" ADD CONSTRAINT "pages_blocks_hero_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_media" ADD CONSTRAINT "pages_blocks_hero_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_milestones" ADD CONSTRAINT "pages_blocks_timeline_milestones_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_milestones" ADD CONSTRAINT "pages_blocks_timeline_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_people_people" ADD CONSTRAINT "pages_blocks_people_people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_people_people" ADD CONSTRAINT "pages_blocks_people_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_people" ADD CONSTRAINT "pages_blocks_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards_proof_items" ADD CONSTRAINT "pages_blocks_awards_proof_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards_proof_items" ADD CONSTRAINT "pages_blocks_awards_proof_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_awards_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_awards_proof" ADD CONSTRAINT "pages_blocks_awards_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_list_links" ADD CONSTRAINT "pages_blocks_link_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_link_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_list" ADD CONSTRAINT "pages_blocks_link_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcome_list_items" ADD CONSTRAINT "pages_blocks_outcome_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_outcome_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_outcome_list" ADD CONSTRAINT "pages_blocks_outcome_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_related_pages" ADD CONSTRAINT "pages_blocks_related_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_navigation_items" ADD CONSTRAINT "pages_blocks_section_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_section_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_navigation" ADD CONSTRAINT "pages_blocks_section_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reality_check" ADD CONSTRAINT "pages_blocks_reality_check_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_evolution" ADD CONSTRAINT "pages_blocks_category_evolution_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_capability_journey" ADD CONSTRAINT "pages_blocks_capability_journey_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_trust_logos" ADD CONSTRAINT "pages_blocks_trust_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_brand_illustration" ADD CONSTRAINT "pages_blocks_brand_illustration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_theory_reader" ADD CONSTRAINT "pages_blocks_theory_reader_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_success_stories" ADD CONSTRAINT "pages_blocks_success_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_media" ADD CONSTRAINT "_pages_v_blocks_hero_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_media" ADD CONSTRAINT "_pages_v_blocks_hero_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_milestones" ADD CONSTRAINT "_pages_v_blocks_timeline_milestones_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_milestones" ADD CONSTRAINT "_pages_v_blocks_timeline_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_people_people" ADD CONSTRAINT "_pages_v_blocks_people_people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_people_people" ADD CONSTRAINT "_pages_v_blocks_people_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_people" ADD CONSTRAINT "_pages_v_blocks_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards_proof_items" ADD CONSTRAINT "_pages_v_blocks_awards_proof_items_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards_proof_items" ADD CONSTRAINT "_pages_v_blocks_awards_proof_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_awards_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_awards_proof" ADD CONSTRAINT "_pages_v_blocks_awards_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_list_links" ADD CONSTRAINT "_pages_v_blocks_link_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_link_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_list" ADD CONSTRAINT "_pages_v_blocks_link_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcome_list_items" ADD CONSTRAINT "_pages_v_blocks_outcome_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_outcome_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_outcome_list" ADD CONSTRAINT "_pages_v_blocks_outcome_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_related_pages" ADD CONSTRAINT "_pages_v_blocks_related_pages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_navigation_items" ADD CONSTRAINT "_pages_v_blocks_section_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_section_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_navigation" ADD CONSTRAINT "_pages_v_blocks_section_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reality_check" ADD CONSTRAINT "_pages_v_blocks_reality_check_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_evolution" ADD CONSTRAINT "_pages_v_blocks_category_evolution_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_capability_journey" ADD CONSTRAINT "_pages_v_blocks_capability_journey_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_trust_logos" ADD CONSTRAINT "_pages_v_blocks_trust_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_brand_illustration" ADD CONSTRAINT "_pages_v_blocks_brand_illustration_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_theory_reader" ADD CONSTRAINT "_pages_v_blocks_theory_reader_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_success_stories" ADD CONSTRAINT "_pages_v_blocks_success_stories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_publications_chapters_blocks_lines" ADD CONSTRAINT "theory_publications_chapters_blocks_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_publications_chapters_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_publications_chapters_blocks" ADD CONSTRAINT "theory_publications_chapters_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_publications_chapters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_publications_chapters" ADD CONSTRAINT "theory_publications_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "theory_publications_locales" ADD CONSTRAINT "theory_publications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."theory_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_publications_v_version_chapters_blocks_lines" ADD CONSTRAINT "_theory_publications_v_version_chapters_blocks_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_publications_v_version_chapters_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_publications_v_version_chapters_blocks" ADD CONSTRAINT "_theory_publications_v_version_chapters_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_publications_v_version_chapters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_publications_v_version_chapters" ADD CONSTRAINT "_theory_publications_v_version_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_theory_publications_v" ADD CONSTRAINT "_theory_publications_v_parent_id_theory_publications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."theory_publications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_theory_publications_v_locales" ADD CONSTRAINT "_theory_publications_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_theory_publications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_settings_locales" ADD CONSTRAINT "blog_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "font_families_files_order_idx" ON "font_families_files" USING btree ("_order");
  CREATE INDEX "font_families_files_parent_id_idx" ON "font_families_files" USING btree ("_parent_id");
  CREATE INDEX "font_families_files_file_idx" ON "font_families_files" USING btree ("file_id");
  CREATE UNIQUE INDEX "font_families_name_idx" ON "font_families" USING btree ("name");
  CREATE INDEX "font_families_updated_at_idx" ON "font_families" USING btree ("updated_at");
  CREATE INDEX "font_families_created_at_idx" ON "font_families" USING btree ("created_at");
  CREATE UNIQUE INDEX "themes_slug_idx" ON "themes" USING btree ("slug");
  CREATE INDEX "themes_typography_typography_display_idx" ON "themes" USING btree ("typography_display_id");
  CREATE INDEX "themes_typography_typography_body_idx" ON "themes" USING btree ("typography_body_id");
  CREATE INDEX "themes_typography_typography_mono_idx" ON "themes" USING btree ("typography_mono_id");
  CREATE INDEX "themes_updated_at_idx" ON "themes" USING btree ("updated_at");
  CREATE INDEX "themes_created_at_idx" ON "themes" USING btree ("created_at");
  CREATE INDEX "themes__status_idx" ON "themes" USING btree ("_status");
  CREATE INDEX "_themes_v_parent_idx" ON "_themes_v" USING btree ("parent_id");
  CREATE INDEX "_themes_v_version_version_slug_idx" ON "_themes_v" USING btree ("version_slug");
  CREATE INDEX "_themes_v_version_typography_version_typography_display_idx" ON "_themes_v" USING btree ("version_typography_display_id");
  CREATE INDEX "_themes_v_version_typography_version_typography_body_idx" ON "_themes_v" USING btree ("version_typography_body_id");
  CREATE INDEX "_themes_v_version_typography_version_typography_mono_idx" ON "_themes_v" USING btree ("version_typography_mono_id");
  CREATE INDEX "_themes_v_version_version_updated_at_idx" ON "_themes_v" USING btree ("version_updated_at");
  CREATE INDEX "_themes_v_version_version_created_at_idx" ON "_themes_v" USING btree ("version_created_at");
  CREATE INDEX "_themes_v_version_version__status_idx" ON "_themes_v" USING btree ("version__status");
  CREATE INDEX "_themes_v_created_at_idx" ON "_themes_v" USING btree ("created_at");
  CREATE INDEX "_themes_v_updated_at_idx" ON "_themes_v" USING btree ("updated_at");
  CREATE INDEX "_themes_v_snapshot_idx" ON "_themes_v" USING btree ("snapshot");
  CREATE INDEX "_themes_v_published_locale_idx" ON "_themes_v" USING btree ("published_locale");
  CREATE INDEX "_themes_v_latest_idx" ON "_themes_v" USING btree ("latest");
  CREATE INDEX "_themes_v_autosave_idx" ON "_themes_v" USING btree ("autosave");
  CREATE INDEX "pages_blocks_hero_media_order_idx" ON "pages_blocks_hero_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_media_parent_id_idx" ON "pages_blocks_hero_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_media_path_idx" ON "pages_blocks_hero_media" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_media_locale_idx" ON "pages_blocks_hero_media" USING btree ("_locale");
  CREATE INDEX "pages_blocks_hero_media_media_idx" ON "pages_blocks_hero_media" USING btree ("media_id");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_locale_idx" ON "pages_blocks_card_grid_cards" USING btree ("_locale");
  CREATE INDEX "pages_blocks_card_grid_cards_image_idx" ON "pages_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_grid_locale_idx" ON "pages_blocks_card_grid" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX "pages_blocks_timeline_milestones_order_idx" ON "pages_blocks_timeline_milestones" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_milestones_parent_id_idx" ON "pages_blocks_timeline_milestones" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_milestones_locale_idx" ON "pages_blocks_timeline_milestones" USING btree ("_locale");
  CREATE INDEX "pages_blocks_timeline_milestones_media_idx" ON "pages_blocks_timeline_milestones" USING btree ("media_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_locale_idx" ON "pages_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "pages_blocks_people_people_order_idx" ON "pages_blocks_people_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_people_people_parent_id_idx" ON "pages_blocks_people_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_people_people_locale_idx" ON "pages_blocks_people_people" USING btree ("_locale");
  CREATE INDEX "pages_blocks_people_people_image_idx" ON "pages_blocks_people_people" USING btree ("image_id");
  CREATE INDEX "pages_blocks_people_order_idx" ON "pages_blocks_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_people_parent_id_idx" ON "pages_blocks_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_people_path_idx" ON "pages_blocks_people" USING btree ("_path");
  CREATE INDEX "pages_blocks_people_locale_idx" ON "pages_blocks_people" USING btree ("_locale");
  CREATE INDEX "pages_blocks_awards_proof_items_order_idx" ON "pages_blocks_awards_proof_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_awards_proof_items_parent_id_idx" ON "pages_blocks_awards_proof_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_awards_proof_items_locale_idx" ON "pages_blocks_awards_proof_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_awards_proof_items_logo_idx" ON "pages_blocks_awards_proof_items" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_awards_proof_order_idx" ON "pages_blocks_awards_proof" USING btree ("_order");
  CREATE INDEX "pages_blocks_awards_proof_parent_id_idx" ON "pages_blocks_awards_proof" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_awards_proof_path_idx" ON "pages_blocks_awards_proof" USING btree ("_path");
  CREATE INDEX "pages_blocks_awards_proof_locale_idx" ON "pages_blocks_awards_proof" USING btree ("_locale");
  CREATE INDEX "pages_blocks_link_list_links_order_idx" ON "pages_blocks_link_list_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_list_links_parent_id_idx" ON "pages_blocks_link_list_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_list_links_locale_idx" ON "pages_blocks_link_list_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_link_list_order_idx" ON "pages_blocks_link_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_list_parent_id_idx" ON "pages_blocks_link_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_list_path_idx" ON "pages_blocks_link_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_link_list_locale_idx" ON "pages_blocks_link_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_outcome_list_items_order_idx" ON "pages_blocks_outcome_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_outcome_list_items_parent_id_idx" ON "pages_blocks_outcome_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outcome_list_items_locale_idx" ON "pages_blocks_outcome_list_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_outcome_list_order_idx" ON "pages_blocks_outcome_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_outcome_list_parent_id_idx" ON "pages_blocks_outcome_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_outcome_list_path_idx" ON "pages_blocks_outcome_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_outcome_list_locale_idx" ON "pages_blocks_outcome_list" USING btree ("_locale");
  CREATE INDEX "pages_blocks_related_pages_order_idx" ON "pages_blocks_related_pages" USING btree ("_order");
  CREATE INDEX "pages_blocks_related_pages_parent_id_idx" ON "pages_blocks_related_pages" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_related_pages_path_idx" ON "pages_blocks_related_pages" USING btree ("_path");
  CREATE INDEX "pages_blocks_related_pages_locale_idx" ON "pages_blocks_related_pages" USING btree ("_locale");
  CREATE INDEX "pages_blocks_section_navigation_items_order_idx" ON "pages_blocks_section_navigation_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_navigation_items_parent_id_idx" ON "pages_blocks_section_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_navigation_items_locale_idx" ON "pages_blocks_section_navigation_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_section_navigation_order_idx" ON "pages_blocks_section_navigation" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_navigation_parent_id_idx" ON "pages_blocks_section_navigation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_navigation_path_idx" ON "pages_blocks_section_navigation" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_navigation_locale_idx" ON "pages_blocks_section_navigation" USING btree ("_locale");
  CREATE INDEX "pages_blocks_reality_check_order_idx" ON "pages_blocks_reality_check" USING btree ("_order");
  CREATE INDEX "pages_blocks_reality_check_parent_id_idx" ON "pages_blocks_reality_check" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reality_check_path_idx" ON "pages_blocks_reality_check" USING btree ("_path");
  CREATE INDEX "pages_blocks_reality_check_locale_idx" ON "pages_blocks_reality_check" USING btree ("_locale");
  CREATE INDEX "pages_blocks_category_evolution_order_idx" ON "pages_blocks_category_evolution" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_evolution_parent_id_idx" ON "pages_blocks_category_evolution" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_evolution_path_idx" ON "pages_blocks_category_evolution" USING btree ("_path");
  CREATE INDEX "pages_blocks_category_evolution_locale_idx" ON "pages_blocks_category_evolution" USING btree ("_locale");
  CREATE INDEX "pages_blocks_capability_journey_order_idx" ON "pages_blocks_capability_journey" USING btree ("_order");
  CREATE INDEX "pages_blocks_capability_journey_parent_id_idx" ON "pages_blocks_capability_journey" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_capability_journey_path_idx" ON "pages_blocks_capability_journey" USING btree ("_path");
  CREATE INDEX "pages_blocks_capability_journey_locale_idx" ON "pages_blocks_capability_journey" USING btree ("_locale");
  CREATE INDEX "pages_blocks_trust_logos_order_idx" ON "pages_blocks_trust_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_trust_logos_parent_id_idx" ON "pages_blocks_trust_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_trust_logos_path_idx" ON "pages_blocks_trust_logos" USING btree ("_path");
  CREATE INDEX "pages_blocks_trust_logos_locale_idx" ON "pages_blocks_trust_logos" USING btree ("_locale");
  CREATE INDEX "pages_blocks_brand_illustration_order_idx" ON "pages_blocks_brand_illustration" USING btree ("_order");
  CREATE INDEX "pages_blocks_brand_illustration_parent_id_idx" ON "pages_blocks_brand_illustration" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_brand_illustration_path_idx" ON "pages_blocks_brand_illustration" USING btree ("_path");
  CREATE INDEX "pages_blocks_brand_illustration_locale_idx" ON "pages_blocks_brand_illustration" USING btree ("_locale");
  CREATE INDEX "pages_blocks_theory_reader_order_idx" ON "pages_blocks_theory_reader" USING btree ("_order");
  CREATE INDEX "pages_blocks_theory_reader_parent_id_idx" ON "pages_blocks_theory_reader" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_theory_reader_path_idx" ON "pages_blocks_theory_reader" USING btree ("_path");
  CREATE INDEX "pages_blocks_theory_reader_locale_idx" ON "pages_blocks_theory_reader" USING btree ("_locale");
  CREATE INDEX "pages_blocks_success_stories_order_idx" ON "pages_blocks_success_stories" USING btree ("_order");
  CREATE INDEX "pages_blocks_success_stories_parent_id_idx" ON "pages_blocks_success_stories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_success_stories_path_idx" ON "pages_blocks_success_stories" USING btree ("_path");
  CREATE INDEX "pages_blocks_success_stories_locale_idx" ON "pages_blocks_success_stories" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_media_order_idx" ON "_pages_v_blocks_hero_media" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_media_parent_id_idx" ON "_pages_v_blocks_hero_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_media_path_idx" ON "_pages_v_blocks_hero_media" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_media_locale_idx" ON "_pages_v_blocks_hero_media" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_hero_media_media_idx" ON "_pages_v_blocks_hero_media" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_locale_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_image_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_grid_locale_idx" ON "_pages_v_blocks_card_grid" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_locale_idx" ON "_pages_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_timeline_milestones_order_idx" ON "_pages_v_blocks_timeline_milestones" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_milestones_parent_id_idx" ON "_pages_v_blocks_timeline_milestones" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_milestones_locale_idx" ON "_pages_v_blocks_timeline_milestones" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_timeline_milestones_media_idx" ON "_pages_v_blocks_timeline_milestones" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_locale_idx" ON "_pages_v_blocks_timeline" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_people_people_order_idx" ON "_pages_v_blocks_people_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_people_people_parent_id_idx" ON "_pages_v_blocks_people_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_people_people_locale_idx" ON "_pages_v_blocks_people_people" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_people_people_image_idx" ON "_pages_v_blocks_people_people" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_people_order_idx" ON "_pages_v_blocks_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_people_parent_id_idx" ON "_pages_v_blocks_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_people_path_idx" ON "_pages_v_blocks_people" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_people_locale_idx" ON "_pages_v_blocks_people" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_awards_proof_items_order_idx" ON "_pages_v_blocks_awards_proof_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_awards_proof_items_parent_id_idx" ON "_pages_v_blocks_awards_proof_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_awards_proof_items_locale_idx" ON "_pages_v_blocks_awards_proof_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_awards_proof_items_logo_idx" ON "_pages_v_blocks_awards_proof_items" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_awards_proof_order_idx" ON "_pages_v_blocks_awards_proof" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_awards_proof_parent_id_idx" ON "_pages_v_blocks_awards_proof" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_awards_proof_path_idx" ON "_pages_v_blocks_awards_proof" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_awards_proof_locale_idx" ON "_pages_v_blocks_awards_proof" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_link_list_links_order_idx" ON "_pages_v_blocks_link_list_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_link_list_links_parent_id_idx" ON "_pages_v_blocks_link_list_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_link_list_links_locale_idx" ON "_pages_v_blocks_link_list_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_link_list_order_idx" ON "_pages_v_blocks_link_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_link_list_parent_id_idx" ON "_pages_v_blocks_link_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_link_list_path_idx" ON "_pages_v_blocks_link_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_link_list_locale_idx" ON "_pages_v_blocks_link_list" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_outcome_list_items_order_idx" ON "_pages_v_blocks_outcome_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_outcome_list_items_parent_id_idx" ON "_pages_v_blocks_outcome_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_outcome_list_items_locale_idx" ON "_pages_v_blocks_outcome_list_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_outcome_list_order_idx" ON "_pages_v_blocks_outcome_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_outcome_list_parent_id_idx" ON "_pages_v_blocks_outcome_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_outcome_list_path_idx" ON "_pages_v_blocks_outcome_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_outcome_list_locale_idx" ON "_pages_v_blocks_outcome_list" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_related_pages_order_idx" ON "_pages_v_blocks_related_pages" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_related_pages_parent_id_idx" ON "_pages_v_blocks_related_pages" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_related_pages_path_idx" ON "_pages_v_blocks_related_pages" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_related_pages_locale_idx" ON "_pages_v_blocks_related_pages" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_section_navigation_items_order_idx" ON "_pages_v_blocks_section_navigation_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_navigation_items_parent_id_idx" ON "_pages_v_blocks_section_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_navigation_items_locale_idx" ON "_pages_v_blocks_section_navigation_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_section_navigation_order_idx" ON "_pages_v_blocks_section_navigation" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_navigation_parent_id_idx" ON "_pages_v_blocks_section_navigation" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_navigation_path_idx" ON "_pages_v_blocks_section_navigation" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_section_navigation_locale_idx" ON "_pages_v_blocks_section_navigation" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_reality_check_order_idx" ON "_pages_v_blocks_reality_check" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reality_check_parent_id_idx" ON "_pages_v_blocks_reality_check" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reality_check_path_idx" ON "_pages_v_blocks_reality_check" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reality_check_locale_idx" ON "_pages_v_blocks_reality_check" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_category_evolution_order_idx" ON "_pages_v_blocks_category_evolution" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_evolution_parent_id_idx" ON "_pages_v_blocks_category_evolution" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_evolution_path_idx" ON "_pages_v_blocks_category_evolution" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_category_evolution_locale_idx" ON "_pages_v_blocks_category_evolution" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_capability_journey_order_idx" ON "_pages_v_blocks_capability_journey" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_capability_journey_parent_id_idx" ON "_pages_v_blocks_capability_journey" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_capability_journey_path_idx" ON "_pages_v_blocks_capability_journey" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_capability_journey_locale_idx" ON "_pages_v_blocks_capability_journey" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_trust_logos_order_idx" ON "_pages_v_blocks_trust_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_trust_logos_parent_id_idx" ON "_pages_v_blocks_trust_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_trust_logos_path_idx" ON "_pages_v_blocks_trust_logos" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_trust_logos_locale_idx" ON "_pages_v_blocks_trust_logos" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_brand_illustration_order_idx" ON "_pages_v_blocks_brand_illustration" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_brand_illustration_parent_id_idx" ON "_pages_v_blocks_brand_illustration" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_brand_illustration_path_idx" ON "_pages_v_blocks_brand_illustration" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_brand_illustration_locale_idx" ON "_pages_v_blocks_brand_illustration" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_theory_reader_order_idx" ON "_pages_v_blocks_theory_reader" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_theory_reader_parent_id_idx" ON "_pages_v_blocks_theory_reader" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_theory_reader_path_idx" ON "_pages_v_blocks_theory_reader" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_theory_reader_locale_idx" ON "_pages_v_blocks_theory_reader" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_success_stories_order_idx" ON "_pages_v_blocks_success_stories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_success_stories_parent_id_idx" ON "_pages_v_blocks_success_stories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_success_stories_path_idx" ON "_pages_v_blocks_success_stories" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_success_stories_locale_idx" ON "_pages_v_blocks_success_stories" USING btree ("_locale");
  CREATE INDEX "theory_publications_chapters_blocks_lines_order_idx" ON "theory_publications_chapters_blocks_lines" USING btree ("_order");
  CREATE INDEX "theory_publications_chapters_blocks_lines_parent_id_idx" ON "theory_publications_chapters_blocks_lines" USING btree ("_parent_id");
  CREATE INDEX "theory_publications_chapters_blocks_lines_locale_idx" ON "theory_publications_chapters_blocks_lines" USING btree ("_locale");
  CREATE INDEX "theory_publications_chapters_blocks_order_idx" ON "theory_publications_chapters_blocks" USING btree ("_order");
  CREATE INDEX "theory_publications_chapters_blocks_parent_id_idx" ON "theory_publications_chapters_blocks" USING btree ("_parent_id");
  CREATE INDEX "theory_publications_chapters_blocks_locale_idx" ON "theory_publications_chapters_blocks" USING btree ("_locale");
  CREATE INDEX "theory_publications_chapters_order_idx" ON "theory_publications_chapters" USING btree ("_order");
  CREATE INDEX "theory_publications_chapters_parent_id_idx" ON "theory_publications_chapters" USING btree ("_parent_id");
  CREATE INDEX "theory_publications_chapters_locale_idx" ON "theory_publications_chapters" USING btree ("_locale");
  CREATE INDEX "theory_publications_updated_at_idx" ON "theory_publications" USING btree ("updated_at");
  CREATE INDEX "theory_publications_created_at_idx" ON "theory_publications" USING btree ("created_at");
  CREATE INDEX "theory_publications__status_idx" ON "theory_publications" USING btree ("_status");
  CREATE UNIQUE INDEX "theory_publications_locales_locale_parent_id_unique" ON "theory_publications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_theory_publications_v_version_chapters_blocks_lines_order_idx" ON "_theory_publications_v_version_chapters_blocks_lines" USING btree ("_order");
  CREATE INDEX "_theory_publications_v_version_chapters_blocks_lines_parent_id_idx" ON "_theory_publications_v_version_chapters_blocks_lines" USING btree ("_parent_id");
  CREATE INDEX "_theory_publications_v_version_chapters_blocks_lines_locale_idx" ON "_theory_publications_v_version_chapters_blocks_lines" USING btree ("_locale");
  CREATE INDEX "_theory_publications_v_version_chapters_blocks_order_idx" ON "_theory_publications_v_version_chapters_blocks" USING btree ("_order");
  CREATE INDEX "_theory_publications_v_version_chapters_blocks_parent_id_idx" ON "_theory_publications_v_version_chapters_blocks" USING btree ("_parent_id");
  CREATE INDEX "_theory_publications_v_version_chapters_blocks_locale_idx" ON "_theory_publications_v_version_chapters_blocks" USING btree ("_locale");
  CREATE INDEX "_theory_publications_v_version_chapters_order_idx" ON "_theory_publications_v_version_chapters" USING btree ("_order");
  CREATE INDEX "_theory_publications_v_version_chapters_parent_id_idx" ON "_theory_publications_v_version_chapters" USING btree ("_parent_id");
  CREATE INDEX "_theory_publications_v_version_chapters_locale_idx" ON "_theory_publications_v_version_chapters" USING btree ("_locale");
  CREATE INDEX "_theory_publications_v_parent_idx" ON "_theory_publications_v" USING btree ("parent_id");
  CREATE INDEX "_theory_publications_v_version_version_updated_at_idx" ON "_theory_publications_v" USING btree ("version_updated_at");
  CREATE INDEX "_theory_publications_v_version_version_created_at_idx" ON "_theory_publications_v" USING btree ("version_created_at");
  CREATE INDEX "_theory_publications_v_version_version__status_idx" ON "_theory_publications_v" USING btree ("version__status");
  CREATE INDEX "_theory_publications_v_created_at_idx" ON "_theory_publications_v" USING btree ("created_at");
  CREATE INDEX "_theory_publications_v_updated_at_idx" ON "_theory_publications_v" USING btree ("updated_at");
  CREATE INDEX "_theory_publications_v_snapshot_idx" ON "_theory_publications_v" USING btree ("snapshot");
  CREATE INDEX "_theory_publications_v_published_locale_idx" ON "_theory_publications_v" USING btree ("published_locale");
  CREATE INDEX "_theory_publications_v_latest_idx" ON "_theory_publications_v" USING btree ("latest");
  CREATE INDEX "_theory_publications_v_autosave_idx" ON "_theory_publications_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_theory_publications_v_locales_locale_parent_id_unique" ON "_theory_publications_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_settings_locales_locale_parent_id_unique" ON "blog_settings_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_theme_id_themes_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_theme_id_themes_id_fk" FOREIGN KEY ("version_theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_theme_id_themes_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_publications_v" ADD CONSTRAINT "_publications_v_version_theme_id_themes_id_fk" FOREIGN KEY ("version_theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_font_families_fk" FOREIGN KEY ("font_families_id") REFERENCES "public"."font_families"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_themes_fk" FOREIGN KEY ("themes_id") REFERENCES "public"."themes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_theory_publications_fk" FOREIGN KEY ("theory_publications_id") REFERENCES "public"."theory_publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_theme_id_themes_id_fk" FOREIGN KEY ("default_theme_id") REFERENCES "public"."themes"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_migration_status_idx" ON "pages" USING btree ("migration_status");
  CREATE INDEX "pages_theme_idx" ON "pages" USING btree ("theme_id");
  CREATE INDEX "_pages_v_version_version_migration_status_idx" ON "_pages_v" USING btree ("version_migration_status");
  CREATE INDEX "_pages_v_version_version_theme_idx" ON "_pages_v" USING btree ("version_theme_id");
  CREATE INDEX "publications_theme_idx" ON "publications" USING btree ("theme_id");
  CREATE INDEX "_publications_v_version_version_theme_idx" ON "_publications_v" USING btree ("version_theme_id");
  CREATE INDEX "payload_locked_documents_rels_font_families_id_idx" ON "payload_locked_documents_rels" USING btree ("font_families_id");
  CREATE INDEX "payload_locked_documents_rels_themes_id_idx" ON "payload_locked_documents_rels" USING btree ("themes_id");
  CREATE INDEX "payload_locked_documents_rels_theory_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("theory_publications_id");
  CREATE INDEX "site_settings_default_theme_idx" ON "site_settings" USING btree ("default_theme_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "font_families_files" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "font_families" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "themes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_themes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_card_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline_milestones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_people_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_awards_proof_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_awards_proof" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_link_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_link_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_outcome_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_outcome_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_related_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_section_navigation_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_section_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_reality_check" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_category_evolution" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_capability_journey" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_trust_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_brand_illustration" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_theory_reader" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_success_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_card_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline_milestones" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_people_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_awards_proof_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_awards_proof" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_link_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_link_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_outcome_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_outcome_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_related_pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_section_navigation_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_section_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_reality_check" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_category_evolution" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_capability_journey" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_trust_logos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_brand_illustration" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_theory_reader" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_success_stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "theory_publications_chapters_blocks_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "theory_publications_chapters_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "theory_publications_chapters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "theory_publications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "theory_publications_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_publications_v_version_chapters_blocks_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_publications_v_version_chapters_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_publications_v_version_chapters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_publications_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_theory_publications_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_settings_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "font_families_files" CASCADE;
  DROP TABLE "font_families" CASCADE;
  DROP TABLE "themes" CASCADE;
  DROP TABLE "_themes_v" CASCADE;
  DROP TABLE "pages_blocks_hero_media" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_timeline_milestones" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_people_people" CASCADE;
  DROP TABLE "pages_blocks_people" CASCADE;
  DROP TABLE "pages_blocks_awards_proof_items" CASCADE;
  DROP TABLE "pages_blocks_awards_proof" CASCADE;
  DROP TABLE "pages_blocks_link_list_links" CASCADE;
  DROP TABLE "pages_blocks_link_list" CASCADE;
  DROP TABLE "pages_blocks_outcome_list_items" CASCADE;
  DROP TABLE "pages_blocks_outcome_list" CASCADE;
  DROP TABLE "pages_blocks_related_pages" CASCADE;
  DROP TABLE "pages_blocks_section_navigation_items" CASCADE;
  DROP TABLE "pages_blocks_section_navigation" CASCADE;
  DROP TABLE "pages_blocks_reality_check" CASCADE;
  DROP TABLE "pages_blocks_category_evolution" CASCADE;
  DROP TABLE "pages_blocks_capability_journey" CASCADE;
  DROP TABLE "pages_blocks_trust_logos" CASCADE;
  DROP TABLE "pages_blocks_brand_illustration" CASCADE;
  DROP TABLE "pages_blocks_theory_reader" CASCADE;
  DROP TABLE "pages_blocks_success_stories" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_media" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_milestones" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_people_people" CASCADE;
  DROP TABLE "_pages_v_blocks_people" CASCADE;
  DROP TABLE "_pages_v_blocks_awards_proof_items" CASCADE;
  DROP TABLE "_pages_v_blocks_awards_proof" CASCADE;
  DROP TABLE "_pages_v_blocks_link_list_links" CASCADE;
  DROP TABLE "_pages_v_blocks_link_list" CASCADE;
  DROP TABLE "_pages_v_blocks_outcome_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_outcome_list" CASCADE;
  DROP TABLE "_pages_v_blocks_related_pages" CASCADE;
  DROP TABLE "_pages_v_blocks_section_navigation_items" CASCADE;
  DROP TABLE "_pages_v_blocks_section_navigation" CASCADE;
  DROP TABLE "_pages_v_blocks_reality_check" CASCADE;
  DROP TABLE "_pages_v_blocks_category_evolution" CASCADE;
  DROP TABLE "_pages_v_blocks_capability_journey" CASCADE;
  DROP TABLE "_pages_v_blocks_trust_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_brand_illustration" CASCADE;
  DROP TABLE "_pages_v_blocks_theory_reader" CASCADE;
  DROP TABLE "_pages_v_blocks_success_stories" CASCADE;
  DROP TABLE "theory_publications_chapters_blocks_lines" CASCADE;
  DROP TABLE "theory_publications_chapters_blocks" CASCADE;
  DROP TABLE "theory_publications_chapters" CASCADE;
  DROP TABLE "theory_publications" CASCADE;
  DROP TABLE "theory_publications_locales" CASCADE;
  DROP TABLE "_theory_publications_v_version_chapters_blocks_lines" CASCADE;
  DROP TABLE "_theory_publications_v_version_chapters_blocks" CASCADE;
  DROP TABLE "_theory_publications_v_version_chapters" CASCADE;
  DROP TABLE "_theory_publications_v" CASCADE;
  DROP TABLE "_theory_publications_v_locales" CASCADE;
  DROP TABLE "blog_settings" CASCADE;
  DROP TABLE "blog_settings_locales" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_theme_id_themes_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_theme_id_themes_id_fk";
  
  ALTER TABLE "publications" DROP CONSTRAINT "publications_theme_id_themes_id_fk";
  
  ALTER TABLE "_publications_v" DROP CONSTRAINT "_publications_v_version_theme_id_themes_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_font_families_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_themes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_theory_publications_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_default_theme_id_themes_id_fk";
  
  DROP INDEX "pages_migration_status_idx";
  DROP INDEX "pages_theme_idx";
  DROP INDEX "_pages_v_version_version_migration_status_idx";
  DROP INDEX "_pages_v_version_version_theme_idx";
  DROP INDEX "publications_theme_idx";
  DROP INDEX "_publications_v_version_version_theme_idx";
  DROP INDEX "payload_locked_documents_rels_font_families_id_idx";
  DROP INDEX "payload_locked_documents_rels_themes_id_idx";
  DROP INDEX "payload_locked_documents_rels_theory_publications_id_idx";
  DROP INDEX "site_settings_default_theme_idx";
  ALTER TABLE "pages" DROP COLUMN "migration_status";
  ALTER TABLE "pages" DROP COLUMN "migration_version";
  ALTER TABLE "pages" DROP COLUMN "source_hash";
  ALTER TABLE "pages" DROP COLUMN "legacy_source";
  ALTER TABLE "pages" DROP COLUMN "theme_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_migration_status";
  ALTER TABLE "_pages_v" DROP COLUMN "version_migration_version";
  ALTER TABLE "_pages_v" DROP COLUMN "version_source_hash";
  ALTER TABLE "_pages_v" DROP COLUMN "version_legacy_source";
  ALTER TABLE "_pages_v" DROP COLUMN "version_theme_id";
  ALTER TABLE "publications" DROP COLUMN "theme_id";
  ALTER TABLE "_publications_v" DROP COLUMN "version_theme_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "font_families_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "themes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "theory_publications_id";
  ALTER TABLE "site_settings" DROP COLUMN "default_theme_id";
  DROP TYPE "public"."enum_font_families_files_style";
  DROP TYPE "public"."enum_themes_motion_easing";
  DROP TYPE "public"."enum_themes_status";
  DROP TYPE "public"."enum__themes_v_version_motion_easing";
  DROP TYPE "public"."enum__themes_v_version_status";
  DROP TYPE "public"."enum__themes_v_published_locale";
  DROP TYPE "public"."enum_pages_blocks_hero_media_primary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_hero_media_secondary_cta_type";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum_pages_blocks_card_grid_cards_kind";
  DROP TYPE "public"."enum_pages_blocks_people_people_profile_link_type";
  DROP TYPE "public"."enum_pages_blocks_awards_proof_items_source_link_type";
  DROP TYPE "public"."enum_pages_blocks_link_list_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_brand_illustration_variant";
  DROP TYPE "public"."enum_pages_migration_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_media_primary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_media_secondary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_cards_kind";
  DROP TYPE "public"."enum__pages_v_blocks_people_people_profile_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_awards_proof_items_source_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_link_list_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_brand_illustration_variant";
  DROP TYPE "public"."enum__pages_v_version_migration_status";
  DROP TYPE "public"."enum_theory_publications_chapters_blocks_type";
  DROP TYPE "public"."enum_theory_publications_status";
  DROP TYPE "public"."enum__theory_publications_v_version_chapters_blocks_type";
  DROP TYPE "public"."enum__theory_publications_v_version_status";
  DROP TYPE "public"."enum__theory_publications_v_published_locale";`)
}
