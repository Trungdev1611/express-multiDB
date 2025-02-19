import connection from "../config/db.js"

export const getListRole = async(req, res) => {
    try {
        const queryGetList = ` select * from roles`
        const [rows] =await connection.query(queryGetList)
        return res.status(200).json({
            data: rows
        })
    } catch (error) {
        console.log("error", error)
        res.status(400).json({ message: error.message })
    }
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