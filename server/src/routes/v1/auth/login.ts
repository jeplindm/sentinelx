import { handleLogin } from '@/controllers/auth.controller'
import { validate } from '@/middleware/validate'
import { loginSchema } from '@/schemas/v1/auth.schema'

export const post = [validate(loginSchema), handleLogin]
