import { IsNotEmpty, IsString } from "class-validator"

import { IProviderResponse } from "../provider/provider.interface"
import { fieldInvalid, fieldRequired } from "@/shared/helpers/messages"
import { IIndexParent } from "@/shared/helpers/interfaces"

export interface IProductDTO {
  name: string
  providerId: string
}

export interface IProductUpdate extends Omit<IProductDTO, "providerId"> {
  id: string
}

interface IProductResponse extends IProductUpdate {
  providerId: string
  createdAt: Date
  provider?: IProviderResponse
}

export interface IProductInclude {
  provider: boolean
}

export class IProductValidator {
  @IsNotEmpty({ message: fieldRequired("Nome do Produto") })
  @IsString({ message: fieldInvalid("Nome do Produto") })
    name: string

  constructor (data: IProductValidator) {
    Object.assign(this, data)
  }
}

export class IProductDTOValidator extends IProductValidator implements IProductDTO {
  @IsNotEmpty({ message: fieldRequired("ID do Fornecedor") })
  @IsString({ message: fieldInvalid("ID do Fornecedor") })
    providerId: string

  constructor (data: IProductDTOValidator) {
    super(data)
    Object.assign(this, data)
  }
}

export interface IProduct {
  listProduct (data: IIndexParent): Promise<{
    count: number
    rows: IProductResponse[]
  }>
  createProduct (data: IProductDTO): Promise<string[]>
  getProduct (id: string): Promise<IProductResponse>
  updateProduct (data: IProductUpdate): Promise<string[]>
  deleteProduct (id: string): Promise<string[]>
  findProductById (id: string): Promise<IProductResponse | null>
}
