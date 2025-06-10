import { Warning } from "@/errors"
import { logger } from "@/shared/helpers/logger"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("production"),
  PORT: z.string().default("3333"),
  API_SERVICE: z.string()
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  logger.error("Invalid environment variables", env.error.format())
  throw new Warning("Invalid environment variables")
}

export const constants = env.data
