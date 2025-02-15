import express from 'express'
import { getUsers, getDetailUser } from '../../controller/usersController.js'

const userRouter = express.Router()

userRouter.get("/getAll", getUsers)

userRouter.get("/:id", getDetailUser)

export default userRouter