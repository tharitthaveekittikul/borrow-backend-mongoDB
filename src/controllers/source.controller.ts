import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export async function getSources(req: Request , res: Response) {
  const source = await prisma.source.findMany() 
  res.json(source)
}

export async function createSource(req: Request, res: Response){
  if (req.body.name === undefined){
    res.json({
      message: "create source error",
      body: req.body
    })
    return
  }
  const result = await prisma.source.create({
    data: {
      name: req.body.name
    }
  })
  res.json(result)
}

export async function deleteSource(req: Request, res: Response){
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "can't delete Source",
    })
  }
  const result = await prisma.source.delete({
    where: { id: id },
  })
  res.json(result)
}
