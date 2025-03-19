import express from 'express'
import { getUsers, getDetailUser, createUser, deleteUsers, editUser, exportExcel, exportCSV } from '../../controller/usersController.js'
import { checkPermission, ROLES } from '../../middleware/checkPermission.middleware.js'
import { createUpdateUserSchema } from '../../validator/userSchema.js'
import { validateBody, validateParams } from '../../middleware/validateSchema.js'
import { idParamSchema } from '../../validator/IdParamSchema.js'

const userRouter = express.Router()

userRouter.get("/getlist", getUsers)

userRouter.get(`/export-excel`, exportExcel)

userRouter.get(`/export-csv`, exportCSV )

userRouter.get("/:id", validateParams(idParamSchema), getDetailUser)

userRouter.post(`/create`, validateBody(createUpdateUserSchema), createUser)

userRouter.put(`/edit/:id`, validateParams(idParamSchema), validateBody(createUpdateUserSchema),editUser)


//remember to authorization
userRouter.delete(`/delete`,  checkPermission(ROLES.ADMIN, ROLES.SYSTEM_ADMIN), deleteUsers)

export default userRouter