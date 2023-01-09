import {MigrationInterface, QueryRunner} from "typeorm";

export class rengaUsers1673259085110 implements MigrationInterface {
    name = 'rengaUsers1673259085110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "renga_user" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "renga_id" character varying NOT NULL, "user_id" character varying NOT NULL, "role" integer NOT NULL, CONSTRAINT "PK_a744050febee43dae5afb417247" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_15a01c4659f7bfba81927b52aa" ON "renga_user" ("renga_id", "user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_15a01c4659f7bfba81927b52aa"`);
        await queryRunner.query(`DROP TABLE "renga_user"`);
    }

}
