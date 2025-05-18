import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRoleInTableUser1747024092224 implements MigrationInterface {
    name = 'UpdateRoleInTableUser1747024092224'

public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum') THEN
                CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin', 'area_manager');
            END IF;
        END$$;
    `);

    await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`);
}


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
