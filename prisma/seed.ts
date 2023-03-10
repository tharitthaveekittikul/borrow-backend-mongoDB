import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
  await createLab()
  await createSource()
  await createProducts()
}

async function createLab() {
  let labs = ["Lab A", "Lab B", "Lab C"]
  for (const lab of labs) {
    await prisma.room.upsert({
      where: {
        name: lab
      },
      update: {},
      create: {
        name: lab
      }
    });
  }
}

async function createSource(){
  let sources = ["center","department","personal"]
  for (const source of sources) {
    await prisma.source.upsert({
      where: {
        name: source
      },
      update: {},
      create: {
        name: source
      }
    });
  }
}

async function createProducts(){

  let products = ["Calculator","Telescope"]
  for (const product of products) {
    await prisma.product.upsert({
      where: {
        name: product
      },
      update: {},
      create: {
        name: product
      }
    });
  }
  
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
