import {MigrationInterface, QueryRunner} from "typeorm";

export class rengaUser1677096327614 implements MigrationInterface {
    name = 'rengaUser1677096327614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "renga_user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "renga_user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "renga_user" DROP CONSTRAINT "PK_a744050febee43dae5afb417247"`);
        await queryRunner.query(`ALTER TABLE "renga_user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "renga_user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "renga_user" ADD CONSTRAINT "PK_a744050febee43dae5afb417247" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "renga_user" ALTER COLUMN "role" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "renga_user" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "renga_user" DROP CONSTRAINT "PK_a744050febee43dae5afb417247"`);
        await queryRunner.query(`ALTER TABLE "renga_user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "renga_user" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "renga_user" ADD CONSTRAINT "PK_a744050febee43dae5afb417247" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "renga_user" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "renga_user" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
