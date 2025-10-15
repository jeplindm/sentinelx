import { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prisma'

type UserRegistrationData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>

export const registerUser = async (
  userData: UserRegistrationData
): Promise<Omit<User, 'passwordHash'>> => {
  const hashedPassword = await bcrypt.hash(userData.passwordHash, 10)

  const newUser = await prisma.user.create({
    data: {
      ...userData,
      passwordHash: hashedPassword
    }
  })

  const { passwordHash, ...userWithoutPassword } = newUser

  return userWithoutPassword
}

export const loginUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return null
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  )

  return token
}
