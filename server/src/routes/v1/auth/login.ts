import { Request, Response } from 'express'
import { handleLogin } from '@/controllers/auth.controller'

export const post = async (req: Request, res: Response) => {
  await handleLogin(req, res)
}
