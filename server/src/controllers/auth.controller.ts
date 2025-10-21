import { NextFunction, Request, Response } from 'express'
import { registerUser, loginUser } from '@/services/auth.service'
import logger from '@/config/logger'
import { AuthError } from '@/errors/apiErrors'

export const handleRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleRegister'
  try {
    const newUser = await registerUser(req.body)
    res.status(201).json(newUser)
  } catch (e: any) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleLogin'
  try {
    const { email, password } = req.body
    const token = await loginUser(email, password)
    if (!token) {
      throw new AuthError('Invalid email or password')
    }
    res.status(200).json({ token })
  } catch (e: any) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}
