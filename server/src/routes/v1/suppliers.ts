import { Role } from '@prisma/client'
import { auth } from '@/middleware/auth.middleware'
import { rbac } from '@/middleware/rbac.middleware'
import { validate } from '@/middleware/validate'
import { createSupplierSchema } from '@/schemas/v1/supplier.schema'
import {
  handleCreateSupplier,
  handleGetAllSuppliers
} from '@/controllers/supplier.controller'

export const post = [
  auth,
  rbac([Role.ADMIN, Role.STAFF]),
  validate(createSupplierSchema),
  handleCreateSupplier
]

export const get = [auth, handleGetAllSuppliers]
