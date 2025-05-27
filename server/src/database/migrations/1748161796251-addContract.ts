import { MigrationInterface, QueryRunner } from "typeorm";

export class AddContract1748161796251 implements MigrationInterface {
    name = 'AddContract1748161796251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contract_entity_status_enum" AS ENUM('active', 'expired', 'terminated')`);
        await queryRunner.query(`CREATE TABLE "contract_entity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "numberCode" character varying NOT NULL, "salary_month" numeric(15,2) NOT NULL, "description" character varying NOT NULL, "status" "public"."contract_entity_status_enum" NOT NULL DEFAULT 'active', "userId" integer, CONSTRAINT "REL_ebe93bcdd9e8fd61183cfb7f50" UNIQUE ("userId"), CONSTRAINT "PK_7575db328609620b41aa3ada0c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_ebe93bcdd9e8fd61183cfb7f50c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_ebe93bcdd9e8fd61183cfb7f50c"`);
        await queryRunner.query(`DROP TABLE "contract_entity"`);
        await queryRunner.query(`DROP TYPE "public"."contract_entity_status_enum"`);
    }

}
