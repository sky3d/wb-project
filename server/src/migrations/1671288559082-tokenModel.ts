import {MigrationInterface, QueryRunner} from "typeorm";

export class tokenModel1671288559082 implements MigrationInterface {
    name = 'tokenModel1671288559082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "social_id" character varying NOT NULL, "refresh_token" character varying NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c35b58d24041eed925eaf2f3df" ON "token" ("social_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c35b58d24041eed925eaf2f3df"`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
