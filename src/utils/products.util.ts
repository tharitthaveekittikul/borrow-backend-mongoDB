import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function updateProductsTotal(id: string){
  const total_item = await prisma.productItem.count({
    where: {
      product: {
        id: id
      },
    }
  })

  await prisma.product.update({
    where: {
      id: id
    },
    data: {
      total: total_item,
    }
  })
}

export async function updateProductsAvailable(id: string){
  const available_item = await prisma.productItem.count({
    where: {
      product: {
        id: id
      },
      transactions: {
        every: {
          status: true
        }
      }
    }
  })

  await prisma.product.update({
    where: {
      id: id
    },
    data: {
      available: available_item,
    }
  })
}


export async function updateProductsFrequency(id: string){
  await prisma.product.update({
    where: {
      id: id
    },
    data: {
      frequency: {
        increment: 1
      }
    }
  })
}

export async function IsProductItemBorrowing(serial: String): Promise<Boolean>{
  const result = await prisma.productItem.findFirst({
    where:{
      serial_no: String(serial),
      transactions: {
        some: {
          status: false
        }
      }
    }
  })
  return result !== null
}
