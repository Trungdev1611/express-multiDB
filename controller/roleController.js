import connection from "../config/db.js"

export const getListRole = async(req, res) => {
        const {page = 1, pageSize = 20, sortBy = "id", search = ""} = req.query
        const offset = (page- 1) * 20
        const limit = Number(pageSize)
        const queryGetList = ` select * from roles r where name like ? order by r.${sortBy}  limit ?  offset ? `
        const [rows] =await connection.query(queryGetList,[`%${search}`, limit, offset, ] )
        return res.status(200).json({
            data: rows
        })
   
}

export const createNewRole = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const updateRole = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteRole = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}