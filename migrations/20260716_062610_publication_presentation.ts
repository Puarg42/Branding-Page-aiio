import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications" ADD COLUMN "reading_time" varchar;
  ALTER TABLE "publications" ADD COLUMN "hero_image_url" varchar;
  ALTER TABLE "publications" ADD COLUMN "hero_image_alt" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_reading_time" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_hero_image_url" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_hero_image_alt" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications" DROP COLUMN "reading_time";
  ALTER TABLE "publications" DROP COLUMN "hero_image_url";
  ALTER TABLE "publications" DROP COLUMN "hero_image_alt";
  ALTER TABLE "_publications_v" DROP COLUMN "version_reading_time";
  ALTER TABLE "_publications_v" DROP COLUMN "version_hero_image_url";
  ALTER TABLE "_publications_v" DROP COLUMN "version_hero_image_alt";`)
}
