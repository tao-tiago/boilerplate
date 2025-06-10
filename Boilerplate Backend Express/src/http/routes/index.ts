import { Router } from "express"

import { health } from "./health.routes"
import { provider } from "./provider.routes"

const router = Router()

router.use("/health", health)
router.use("/providers", provider)

export { router }
