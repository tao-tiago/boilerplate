export interface IObject {
  [key: string]: string
}

export interface IIndex {
  orderBy: string
  order: "asc" | "desc"
  skip: number,
  take: number,
  filter: IObject
}

export type IIndexParent = {
  id: string
} & IIndex

export interface IError {
  message: string
  code: number
}
