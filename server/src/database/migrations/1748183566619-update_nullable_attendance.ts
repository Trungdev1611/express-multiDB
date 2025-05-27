import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNullableAttendance1748183566619 implements MigrationInterface {
    name = 'UpdateNullableAttendance1748183566619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_entity" ALTER COLUMN "checkOut" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_entity" ALTER COLUMN "checkOut" SET NOT NULL`);
    }

}
