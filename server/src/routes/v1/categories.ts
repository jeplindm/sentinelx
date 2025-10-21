import { Role } from '@prisma/client'
import {
  handleCreateCategory,
  handleGetAllCategories
} from '@/controllers/category.controller'
import { auth } from '@/middleware/auth.middleware'
import { rbac } from '@/middleware/rbac.middleware'
import { validate } from '@/middleware/validate'
import { createCategorySchema } from '@/schemas/v1/category.schema'

export const post = [
  auth,
  rbac([Role.ADMIN, Role.STAFF]),
  validate(createCategorySchema),
  handleCreateCategory
]

export const get = [auth, handleGetAllCategories]
