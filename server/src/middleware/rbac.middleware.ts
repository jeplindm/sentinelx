import { ForbiddenError } from '@/errors/apiErrors'
import { Role } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export const rbac = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user.role

      if (!allowedRoles.includes(userRole)) {
        throw new ForbiddenError(
          'You do not have permission to perform this action'
        )
      }

      next()
    } catch (e) {
      next(e)
    }
  }
}
