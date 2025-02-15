import connection from "../config/db.js"

export const getUsers = async (req, res) => {  //sẽ tối ưu với where id > lastid, và TH nữa là đánh index sau
    try {
        const query = req.query
        const sort = query.sort === "asc" ? "asc" : "desc"
        const { page = 1, pageSize = 10, sortBy = "id", search = "" } = req.query
        const pageNumber = Number(page)
        const limit = Number(pageSize)
        const offset = (pageNumber - 1) * limit;

        // Chỉ cho phép các cột hợp lệ
        const allowedSortFields = ["id", "username", "email"];
        const safeSortBy = allowedSortFields.includes(sortBy) ? sortBy : "id";

        console.log("sort", sort)
        const sql = `
        SELECT u.*, r.name as role_name, d.name as department_name FROM 
        users u join roles r ON u.role_id = r.id 
        left join department d  ON u.department_id = d.id 
        WHERE username  LIKE ? ORDER BY u.${safeSortBy} ${sort} LIMIT ? OFFSET ?  `;


        const countSql = `SELECT COUNT(*) AS total FROM users WHERE username LIKE ?`;
        const [rows] = await connection.query(sql, [`${search}%`, limit, offset]);;
        const [total] = await connection.execute(countSql, [`${search}%`])

    
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
        res.status(500).json({ message: error.message })
    }
}


export const getDetailUser = async(req, res) => {
    try {
        let id = req.params.id
        console.log("iddd", id)
        if(!id && isNaN(Number(id))) {
            throw new Error("id is not valid");
        }
        id = Number(id)
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