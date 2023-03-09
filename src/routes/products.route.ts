import express from 'express'
import { getProducts, getProductsById, createProducts, deleteProduct, updateFrequency } from '../controllers/products.controller'

let route = express.Router()

route.get('/', getProducts)
route.get('/:id', getProductsById)
route.post('/', createProducts)
route.put('/frequency/:id', updateFrequency)
route.delete('/:id', deleteProduct)

export default route
