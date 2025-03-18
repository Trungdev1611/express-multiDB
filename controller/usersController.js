import connection from "../config/db.js"
import ExcelJS from "exceljs";
import { Writable } from "stream";
import { format } from "fast-csv";
export const getUsers = async (req, res) => {  //sẽ tối ưu với where id > lastid, và TH nữa là đánh index sau
    try {
        const query = req.query
        const sort = query.sort === "asc" ? "asc" : "desc"
        let { page = 1, pageSize = 10, sortBy = "id", search = "", department_id, role_id } = req.query
        const pageNumber = Number(page)
        const limit = Number(pageSize)
        const offset = (pageNumber - 1) * limit;
        department_id = department_id || null
        role_id = role_id || null
        // Chỉ cho phép các cột hợp lệ
        const allowedSortFields = ["id", "username", "email"];
        const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "id";

        console.log("sort", sort, department_id, role_id)
        const sql = `
        SELECT u.*, r.name as role_name, d.name as department_name FROM 
        users u join roles r ON u.role_id = r.id 
        left join department d  ON u.department_id = d.id 
        WHERE username  LIKE ?

        AND (? IS NULL OR u.department_id = ?) 
        AND (? IS NULL OR u.role_id = ?)

        ORDER BY u.${safeSortBy} ${sort} LIMIT ? OFFSET ?  `;

        // AND (? IS NULL OR u.department_id = ?) -- Nếu giá trị ? là NULL => trả về TRUE => bỏ qua điều kiện này (không lọc) --


        const countSql = `SELECT COUNT(*) AS total FROM users u WHERE username LIKE ? 
        AND (? IS NULL OR u.department_id = ?) 
        AND (? IS NULL OR u.role_id = ?)`;

        const [rows] = await connection.query(sql, [`${search}%`, department_id, department_id, role_id, role_id, limit, offset]);;
        const [total] = await connection.execute(countSql, [`${search}%`, department_id, department_id, role_id, role_id])


        return res.status(200).json({
            data: rows,
            paginate: {
                page: pageNumber,
                pageSize: limit,
                ...total[0]
            }
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({ message: error.message })
    }
}


export const getDetailUser = async (req, res) => {
    try {
        let id = req.user.id //get from middleware token

        let querySql = `Select u.*, r.name as role from users join roles where id = ?`
        let [rows] = await connection.query(querySql, [id])

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ data: rows[0] });
    } catch (error) {
        console.log("error", error)
        res.status(400).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    try {

        const { username, password, email, role_id, department_id } = req.body
        // Bắt đầu transaction
        await connection.beginTransaction();

        const queryCheckExist = `select u.username from users u where u.username = ? or u.email = ?`
        const [rows] = await connection.query(queryCheckExist, [username, email])
        if (rows.length > 0) {
            // Rollback transaction nếu dữ liệu đã tồn tại
            await connection.rollback();

            return res.status(400).json({ msg: "username or email is exist" })
        }
        const queryInsert = `insert into users (username, password, email, role_id, department_id) values(?, ?, ?, ?, ?)`

        const [dataInsert] = await connection.query(queryInsert, [username, password, email, role_id, department_id])
        return res.status(201).json({ username, email, role_id, department_id })
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.log("error", error)
        res.status(400).json({ message: error.message })
    }
}

export const deleteUsers = async (req, res) => {
    try {
        const { listIdsDelete } = req.body
        if (!Array.isArray(listIdsDelete) || listIdsDelete?.length < 1) {
            return res.status(400).json({ msg: `list Ids to delete is not valid` })
        }
        console.log(`listIdsDelete`, listIdsDelete)

        //vì product liên quan đến user và mình đã cho phép product set null khi user bị xoá nên ta cũng nên cập nhật thời gian trong cột update_at product
        const sqlUpdateTimeProduct = `UPDATE products SET updated_at = NOW() WHERE user_id IN (?)`;
        const [resultUpdate] = await connection.query(sqlUpdateTimeProduct, [listIdsDelete]);

        const sqlDelete = `DELETE FROM users WHERE id IN (?)`
        await connection.beginTransaction();
        const [result] = await connection.query(sqlDelete, [listIdsDelete]);



        await connection.commit();
        console.log(`Deleted ${result.affectedRows} rows, update time ${resultUpdate.affectedRows}`);
        return res.status(200).json({ msg: "delete users successfully" })
    } catch (error) {
        await connection.rollback(); // ❌ Rollback nếu có lỗi
        console.error("Error:", error);
        res.status(400).json({ message: error.message })
    }
}

export const editUser = async (req, res) => {
    try {
        const id = req.params.id

        const sqlCheckexist = `SELECT * FROM users WHERE id  = ?`
        const [dataUserExist] = await connection.query(sqlCheckexist, [id])
        console.log(`id`, id, dataUserExist)
        if (!id || !dataUserExist) {
            return res.status(400).json({ msg: "id is not found" })
        }
        const { username, password, email, department_id, role_id } = req.body
        console.log(`username, password, email, department_id, role_id`, username, password, email, department_id, role_id)
        const sqlUpdate = `UPDATE users SET username = ?, password = ?, email = ?, department_id = ?, role_id = ? WHERE id = ?`
        const [result] = await connection.query(sqlUpdate, [username, password, email, department_id, role_id, id])
        console.log(`result`, result, dataUserExist)
        return res.status(200).json({ msg: "Update user sucessfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


export const exportExcel = async (req, res) => {
    try {
        //sql join sẽ join 2 bảng 1 trưóc, thứ tự câu join sẽ như thứ tự viết SQL
        const sqlGetListUsers = `SELECT u.id, u.username, u.email, d.name AS department_name, r.name  AS role_name 
                                FROM users u 
                                     JOIN department d ON u.department_id = d.id
                                     JOIN roles r ON u.role_id = r.id`
        const [users] = await connection.query(sqlGetListUsers)

        console.log(`users`, users)
        if (users?.length < 1) {
            return res.status(404).json({ msg: "No users found" });
        }
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        // Thêm tiêu đề cột
        worksheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Username", key: "username", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "Department", key: "department_name", width: 30 }, // Sửa lại key
            { header: "Role", key: "role_name", width: 30 }, // Sửa lại key
        ];

        users.forEach((user) => {
            worksheet.addRow(user);
        });

        // Định dạng tiêu đề
        worksheet.getRow(1).font = { bold: true };

        // Lưu file Excel vào buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Gửi file Excel về client
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=users.xlsx`);
        res.send(buffer);
    } catch (error) {
        console.error("Error exporting users:", error);
        res.status(400).json({ msg: "Export excel error" });
    }
}

export const exportCSV = async (req, res) => {
    try {
        // Dữ liệu giả lập (hoặc có thể lấy từ database)

        const sqlGetData = `SELECT u.id, u.username, u.email, r.name, d.name
        FROM users u
        JOIN roles r ON u.role_id = r.id
        JOIN department d ON d.id = u.department_id`
        const [data] = await connection.query(sqlGetData)
        // Mảng lưu buffer dữ liệu
        const chunks = [];

        // Tạo Writable Stream để ghi dữ liệu vào buffer
        const writableStream = new Writable({
            write(chunk, _, callback) {
                chunks.push(chunk); // Lưu từng chunk vào mảng
                callback(); // Xác nhận ghi xong
            },
        });

        // Tạo CSV Stream
        const csvStream = format({ headers: true, writeBOM: true });

        // Kết nối CSV stream với Writable Stream
        csvStream.pipe(writableStream);

        // Ghi dữ liệu vào CSV
        data.forEach((row) => csvStream.write(row));

        // Kết thúc stream
        csvStream.end();

        // Khi quá trình ghi hoàn tất, gửi file về client
        writableStream.on("finish", () => {
            const csvBuffer = Buffer.concat(chunks);

            res.setHeader("Content-Disposition", "attachment; filename=data.csv");
            res.setHeader("Content-Type", "text/csv; charset=UTF-8");

            res.send(csvBuffer);
        });
    } catch (error) {
        console.error("Lỗi xuất CSV:", error);
        res.status(500).json({ message: "Lỗi khi xuất CSV" });
    }
};
