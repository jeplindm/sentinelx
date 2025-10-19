import { handleRegister } from '@/controllers/auth.controller'
import { registerSchema } from '@/schemas/v1/auth.schema'
import { validate } from '@/middleware/validate'

export const post = [validate(registerSchema), handleRegister]
