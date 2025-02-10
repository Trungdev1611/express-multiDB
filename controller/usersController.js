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
        const sql = `SELECT * FROM users WHERE username LIKE ? ORDER BY ${safeSortBy} ${sort} LIMIT ? OFFSET ?`;


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


