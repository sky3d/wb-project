"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial1645181121645 = void 0;
class initial1645181121645 {
    constructor() {
        this.name = 'initial1645181121645';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "renga" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "status" integer NOT NULL DEFAULT '0', "description" character varying, CONSTRAINT "PK_bbe829d1f07636846967fd313c4" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "renga"`);
    }
}
exports.initial1645181121645 = initial1645181121645;
