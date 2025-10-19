import { Request, Response, NextFunction } from 'express'
import { ApiError } from '@/errors/apiErrors'
import logger from '@/config/logger'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    logger.warn(`API Error: ${error.statusCode} - ${error.message}`)
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  // For all other unexpected errors, log the full error and send a generic 500 response.
  // This prevents leaking sensitive implementation details to the client.
  logger.error('Unhandled Internal Server Error:', error)

  return res.status(500).json({
    status: 'error',
    message: 'An internal server error occurred.'
  })
}
