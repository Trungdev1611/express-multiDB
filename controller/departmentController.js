import connection from "../config/db.js"

export const getListDepartment = async(req, res) => {
    try {
        const {page = 1, pageSize = 20, sortBy = "id", search = ""} = req.query

        const offset = (page- 1) * 20
        const limit = Number(pageSize)
        const queryGetList = ` select * from department d where name like ? order by d.${sortBy}  limit ?  offset ? `
        const [rows] =await connection.query(queryGetList,[`%${search}`, limit, offset, ] )
        return res.status(200).json({
            data: rows
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({ message: error.message })
    }
}



export const createNewDepartment = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const updateDepartment = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteDepartment = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}