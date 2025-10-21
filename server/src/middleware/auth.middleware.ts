import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthError } from '@/errors/apiErrors'
import { JwtPayload } from '@/types/express'
import logger from '@/config/logger'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) throw new AuthError('No auth token provided')

    const token = authHeader?.split(' ')[1]
    if (!token) throw new AuthError('Malformed auth token')

    const JWT_SECRET = process.env.JWT_SECRET as string
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload

    req.user = {
      userId: decoded.userId,
      role: decoded.role
    }

    next()
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      logger.warn(`JWT Error: ${e.message}`)
      next(new AuthError('Invalid or expired token.'))
    }
    next(e)
  }
}
