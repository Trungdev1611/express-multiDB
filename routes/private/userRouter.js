import express from 'express'
import { getUsers, getDetailUser, createUser } from '../../controller/usersController.js'

const userRouter = express.Router()

userRouter.get("/getAll", getUsers)

userRouter.get("/:id", getDetailUser)

userRouter.post(`/create`, createUser)

export default userRouter