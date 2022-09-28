import { MigrationInterface, QueryRunner } from "typeorm"

export class initialDb1664358431611 implements MigrationInterface {
  name = 'initialDb1664358431611'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "renga" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "status" integer NOT NULL DEFAULT '0', "options" jsonb, "owner" character varying NOT NULL, CONSTRAINT "PK_bbe829d1f07636846967fd313c4" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TYPE "public"."verse_season_enum" AS ENUM('0', '1', '2', '3', '4')`)
    await queryRunner.query(`CREATE TYPE "public"."verse_format_enum" AS ENUM('2', '3')`)
    await queryRunner.query(`CREATE TABLE "verse" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "renga_id" character varying NOT NULL, "renga_part" integer NOT NULL DEFAULT '0', "number" integer NOT NULL, "description" character varying, "season" "public"."verse_season_enum" NOT NULL DEFAULT '0', "format" "public"."verse_format_enum" NOT NULL DEFAULT '3', "topics" jsonb, "line1" character varying, "line2" character varying, "line3" character varying, "author" character varying, "options" jsonb, CONSTRAINT "PK_1bf192a2ee81fa999f9a75939e4" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3e35aa462daccfb6b07397cc3f" ON "verse" ("renga_id", "number") `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_3e35aa462daccfb6b07397cc3f"`)
    await queryRunner.query(`DROP TABLE "verse"`)
    await queryRunner.query(`DROP TYPE "public"."verse_format_enum"`)
    await queryRunner.query(`DROP TYPE "public"."verse_season_enum"`)
    await queryRunner.query(`DROP TABLE "renga"`)
  }

}
