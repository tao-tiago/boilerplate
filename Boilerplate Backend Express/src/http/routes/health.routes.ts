import { Router, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const health = Router()

health.get("/", function (_request: Request, response: Response) {
  prisma.$connect()
    .then(() => {
      response.json({ status: "UP" })
    })
    .catch((_error) => {
      response.status(500).json({ status: "Não foi possível conectar ao banco de dados!" })
    }).finally(() => {
      prisma.$disconnect()
    })
})

export { health }
