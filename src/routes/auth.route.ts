import express from 'express'
import { addAdmin, deleteAdmin, getAdmin, login } from '../controllers/auth.controller'

let route = express.Router()

route.get('/', getAdmin)
route.post('/', login)
route.post('/addadmin', addAdmin)
route.delete('/:id', deleteAdmin)

export default route