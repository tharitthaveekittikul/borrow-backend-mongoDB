import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';
import { updateProductsAvailable, updateProductsTotal } from '../utils/products.util'

const prisma = new PrismaClient()

export async function getItems(req: Request , res: Response) {
  const result = await prisma.productItem.findMany({
    include: {
      transactions: {
        where: {
          status: false
        }
      },
      room: true,
      source: true,
      product: true,
    }
  }) 
  res.json(result)
}

export async function getItemById(req: Request , res: Response) {
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "get item by id error",
    })
    return
  }

  const result = await prisma.productItem.findFirst({
    where: {
      id: id
    },
    include: {
      transactions: {
        where: {
          status: false
        }
      },
      room: true,
      source: true,
      product: true,
    }
  }) 
  if (result === null){
    res.status(404).json({
      message: `${id} not found`
    })
    return
  }
  res.json(result)
}
export async function getItemByProduct(req: Request , res: Response) {
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "get item by id error",
    })
    return
  }

  const result = await prisma.productItem.findMany({
    where: {
      product: {
        id: id
      }
    },
    include: {
      transactions: {
        where: {
          status: false
        }
      },
      room: true,
      source: true,
      product: true,
    }
  }) 
  if (result === null){
    res.status(404).json({
      message: `${id} not found`
    })
    return
  }
  res.json(result)
}

export async function getItemByProductAvailable(req: Request , res: Response) {
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "get item by id error",
    })
    return
  }

  const result = await prisma.productItem.findMany({
    where: {
      product: {
        id: id
      },
      transactions: {
        every: {
          status: true
        }
      }
    },
    include: {
      transactions: true,
      room: true,
      source: true,
      product: true,
    }
  }) 
  if (result === null){
    res.status(404).json({
      message: `${id} not found`
    })
    return
  }
  res.json(result)
}

export async function createItem(req: Request, res: Response){
  try{
    const result = await prisma.productItem.create({
      data: {
        serial_no: req.body.serial_no,
        sourceId: req.body.sourceId,
        roomId: req.body.labId,
        productId: req.body.productId
      },
      include: {
        transactions: true,
        room: true,
        source: true,
        product: true,
      }
    })
    await updateProductsAvailable(req.body.productId)
    await updateProductsTotal(req.body.productId)
    res.status(201).json(result)
  }catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === 'P2002') {
        res.json({
          message: "serial_no is duplicate, cannot create row"
        })
      }
    }
  }
}

export async function deleteItem(req: Request, res: Response){
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "can't delete item",
    })
  }
  const result = await prisma.productItem.delete({
    where: { id: id },
  })
  await updateProductsTotal(result.productId)
  res.json(result)
}
