import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAttendance1748055517279 implements MigrationInterface {
    name = 'CreateAttendance1748055517279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attendance_entity" ("id" SERIAL NOT NULL, "checkIn" TIMESTAMP NOT NULL, "checkOut" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c70961e3429bda3c168f305f857" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendance_entity" ADD CONSTRAINT "FK_910ccc8cf4ffe6fecf26f4bdc38" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_entity" DROP CONSTRAINT "FK_910ccc8cf4ffe6fecf26f4bdc38"`);
        await queryRunner.query(`DROP TABLE "attendance_entity"`);
    }

}
