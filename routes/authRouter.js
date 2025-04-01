import express from 'express'
import { login, register } from '../controller/authController.js'
import catchAsync from '../uttil/catchAsync.js'

const authRouter = express.Router()

authRouter
.post("/register",catchAsync(register) ) //không cần try/catch trong controller với catchAsync
.post("/login", catchAsync(login))




export default authRouter
