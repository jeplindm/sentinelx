import { z } from 'zod'

export const createManufactureSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Manfucature name is required')
  })
})
