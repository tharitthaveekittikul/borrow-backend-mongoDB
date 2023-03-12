import express from 'express'
import { addAdmin, deleteAdmin, getAdmin, login, updateProfile } from '../controllers/auth.controller'
import { authMiddleware } from '../utils/auth.util'

let route = express.Router()

route.get('/',authMiddleware , getAdmin)
route.post('/', login)
route.post('/addadmin',authMiddleware , addAdmin)
route.delete('/:id',authMiddleware , deleteAdmin)
route.put('/', authMiddleware ,updateProfile)

export default route