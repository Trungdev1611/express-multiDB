import connection from "../config/db.js"

export const getListDepartment = async(req, res) => {
   
        const {page = 1, pageSize = 20, sortBy = "id", search = ""} = req.query

        const offset = (page- 1) * 20
        const limit = Number(pageSize)
        const queryGetList = ` select id, name from department d where name like ? order by d.${sortBy}  limit ?  offset ? `
        const [rows] =await connection.query(queryGetList,[`%${search}`, limit, offset, ] )
        return res.status(200).json({
            data: rows,
            paginate: {
                page: page,
                pageSize: limit,
                
            }
        })
}

export const getListDepartmentTable = async(req, res) => {
   
    const {page = 1, pageSize = 20, sortBy = "id", search = ""} = req.query

    const offset = (page- 1) * 20
    const limit = Number(pageSize)
    const searchQuery = `${search}%`;

    const queryGetList = ` select * from department d where name like ? order by d.${sortBy}  limit ?  offset ? `

    const queryGetTotal = `select count(*) as total  from department d where name like ?`

    const [[rows], [total ]] = await Promise.all([
        connection.query(queryGetList, [searchQuery, limit, offset]),
        connection.query(queryGetTotal, [searchQuery])
      ]);
      console.log(`total`, total)
    return res.status(200).json({
        data: rows,
        paginate: {
            page: page,
            pageSize: limit,
            ...total[0]
        }
    })
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