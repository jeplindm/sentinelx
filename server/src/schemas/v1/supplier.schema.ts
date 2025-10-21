import { z } from 'zod'

export const createSupplierSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Supplier name is required')
  })
})
