import express from 'express'
import { authMiddleWare } from '../../middleware/auth.middleware.js'
import userRouter from './userRouter.js'
import departmentRouter from './departmentRoute.js'
const privateRouter = express.Router()


privateRouter.use('/users',userRouter )
privateRouter.use('/department', departmentRouter)

export default privateRouter