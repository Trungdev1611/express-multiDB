import express from 'express'
import { getUsers } from '../../controller/usersController.js'

const userRouter = express.Router()

userRouter.get("/getAll", getUsers)

export default userRouter