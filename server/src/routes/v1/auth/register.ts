import { Request, Response } from 'express'

import { handleRegister } from '@/controllers/auth.controller'

export const post = async (req: Request, res: Response) => {
  await handleRegister(req, res)
}
