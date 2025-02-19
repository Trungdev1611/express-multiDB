import express from 'express'
import { createNewRole, deleteRole, getListRole, updateRole } from '../../controller/roleController.js'

const roleRouter = express.Router()

roleRouter.get('/getlist', getListRole)
roleRouter.post('/', createNewRole  )
roleRouter.put('/:id', updateRole)
roleRouter.post('/:id', deleteRole)

export default roleRouter