import express from 'express'
import { getUsers, getDetailUser, createUser, deleteUsers, editUser, exportExcel } from '../../controller/usersController.js'
import { checkPermission, ROLES } from '../../middleware/checkPermission.middleware.js'

const userRouter = express.Router()

userRouter.get("/getlist", getUsers)

userRouter.get(`/export-excel`, exportExcel)

userRouter.get("/:id", getDetailUser)

userRouter.post(`/create`, createUser)

userRouter.put(`/edit/:id`, editUser)


//remember to authorization
userRouter.delete(`/delete`,  checkPermission(ROLES.ADMIN, ROLES.SYSTEM_ADMIN), deleteUsers)

export default userRouter