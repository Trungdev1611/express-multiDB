import express from 'express'
import { createNewRole, deleteRole, getListRole, updateRole } from '../../controller/roleController.js'
import catchAsync from '../../uttil/catchAsync.js'

const roleRouter = express.Router()

roleRouter.get('/getlist',catchAsync(getListRole) )
roleRouter.post('/', catchAsync(createNewRole  ))
roleRouter.put('/:id', catchAsync(updateRole))
roleRouter.post('/:id', catchAsync(deleteRole))

export default roleRouter