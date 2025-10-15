import { Request, Response } from 'express'
import { registerUser, loginUser } from '@/services/auth.service'

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const newUser = await registerUser(req.body)
    res.status(201).json(newUser)
  } catch (e: any) {
    if (e.code === 'P2002') {
      return res.status(409).json({ message: 'Email already exists.' })
    }
    res.status(500).json({ message: 'An error ocurred during registration' })
  }
}

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const token = await loginUser(email, password)

    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    res.status(200).json({ token })
  } catch (error: any) {
    res.status(500).json({ message: 'An error occurred during login.' })
  }
}
