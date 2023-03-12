import express from 'express'
import { addAdmin, deleteAdmin, getAdmin, login, updateProfile } from '../controllers/auth.controller'

let route = express.Router()

route.get('/', getAdmin)
route.post('/', login)
route.post('/addadmin', addAdmin)
route.delete('/:id', deleteAdmin)
route.put('/', updateProfile)

export default route