import express from 'express'
import { getItems, getItemById, createItem, deleteItem, getItemByProduct, getItemByProductAvailable } from '../controllers/productItem.controller'

let route = express.Router()

route.get('/', getItems)
route.get('/id/:id', getItemById)
route.get('/products/:id', getItemByProduct)
route.get('/products/available/:id', getItemByProductAvailable)
route.post('/', createItem)
route.delete('/:id', deleteItem)

export default route
