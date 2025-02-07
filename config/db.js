import { Sequelize } from "sequelize";
import dotenv from "dotenv";


dotenv.config()


const sequelizeConnect = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

try {
    await sequelizeConnect.authenticate();
    console.log("Connected to MySQL with Sequelize");
} catch (err) {
    console.error("Unable to connect to database:", err);
}

export default sequelizeConnect;