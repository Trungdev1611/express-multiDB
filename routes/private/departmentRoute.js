import express from 'express'
import { createNewDepartment, deleteDepartment, getListDepartment, getListDepartmentTable, updateDepartment } from '../../controller/departmentController.js'
import catchAsync from '../../uttil/catchAsync.js'

const departmentRouter = express.Router()

departmentRouter.get('/getlist', catchAsync(getListDepartment))
departmentRouter.get('/getdeparts', catchAsync(getListDepartmentTable))
departmentRouter.post('/', catchAsync(createNewDepartment  ))
departmentRouter.put('/:id', catchAsync(updateDepartment))
departmentRouter.post('/:id', catchAsync(deleteDepartment))

export default departmentRouter