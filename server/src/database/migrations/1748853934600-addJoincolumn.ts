import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJoincolumn1748853934600 implements MigrationInterface {
    name = 'AddJoincolumn1748853934600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base_salary_entity" ADD "positionId" integer`);
        await queryRunner.query(`ALTER TABLE "base_salary_entity" ADD CONSTRAINT "UQ_ffdcaa0fe88e450ab998ce827c5" UNIQUE ("positionId")`);
        await queryRunner.query(`ALTER TABLE "base_salary_entity" ADD CONSTRAINT "FK_ffdcaa0fe88e450ab998ce827c5" FOREIGN KEY ("positionId") REFERENCES "position_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "base_salary_entity" DROP CONSTRAINT "FK_ffdcaa0fe88e450ab998ce827c5"`);
        await queryRunner.query(`ALTER TABLE "base_salary_entity" DROP CONSTRAINT "UQ_ffdcaa0fe88e450ab998ce827c5"`);
        await queryRunner.query(`ALTER TABLE "base_salary_entity" DROP COLUMN "positionId"`);
    }

}
