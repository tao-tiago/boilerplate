import { Request, Response } from "express"
import { inject, injectable } from "tsyringe"

import { ProductRepository } from "@/repositories/product/product.repository"
import { filters } from "@/shared/helpers/filters"

@injectable()
export class ProductController {
  constructor (
    @inject("ProductRepository")
    private productRepository: ProductRepository
  ) { }

  listProduct = (request: Request, response: Response) => {
    const { providerId: id } = request.params
    const { orderBy, order, skip, take, filter } = filters(request)

    this.productRepository.listProduct({
      id,
      orderBy,
      order,
      skip,
      take,
      filter
    }).then((products) => {
      response.status(200).json(products)
    })
  }

  createProduct = (request: Request, response: Response) => {
    const { providerId } = request.params
    const { name } = request.body

    this.productRepository.createProduct({
      name,
      providerId
    }).then((message) => {
      response.status(201).json({ message })
    })
  }

  getProduct = (request: Request, response: Response) => {
    const { id } = request.params

    this.productRepository.getProduct(id).then((product) => {
      response.status(200).json(product)
    })
  }

  updateProduct = (request: Request, response: Response) => {
    const { id } = request.params
    const { name } = request.body

    this.productRepository.updateProduct({
      id,
      name
    }).then((message) => {
      response.status(200).json({ message })
    })
  }

  deleteProduct = (request: Request, response: Response) => {
    const { id } = request.params

    this.productRepository.deleteProduct(id).then((message) => {
      response.status(200).json({ message })
    })
  }
}
