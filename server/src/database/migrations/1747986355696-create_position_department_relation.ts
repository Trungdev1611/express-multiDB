import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePositionDepartmentRelation1747986355696 implements MigrationInterface {
    name = 'CreatePositionDepartmentRelation1747986355696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department_entity" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39ba79a89795743b899acf552c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position_entity" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0954640c6ab6fd34c2e87dad0c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "departmentId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "positionId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_554d853741f2083faaa5794d2ae" FOREIGN KEY ("departmentId") REFERENCES "department_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7d5b477d15c01b6b44f1b4e8cc4" FOREIGN KEY ("positionId") REFERENCES "position_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7d5b477d15c01b6b44f1b4e8cc4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_554d853741f2083faaa5794d2ae"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "positionId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "departmentId"`);
        await queryRunner.query(`DROP TABLE "position_entity"`);
        await queryRunner.query(`DROP TABLE "department_entity"`);
    }

}
