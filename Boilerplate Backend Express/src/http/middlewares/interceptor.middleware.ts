import { Request, Response, NextFunction } from "express"
import { api } from "@/api/service"

const interceptor = function (request: Request, _response: Response, next: NextFunction) {
  const accessToken = request.headers.authorization

  if (accessToken) {
    const bearerToken = accessToken.split(" ")[1]

    api.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${bearerToken}`
      return config
    })
  }

  next()
}

export { interceptor }
