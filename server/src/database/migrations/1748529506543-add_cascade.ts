import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascade1748529506543 implements MigrationInterface {
    name = 'AddCascade1748529506543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_entity" DROP CONSTRAINT "FK_910ccc8cf4ffe6fecf26f4bdc38"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_ebe93bcdd9e8fd61183cfb7f50c"`);
        await queryRunner.query(`ALTER TABLE "attendance_entity" ADD CONSTRAINT "FK_910ccc8cf4ffe6fecf26f4bdc38" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_ebe93bcdd9e8fd61183cfb7f50c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP CONSTRAINT "FK_ebe93bcdd9e8fd61183cfb7f50c"`);
        await queryRunner.query(`ALTER TABLE "attendance_entity" DROP CONSTRAINT "FK_910ccc8cf4ffe6fecf26f4bdc38"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD CONSTRAINT "FK_ebe93bcdd9e8fd61183cfb7f50c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance_entity" ADD CONSTRAINT "FK_910ccc8cf4ffe6fecf26f4bdc38" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
