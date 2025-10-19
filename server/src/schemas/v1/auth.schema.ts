import { z } from 'zod'
import { Role } from '@prisma/client'

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),

    lastName: z.string().min(1, 'Last name is required'),

    email: z.string().min(1, 'Email is required').email('Not a valid email'),

    password: z.string().min(8, 'Password must be at least 8 characters long'),

    role: z.enum([Role.ADMIN, Role.STAFF, Role.EMPLOYEE]).optional()
  })
})

export const loginSchema = z.object({
  body: z.object({
    email: z.string().min(1, 'Email is required').email('Not valid email'),
    password: z.string().min(1, 'Password is required')
  })
})
