import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1744266589753 implements MigrationInterface {
    name = 'CreateUserTable1744266589753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Kiểm tra nếu bảng users chưa tồn tại, thì tạo mới
        const tableExists = await queryRunner.query(`
            SELECT to_regclass('public.users');
        `);

        // Nếu bảng chưa tồn tại, thì tạo bảng mới
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!tableExists[0].to_regclass) {
            await queryRunner.query(`
                CREATE TABLE "users" (
                    "id" integer NOT NULL, 
                    "username" character varying NOT NULL, 
                    "email" character varying NOT NULL, 
                    "password" character varying NOT NULL, 
                    "created_at" TIMESTAMP NOT NULL, 
                    "updated_at" TIMESTAMP NOT NULL, 
                    CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                )
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
}
