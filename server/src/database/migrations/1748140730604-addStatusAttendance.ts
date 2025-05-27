import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusAttendance1748140730604 implements MigrationInterface {
    name = 'AddStatusAttendance1748140730604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attendance_entity_status_enum" AS ENUM('not_enough', 'enough', 'absent')`);
        await queryRunner.query(`ALTER TABLE "attendance_entity" ADD "status" "public"."attendance_entity_status_enum" NOT NULL DEFAULT 'absent'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendance_entity" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."attendance_entity_status_enum"`);
    }

}
