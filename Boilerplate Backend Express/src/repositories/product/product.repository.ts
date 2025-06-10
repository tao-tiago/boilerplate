import { validate } from "class-validator"
import { inject, injectable } from "tsyringe"

import { Warning } from "@/errors"
import prisma from "@/database/client"

// Shared
import { IIndexParent } from "@/shared/helpers/interfaces"

// Interfaces
import { IProvider } from "../provider/provider.interface"
import {
  IProduct,
  IProductDTO,
  IProductDTOValidator,
  IProductInclude,
  IProductUpdate,
  IProductValidator
} from "./product.interface"

@injectable()
export class ProductRepository implements IProduct {
  private prisma = prisma

  constructor (
    @inject("ProviderRepository")
    private providerRepository: IProvider
  ) { }

  listProduct = async ({ id, orderBy, order, skip, take, filter }: IIndexParent) => {
    const where = {
      providerId: id
    }

    Object.entries(filter).forEach(([key, value]) => {
      Object.assign(where, {
        [key]: {
          contains: value,
          mode: "insensitive"
        }
      })
    })

    const [count, rows] = await this.prisma.$transaction([
      this.prisma.product.count({
        where
      }),
      this.prisma.product.findMany({
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

  createProduct = async (payload: IProductDTO) => {
    const { name, providerId } = payload

    const request = new IProductDTOValidator({ name, providerId })

    const errors = await validate(request)

    if (errors.length > 0) { throw new Warning(errors, 400) }

    await this.providerRepository.findProviderById(providerId)

    try {
      await this.prisma.product.create({
        data: {
          name,
          providerId
        }
      })

      return ["Produto cadastrado com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível cadastrar o produto!", 500, {
        payload,
        operation: "ProductRepository Class | createProduct()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  getProduct = async (id: string) => {
    const product = await this.findProductById(id, {
      provider: true
    })

    if (!product) { throw new Warning("O produto não foi encontrado!", 404) }

    return product
  }

  updateProduct = async (payload: IProductUpdate) => {
    const { id, name } = payload

    const request = new IProductValidator({ name })

    const errors = await validate(request)

    if (errors.length > 0) { throw new Warning(errors, 400) }

    await this.findProductById(id)

    try {
      await this.prisma.product.update({
        where: {
          id
        },
        data: {
          name
        }
      })

      return ["Produto atualizado com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível atualizar o produto!", 500, {
        payload,
        operation: "ProductRepository Class | updateProduct()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  deleteProduct = async (id: string) => {
    await this.findProductById(id)

    try {
      await this.prisma.product.delete({
        where: {
          id
        }
      })

      return ["Produto excluído com sucesso"]
    } catch (error) {
      throw new Warning(
        "Não foi possível atualizar o produto!", 500, {
        operation: "ProductRepository Class | deleteProduct()",
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }

  findProductById = async (id: string, include: IProductInclude = {
    provider: false
  }) => {
    return await this.prisma.product.findUnique({
      where: {
        id
      },
      include
    })
  }
}
