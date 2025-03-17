import express from 'express'
import userRouter from './userRouter.js'
import departmentRouter from './departmentRoute.js'
import roleRouter from './roleRoute.js'
import { checkPermission, ROLES } from '../../middleware/checkPermission.middleware.js'
const privateRouter = express.Router()


privateRouter.use('/users',userRouter )
privateRouter.use('/department', departmentRouter)
privateRouter.use('/role', roleRouter)

export default privateRouter