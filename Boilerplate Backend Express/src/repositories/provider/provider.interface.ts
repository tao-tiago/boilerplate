import { TypeProvider } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"

import { fieldInvalid, fieldRequired } from "@/shared/helpers/messages"
import { IIndex } from "@/shared/helpers/interfaces"

export interface IProviderDTO {
  corporateName: string
  typeProvider: TypeProvider
}

export interface IProviderUpdate extends IProviderDTO {
  id: string
}

export interface IProviderResponse extends IProviderUpdate {
  createdAt: Date
}

export class IProviderValidator implements IProviderDTO {
  @IsNotEmpty({ message: fieldRequired("Nome do Fornecedor") })
  @IsString({ message: fieldInvalid("Nome do Fornecedor") })
    corporateName: string

  @IsNotEmpty({ message: fieldRequired("Tipo de Fornecedor") })
  @IsEnum(TypeProvider, { message: fieldInvalid("Tipo de Fornecedor") })
    typeProvider: TypeProvider

  constructor (data: IProviderValidator) {
    Object.assign(this, data)
  }
}

export interface IProvider {
  listProvider (data: IIndex): Promise<{
    count: number
    rows: IProviderResponse[]
  }>
  createProvider (data: IProviderDTO): Promise<string[]>
  getProvider (id: string): Promise<IProviderResponse>
  updateProvider (data: IProviderUpdate): Promise<string[]>
  deleteProvider (id: string): Promise<string[]>
  findProviderById (id: string): Promise<IProviderResponse | null>
}
