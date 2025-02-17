import express from 'express'
import { createNewDepartment, deleteDepartment, getListDepartment, updateDepartment } from '../../controller/departmentController.js'

const departmentRouter = express.Router()

departmentRouter.get('/getlist', getListDepartment)
departmentRouter.post('/', createNewDepartment  )
departmentRouter.put('/:id', updateDepartment)
departmentRouter.post('/:id', deleteDepartment)

export default departmentRouter