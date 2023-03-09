import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export async function getLabs(req: Request , res: Response) {
  const labs = await prisma.lab.findMany() 
  res.json(labs)
}

export async function createLab(req: Request, res: Response){
  if (req.body.name === undefined){
    res.json({
      message: "create labs error",
      body: req.body
    })
    return
  }
  const result = await prisma.lab.create({
    data: {
      name: req.body.name
    }
  })
  res.json(result)
}

export async function deleteLab(req: Request, res: Response){
  const { id } = req.params
  if (id === undefined){
    res.json({
      message: "can't delete lab",
    })
  }
  const result = await prisma.lab.delete({
    where: { id: id },
  })
  res.json(result)
}
