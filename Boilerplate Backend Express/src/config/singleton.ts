import "reflect-metadata"
import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended"

import prisma from "../database/client"

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

jest.mock("../database/client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}))

beforeEach(() => {
  mockReset(prismaMock)
})
