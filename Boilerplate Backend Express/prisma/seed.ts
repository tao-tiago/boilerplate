import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()

async function main () {
  const providerId = crypto.randomUUID()

  await prisma.$transaction([
    prisma.provider.create({
      data: {
        id: providerId,
        corporateName: "Empresa de Teste",
        typeProvider: "LTDA"
      }
    }),
    prisma.product.create({
      data: {
        name: "Produto de Teste",
        providerId
      }
    })
  ])
}

main().catch(() => {
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
