import { NextFunction, Request, Response } from 'express'
import { ZodError, ZodObject } from 'zod'
import logger from '@/config/logger'

export const validate =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      return next()
    } catch (e: any) {
      if (e instanceof ZodError) {
        logger.warn(`Validation error: ${JSON.stringify(e.issues)}`)
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: e.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message
          }))
        })
      }

      logger.error('Unhandled error in validation middleware:', e)
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      })
    }
  }
