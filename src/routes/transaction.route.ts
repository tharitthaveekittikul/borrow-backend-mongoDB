import express from 'express'
import { getTrans, getTransById, createTrans, deleteTrans, updateStatus, checkStatus, getTransBorrowing } from '../controllers/transaction.controller'

let route = express.Router()

route.get('/', getTrans)
route.get('/id/:id', getTransById)
route.get('/borrowing', getTransBorrowing)
route.post('/', createTrans)
route.delete('/:id', deleteTrans)

route.get('/status/:id', checkStatus)
route.put('/status/:id', updateStatus)

export default route
