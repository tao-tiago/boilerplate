/* eslint-disable no-console */
import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"

import "express-async-errors"
import "reflect-metadata"
import "./shared/container"

import { constants } from "./constants"
import { router } from "./http/routes"
import { interceptor } from "./http/middlewares/interceptor.middleware"
import { warning } from "./http/middlewares/error.middleware"

import swaggerDocument from "./swagger"

const app = express()

app.use(cors({
  origin: [
    /http:\/\/localhost:\d+/
  ]
}))

app.use(express.json())
app.use(interceptor)
app.use(router)
app.use(warning)

app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(JSON.parse(swaggerDocument))
)

app.listen(constants.PORT, () => {
  console.log(`> Address API: http://localhost:${constants.PORT}`)
  console.log(`> Address Doc: http://localhost:${constants.PORT}/api-docs`)
})
