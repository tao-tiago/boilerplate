import { Request, Response, NextFunction } from "express"

import { Warning } from "@/errors"
import { logger, payloadLogger } from "@/shared/helpers/logger"

const warning = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof Warning) {
    Object.assign(payloadLogger, {
      code: error.code,
      message: error.message,
      ...error.logger
    })
  }

  if (error instanceof Error) {
    Object.assign(payloadLogger, {
      errorMessage: error.message,
      stack: error.stack
    })
  }

  if (payloadLogger.code >= 500 && payloadLogger.code < 600) {
    logger.error(payloadLogger)
  }

  return response.status(payloadLogger.code).json({
    message: payloadLogger.message
  })
}

export { warning }
