import { Role } from '@prisma/client'
import { auth } from '@/middleware/auth.middleware'
import { rbac } from '@/middleware/rbac.middleware'
import { validate } from '@/middleware/validate'
import { createManufactureSchema } from '@/schemas/v1/manufacture.schema'
import {
  handleCreateManufacture,
  handleGetAllManufactures
} from '@/controllers/manufacture.controller'

export const post = [
  auth,
  rbac([Role.ADMIN, Role.STAFF]),
  validate(createManufactureSchema),
  handleCreateManufacture
]

export const get = [auth, handleGetAllManufactures]
