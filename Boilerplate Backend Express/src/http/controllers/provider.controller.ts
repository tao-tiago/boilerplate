import { Request, Response } from "express"
import { inject, injectable } from "tsyringe"

import { ProviderRepository } from "@/repositories/provider/provider.repository"
import { filters } from "@/shared/helpers/filters"

@injectable()
export class ProviderController {
  constructor (
    @inject("ProviderRepository")
    private providerRepository: ProviderRepository
  ) { }

  listProvider = (request: Request, response: Response) => {
    const { orderBy, order, skip, take, filter } = filters(request)

    this.providerRepository.listProvider({
      orderBy,
      order,
      skip,
      take,
      filter
    }).then((providers) => {
      response.status(200).json(providers)
    })
  }

  createProvider = (request: Request, response: Response) => {
    const {
      corporateName,
      typeProvider
    } = request.body

    this.providerRepository.createProvider({
      corporateName,
      typeProvider
    }).then((message) => {
      response.status(201).json({ message })
    })
  }

  getProvider = (request: Request, response: Response) => {
    const { id } = request.params

    this.providerRepository.getProvider(id).then((provider) => {
      response.status(200).json(provider)
    })
  }

  updateProvider = (request: Request, response: Response) => {
    const { id } = request.params
    const {
      corporateName,
      typeProvider
    } = request.body

    this.providerRepository.updateProvider({
      id,
      corporateName,
      typeProvider
    }).then((message) => {
      response.status(200).json({ message })
    })
  }

  deleteProvider = (request: Request, response: Response) => {
    const { id } = request.params

    this.providerRepository.deleteProvider(id).then((message) => {
      response.status(200).json({ message })
    })
  }
}
