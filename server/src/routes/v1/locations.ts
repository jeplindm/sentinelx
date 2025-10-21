import { Role } from '@prisma/client'
import { auth } from '@/middleware/auth.middleware'
import { rbac } from '@/middleware/rbac.middleware'
import { validate } from '@/middleware/validate'
import { createLocationSchema } from '@/schemas/v1/location.schema'
import {
  handleCreateLocation,
  handleGetAllLocations
} from '@/controllers/location.controller'

export const post = [
  auth,
  rbac([Role.ADMIN, Role.STAFF]),
  validate(createLocationSchema),
  handleCreateLocation
]

export const get = [auth, handleGetAllLocations]
