import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})
console.log("Connected to MySQL database");


//DƯỚI ĐÂY LÀ LOG CHO CÂU LỆNH MYSQL
// Tạo wrapper cho phương thức query để log câu lệnh SQL
const query = connection.query.bind(connection);

// Tạo hàm mới cho execute để log câu truy vấn
connection.query = async (sql, values) => {
    // Log câu truy vấn SQL và các tham số
    const formattedQuery = connection.format(sql, values);
    console.log('Executing SQL Query:', formattedQuery); // In câu lệnh SQL

    // Gọi phương thức query thực tế
    return query(sql, values);
};



export default connection;