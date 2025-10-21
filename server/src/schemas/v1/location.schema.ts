import { z } from 'zod'

export const createLocationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Location name is required')
  })
})
