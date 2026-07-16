import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_module" CASCADE;
  DROP TABLE "_pages_v_blocks_module" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_module_module";
  DROP TYPE "public"."enum_pages_blocks_module_illustration_variant";
  DROP TYPE "public"."enum__pages_v_blocks_module_module";
  DROP TYPE "public"."enum__pages_v_blocks_module_illustration_variant";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_module_module" AS ENUM('realityCheck', 'categoryEvolution', 'capabilityJourney', 'trustLogos', 'brandIllustration', 'theoryReader', 'successStories');
  CREATE TYPE "public"."enum_pages_blocks_module_illustration_variant" AS ENUM('BC-001', 'BC-002', 'BC-005');
  CREATE TYPE "public"."enum__pages_v_blocks_module_module" AS ENUM('realityCheck', 'categoryEvolution', 'capabilityJourney', 'trustLogos', 'brandIllustration', 'theoryReader', 'successStories');
  CREATE TYPE "public"."enum__pages_v_blocks_module_illustration_variant" AS ENUM('BC-001', 'BC-002', 'BC-005');
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
  
  ALTER TABLE "pages_blocks_module" ADD CONSTRAINT "pages_blocks_module_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_module" ADD CONSTRAINT "_pages_v_blocks_module_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_module_order_idx" ON "pages_blocks_module" USING btree ("_order");
  CREATE INDEX "pages_blocks_module_parent_id_idx" ON "pages_blocks_module" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_module_path_idx" ON "pages_blocks_module" USING btree ("_path");
  CREATE INDEX "pages_blocks_module_locale_idx" ON "pages_blocks_module" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_module_order_idx" ON "_pages_v_blocks_module" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_module_parent_id_idx" ON "_pages_v_blocks_module" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_module_path_idx" ON "_pages_v_blocks_module" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_module_locale_idx" ON "_pages_v_blocks_module" USING btree ("_locale");`)
}
