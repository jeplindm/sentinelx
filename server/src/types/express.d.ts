import { Role } from '@prisma/client'

export interface JwtPayload {
  userId: number
  role: Role
}

declare global {
  namespace Express {
    export interface Request {
      user: JwtPayload
    }
  }
}
