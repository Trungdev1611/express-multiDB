import express from 'express'
import {
    getUsers, getDetailUser, createUser,
    deleteUsers, editUser, exportExcel, exportCSV,
    EmailNodeMailer, EmailNodeMailerListUser
} from '../../controller/usersController.js'
import { checkPermission, ROLES } from '../../middleware/checkPermission.middleware.js'
import { createUpdateUserSchema, emailSchema, sendEmailSchemaList } from '../../validator/userSchema.js'
import { validateBody, validateParams } from '../../middleware/validateSchema.js'
import { idParamSchema } from '../../validator/IdParamSchema.js'
import catchAsync from '../../uttil/catchAsync.js'

const userRouter = express.Router()

userRouter.get("/getlist", catchAsync(getUsers) ) //catchAsync để không cần try/catch trong controller

userRouter.get(`/export-excel`, catchAsync(exportExcel))

userRouter.get(`/export-csv`, catchAsync(exportCSV))

userRouter.post(`/send-node-mailer`, validateBody(emailSchema), catchAsync(EmailNodeMailer))

userRouter.post(`/send-list-node-mailer`, validateBody(sendEmailSchemaList), catchAsync(EmailNodeMailerListUser))

userRouter.get("/:id", validateParams(idParamSchema), catchAsync(getDetailUser))

userRouter.post(`/create`, validateBody(createUpdateUserSchema), catchAsync(createUser))

userRouter.put(`/edit/:id`, validateParams(idParamSchema), validateBody(createUpdateUserSchema), catchAsync(editUser))


//remember to authorization
userRouter.delete(`/delete`, checkPermission(ROLES.ADMIN, ROLES.SYSTEM_ADMIN), deleteUsers)

export default userRouter