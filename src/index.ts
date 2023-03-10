import { PrismaClient } from '@prisma/client'
import express from 'express'
import labRoute from './routes/lab.route'
import sourceRoute from './routes/source.route'
import productRoute from './routes/products.route'
import productItemRoute from './routes/productItem.route'
import transactionRoute from './routes/transaction.route'
import userRoute from './routes/user.route'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use('/lab', labRoute)
app.use('/source', sourceRoute)
app.use('/product', productRoute)
app.use('/productItem', productItemRoute)
app.use('/transaction', transactionRoute)
app.use('/user', userRoute)

app.get('/', (req, res) => {
  res.send("It's work")
})

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
)

