import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  log: ["info"]
})

export const disconnect = async () => {
  await prisma.$disconnect()
}

export default prisma
