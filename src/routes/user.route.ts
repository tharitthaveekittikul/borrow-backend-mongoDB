import express from 'express'
import { getUserBorrowing, getUserById, getUsers } from '../controllers/user.controller'

let route = express.Router()

route.get('/', getUsers)
route.get('/borrowing', getUserBorrowing)
route.get('/id/:id', getUserById)

export default route
