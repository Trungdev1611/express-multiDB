// database/data-source.ts
import { DATA_CONSTANT } from 'src/constants';
import { DataSource } from 'typeorm';
console.log(`__dirname + '/../migrations`, __dirname,  )
const AppDataSource = new DataSource({
  type: 'postgres',
  host: DATA_CONSTANT.db_host || "localhost",
  port: 3336,
  username: 'postgres',
  password:  "mysecretpassword",
  database:  "learn_typeorm",
 entities: [__dirname + '/../**/*.entity{.ts,.js}'], //dirname là thư mục chưa data-source file (file cấu hình database này)
  migrations: [__dirname + '/migrations/*.{js,ts}'],
  synchronize: true,
  logging: true // show query
});

// ✅ Bắt buộc phải export đúng instance này
export default AppDataSource;