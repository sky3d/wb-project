import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1645181121645 implements MigrationInterface {
    name = 'initial1645181121645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "renga" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "status" integer NOT NULL DEFAULT '0', "description" character varying, CONSTRAINT "PK_bbe829d1f07636846967fd313c4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "renga"`);
    }

}
