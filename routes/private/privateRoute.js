import express from 'express'
import { authMiddleWare } from '../../middleware/auth.middleware.js'
import userRouter from './userRouter.js'

const privateRouter = express.Router()

privateRouter.use('/admin/v1', authMiddleWare)
privateRouter.use('/users',userRouter )
export default privateRouter