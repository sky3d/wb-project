import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserToken1671355625760 implements MigrationInterface {
    name = 'updateUserToken1671355625760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c35b58d24041eed925eaf2f3df"`);
        await queryRunner.query(`ALTER TABLE "token" RENAME COLUMN "social_id" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "providerId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "display_name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider_id" character varying`);
        await queryRunner.query(`CREATE INDEX "IDX_e50ca89d635960fda2ffeb1763" ON "token" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e50ca89d635960fda2ffeb1763"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "provider_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "display_name" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "providerId" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "provider" character varying`);
        await queryRunner.query(`ALTER TABLE "token" RENAME COLUMN "user_id" TO "social_id"`);
        await queryRunner.query(`CREATE INDEX "IDX_c35b58d24041eed925eaf2f3df" ON "token" ("social_id") `);
    }

}
