# 1. Cài nestjs-CLI để tạo nhanh chóng các controller, project, services....
npm i -g @nestjs/cli 
yarn new .

# 2. Cài ORM: npm install @nestjs/typeorm typeorm pg

# 3. connect to DB qua file data-source.ts (file cấu hình)
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATA_CONSTANT.db_host || "localhost",
  port: Number(DATA_CONSTANT.db_port) || 5432,
  username: DATA_CONSTANT.db_user_name ?? 'myuser',
  password: DATA_CONSTANT.db_pass || "mypassword",
  database: DATA_CONSTANT.db_name || "nestjs_project",
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: false, // dùng migration thì để false
};

# 4. Cài đặt migration
a/ npm install typeorm -D
b/ cấu hình lệnh để chạy trong package.json
{
   // Gọi CLI của TypeORM thông qua ts-node và hỗ trợ path alias
#    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",

    // Tạo migration: thêm -n <Name> khi chạy, ví dụ: npm run migration:generate -- -n CreateUserTable
#    "migration:generate": "npm run typeorm migration:generate -- -d src/database/data-source.ts",

    // Chạy migration
#    "migration:run": "npm run typeorm migration:run -- -d src/database/data-source.ts",

    // Revert migration cuối cùng
#    "migration:revert": "npm run typeorm migration:revert -- -d src/database/data-source.ts"
  
}


c. chạy migration npm run migration:generate (migration sẽ tự tạo dựa trên entity ----- nó sẽ lưu tất cả những sự khác biệt giữa lần chạy migraion trướnc đó và lần này)
npm run migration:generate -- -n CreateUserTable
VD:
// src/user/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

npm run migration:generate -- -n CreateUserTable

# Các bước cụ thể
Viết entity
generate migration tương ứng với entity @Entity()
run migration
revert migration nếu cần