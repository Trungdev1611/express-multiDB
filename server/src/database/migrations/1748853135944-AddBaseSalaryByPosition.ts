import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseSalaryByPosition1748853135944 implements MigrationInterface {
    name = 'AddBaseSalaryByPosition1748853135944'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."base_salary_entity_status_enum" AS ENUM('active', 'expired', 'terminated')`);
        await queryRunner.query(`CREATE TABLE "base_salary_entity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "salary_month" numeric(15,2) NOT NULL, "description" character varying NOT NULL, "status" "public"."base_salary_entity_status_enum" NOT NULL DEFAULT 'active', "userId" integer, CONSTRAINT "REL_d7c84d1de86bbaa82f5ff61f5e" UNIQUE ("userId"), CONSTRAINT "PK_243d9fbdcab47718815d6829625" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "base_salary_entity" ADD CONSTRAINT "FK_d7c84d1de86bbaa82f5ff61f5e5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base_salary_entity" DROP CONSTRAINT "FK_d7c84d1de86bbaa82f5ff61f5e5"`);
        await queryRunner.query(`DROP TABLE "base_salary_entity"`);
        await queryRunner.query(`DROP TYPE "public"."base_salary_entity_status_enum"`);
    }

}
