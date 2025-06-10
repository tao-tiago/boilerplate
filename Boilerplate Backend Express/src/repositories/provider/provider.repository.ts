import { TypeProvider } from "@prisma/client"
import { validate } from "class-validator"

import { Warning } from "@/errors"
import prisma from "@/database/client"

// Shared
import { dateTransform } from "@/shared/utils/fieldTransform"
import { fieldInvalid } from "@/shared/helpers/messages"
import { IIndex } from "@/shared/helpers/interfaces"

// Interfaces
import { IProvider, IProviderDTO, IProviderUpdate, IProviderValidator } from "./provider.interface"

export class ProviderRepository implements IProvider {
  private prisma = prisma

  listProvider = async ({ orderBy, order, skip, take, filter }: IIndex) => {
    const where = {}

    const specialFilter = ["typeProvider"]

    Object.entries(filter).forEach(([key, value]) => {
      if (specialFilter.includes(key) && key === "typeProvider") {
        const typeProviderMulti = value.split(",")

        const typeProviderMultiCheck = typeProviderMulti.map((typeProvider) => {
          if (!Object.values(TypeProvider).includes(typeProvider as TypeProvider)) { throw new Warning(fieldInvalid("Tipo de Fornecedor"), 400) }

          return typeProvider
        })

        Object.assign(where, {
          typeProvider: {
            in: typeProviderMultiCheck
          }
        })
      }

      const isNull = value === "null"

      if (isNull) {
        Object.assign(where, {
          [key]: {
            equals: null
          }
        })
      }

      if (!isNull && !specialFilter) {
        Object.assign(where, {
          [key]: {
            contains: value,
            mode: "insensitive"
          }
        })
      }
    })

    const [count, rows] = await this.prisma.$transaction([
      this.prisma.provider.count({
        where
      }),
      this.prisma.provider.findMany({
        skip,
        take,
        orderBy: { [orderBy]: order },
        where
      })
    ])

    return {
      count,
      rows
    }
  }

  createProvider = async (payload: IProviderDTO) => {
    const { corporateName, typeProvider } = payload

    const request = new IProviderValidator({ corporateName, typeProvider })

    const errors = await validate(request)

    if (errors.length > 0) { throw new Warning(errors, 400) }

    try {
      const createdAt = dateTransform({ format: "yyyy-mm-ddThh:MM:ssZ" })

      await this.prisma.provider.create({
        data: {
          corporateName,
          typeProvider,
          createdAt
        }
      })

      return ["Fornecedor cadastrado com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível cadastrar o fornecedor!", 500, {
        payload,
        operation: "ProviderRepository Class | createProvider()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  getProvider = async (id: string) => {
    const provider = await this.findProviderById(id)

    if (!provider) { throw new Warning("O fornecedor não foi encontrado!", 404) }

    return provider
  }

  updateProvider = async (payload: IProviderUpdate) => {
    const { id, corporateName, typeProvider } = payload

    const request = new IProviderValidator({ corporateName, typeProvider })

    const errors = await validate(request)

    if (errors.length > 0) { throw new Warning(errors, 400) }

    await this.findProviderById(id)

    try {
      await this.prisma.provider.update({
        where: {
          id
        },
        data: {
          corporateName,
          typeProvider
        }
      })

      return ["Fornecedor atualizado com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível atualizar o fornecedor!", 500, {
        payload,
        operation: "ProviderRepository Class | updateProvider()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  deleteProvider = async (id: string) => {
    await this.findProviderById(id)

    try {
      await this.prisma.provider.delete({
        where: {
          id
        }
      })

      return ["Fornecedor excluído com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível atualizar o fornecedor!", 500, {
        operation: "ProviderRepository Class | deleteProvider()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  findProviderById = async (id: string) => {
    return await this.prisma.provider.findUnique({
      where: {
        id
      }
    })
  }
}
