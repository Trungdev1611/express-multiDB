import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config()


const sequelizeConnect = new Sequelize(process.env.DB_NAME_POSTGRE, process.env.DB_USER_POSTGRE, process.env.DB_PASS_POSTGRE, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    port: 5432,          // Cổng mặc định của PostgreSQL
    logging: false,      // Tắt log SQL nếu không cần

});

try {
    await sequelizeConnect.authenticate();
    console.log("Connected to PostGres with Sequelize");
} catch (err) {
    console.error("Unable to connect to database:", err);
}

export default sequelizeConnect;