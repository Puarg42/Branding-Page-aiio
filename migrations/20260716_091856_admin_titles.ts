import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "footer_legal_items" ALTER COLUMN "link_label" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "admin_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_admin_title" varchar;
  ALTER TABLE "publications" ADD COLUMN "admin_title" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_admin_title" varchar;
  UPDATE "pages" p SET "admin_title" = COALESCE(
    (SELECT l."title" FROM "pages_locales" l
      WHERE l."_parent_id" = p."id"
      ORDER BY CASE WHEN l."_locale" = 'en' THEN 0 ELSE 1 END LIMIT 1),
    p."source_key",
    'Page ' || p."id"
  );
  UPDATE "_pages_v" v SET "version_admin_title" = COALESCE(
    (SELECT l."version_title" FROM "_pages_v_locales" l
      WHERE l."_parent_id" = v."id"
      ORDER BY CASE WHEN l."_locale" = 'en' THEN 0 ELSE 1 END LIMIT 1),
    'Page version ' || v."id"
  );
  UPDATE "publications" p SET "admin_title" = COALESCE(
    (SELECT l."title" FROM "publications_locales" l
      WHERE l."_parent_id" = p."id"
      ORDER BY CASE WHEN l."_locale" = 'de' THEN 0 ELSE 1 END LIMIT 1),
    p."source_id",
    'Publication ' || p."id"
  );
  UPDATE "_publications_v" v SET "version_admin_title" = COALESCE(
    (SELECT l."version_title" FROM "_publications_v_locales" l
      WHERE l."_parent_id" = v."id"
      ORDER BY CASE WHEN l."_locale" = 'de' THEN 0 ELSE 1 END LIMIT 1),
    'Publication version ' || v."id"
  );
  CREATE INDEX "pages_admin_title_idx" ON "pages" USING btree ("admin_title");
  CREATE INDEX "_pages_v_version_version_admin_title_idx" ON "_pages_v" USING btree ("version_admin_title");
  CREATE INDEX "publications_admin_title_idx" ON "publications" USING btree ("admin_title");
  CREATE INDEX "_publications_v_version_version_admin_title_idx" ON "_publications_v" USING btree ("version_admin_title");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "pages_admin_title_idx";
  DROP INDEX "_pages_v_version_version_admin_title_idx";
  DROP INDEX "publications_admin_title_idx";
  DROP INDEX "_publications_v_version_version_admin_title_idx";
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "footer_legal_items" ALTER COLUMN "link_label" SET NOT NULL;
  ALTER TABLE "pages" DROP COLUMN "admin_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_admin_title";
  ALTER TABLE "publications" DROP COLUMN "admin_title";
  ALTER TABLE "_publications_v" DROP COLUMN "version_admin_title";`)
}
