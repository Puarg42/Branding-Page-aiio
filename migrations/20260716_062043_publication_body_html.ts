import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications" ADD COLUMN "body_html" varchar;
  ALTER TABLE "_publications_v" ADD COLUMN "version_body_html" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "publications" DROP COLUMN "body_html";
  ALTER TABLE "_publications_v" DROP COLUMN "version_body_html";`)
}
