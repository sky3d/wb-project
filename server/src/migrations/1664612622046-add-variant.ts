import {MigrationInterface, QueryRunner} from "typeorm";

export class addVariant1664612622046 implements MigrationInterface {
    name = 'addVariant1664612622046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_3e35aa462daccfb6b07397cc3f"`);
        await queryRunner.query(`CREATE TABLE "variant" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "renga_id" character varying NOT NULL, "number" integer NOT NULL, "text" character varying, "author" character varying, CONSTRAINT "PK_f8043a8a34fa021a727a4718470" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3fdf7246e2348b2408323b164" ON "variant" ("renga_id", "number") `);
        await queryRunner.query(`CREATE INDEX "IDX_3e35aa462daccfb6b07397cc3f" ON "verse" ("renga_id", "number") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_3e35aa462daccfb6b07397cc3f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3fdf7246e2348b2408323b164"`);
        await queryRunner.query(`DROP TABLE "variant"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3e35aa462daccfb6b07397cc3f" ON "verse" ("renga_id", "number") `);
    }

}
