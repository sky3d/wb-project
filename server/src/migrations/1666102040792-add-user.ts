import {MigrationInterface, QueryRunner} from "typeorm";

export class addUser1666102040792 implements MigrationInterface {
    name = 'addUser1666102040792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" character varying, "socialId" character varying, "display_name" character varying, "profile" jsonb, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
