import { Request } from "express"
import { IIndex } from "./interfaces"

export const filters = ({ query }: Request): IIndex => {
  const { orderBy: ob, order: o, page: p, size: s, ...f } = query

  const orderBy = ob?.toString() ?? "createdAt"
  const order = o as "asc" | "desc" || "desc"
  const page = parseInt(p?.toString() ?? "1")
  const size = parseInt(s?.toString() ?? "10")

  const skip = (page - 1) * size
  const take = size
  const filter = f as { [key: string]: string }

  return {
    orderBy,
    order,
    skip,
    take,
    filter
  }
}
