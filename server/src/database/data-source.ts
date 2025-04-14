// database/data-source.ts
import { DATA_CONSTANT } from 'src/constants';
import { DataSource } from 'typeorm';
console.log(`__dirname + '/../migrations`, __dirname )
const AppDataSource = new DataSource({
  type: 'postgres',
  host: DATA_CONSTANT.db_host || "localhost",
  port: Number(DATA_CONSTANT.db_port) || 5432,
  username: DATA_CONSTANT.db_user_name ?? 'myuser',
  password: DATA_CONSTANT.db_pass || "mypassword",
  database: DATA_CONSTANT.db_name || "nestjs_project",
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //dirname là thư mục chưa data-source file (file cấu hình database này)
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: false,
});

// ✅ Bắt buộc phải export đúng instance này
export default AppDataSource;