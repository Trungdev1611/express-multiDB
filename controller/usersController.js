import connection from "../config/db.js"
import ExcelJS from "exceljs";
import { Writable } from "stream";
import { format } from "fast-csv";
import { sendEmail } from "../uttil/mailer.js";
import cron from 'node-cron'
import dayjs from 'dayjs'
import AppError from "../uttil/AppError.js";
export const getUsers = async (req, res) => {  //sẽ tối ưu với where id > lastid, và TH nữa là đánh index sau

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

}


export const getDetailUser = async (req, res) => {

        let id = req.user.id //get from middleware token

        let querySql = `SELECT u.*, r.name AS role FROM users u JOIN roles r WHERE u.ID = ?`
        let [rows] = await connection.query(querySql, [id])
        if (rows.length === 0) {
            throw new AppError("user not found", 400)
        }
        return res.status(200).json({ data: rows[0] });
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

        const id = req.params.id

        const sqlCheckexist = `SELECT * FROM users WHERE id  = ?`
        const [dataUserExist] = await connection.query(sqlCheckexist, [id])
        console.log(`id`, id, dataUserExist)
        if (!id || !dataUserExist) {
            throw new AppError("id is not found", 400)
        }
        const { username, password, email, department_id, role_id } = req.body
        console.log(`username, password, email, department_id, role_id`, username, password, email, department_id, role_id)
        const sqlUpdate = `UPDATE users SET username = ?, password = ?, email = ?, department_id = ?, role_id = ? WHERE id = ?`
        const [result] = await connection.query(sqlUpdate, [username, password, email, department_id, role_id, id])
        console.log(`result`, result, dataUserExist)
        return res.status(200).json({ msg: "Update user sucessfully" })
}


export const exportExcel = async (req, res) => {
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
    
}

export const exportCSV = async (req, res) => {
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
};


//send mail with node mailer - test mất 3 đến 5s một mail, khá lâu
export async function EmailNodeMailer(req, res) {
    try {
        const {to, subject, content} = req.body
        await sendEmail(to, subject, content)
        res.status(200).json({ msg: "Send email success" })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({error})
    }
}

//send email với list users thay vì 1 user (vẫn sử dụng main thread)
export async function EmailNodeMailerListUser(req, res) {
    try {
        const {listUser, subject, content, timeout, isCronjob} = req.body

        if(!timeout && !isCronjob) {
            console.log(`listUser`, listUser)
            let listPromise = listUser.map(user => {
                return (sendEmail(user, subject, content))
            })
    
            await Promise.all(listPromise)
            return res.status(200).json({ msg: "Send list email success" })
        }
        else if (timeout && isCronjob) { //npm install node-cron - cronjob nhưng vẫn chạy trên main thread
            const delaySeconds = Math.max(1, timeout/1000)
            const cronjobExpression = `*/${Math.floor(delaySeconds/60)} * * * *` //biểu thức này có nghĩa chạy sau delaySeconds/60 phút
            //lên lịch
            cron.schedule(cronjobExpression, async() => {
                logger.info(`bắt đầu lên lịch gửi mail: Mail sẽ được gửi sau ${delaySeconds} from ${dayjs().format(`DD/MM/YYYY hh:mm:ss`)}`)
                await Promise.all(listUser.map(user => {
                    console.log(`Đang lên lịch gửi mail user: ${user}`)
                    return sendEmail(user, subject, content)}))
            })
            return res.status(200).json({ msg: `Email will be send with cronjob ${Math.floor(delaySeconds/60)}  seconds`})
            
        }
        else if(timeout){
            //có time out, set lịch sau thời gian timeout
            listUser.forEach(user => {
                setTimeout(() => {sendEmail(user, subject, content)}, timeout)
            })
            return res.status(200).json({ msg: `Email will be send after ${timeout / 1000 } seconds`})
        }
        else {
            // các trường hợp còn lại
            return res.status(200).json({msg: "not belong any cases"})
        }
    
    } catch (error) {
        console.log("error", error)
        return res.status(400).json({error})
    }
}


