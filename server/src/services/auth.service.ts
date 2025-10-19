import { User, Role, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prisma'
import logger from '@/config/logger'
import { InputError, UnexpectedError } from '@/errors/apiErrors'

export type UserRegistrationData = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
}

export const registerUser = async (
  userData: UserRegistrationData
): Promise<Omit<User, 'passwordHash'>> => {
  const methodName = 'registerUser'
  logger.info(`${methodName} is called`, { email: userData.email })
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const newUser = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        passwordHash: hashedPassword
      }
    })
    const { passwordHash, ...userWithoutPassword } = newUser
    logger.info(`${methodName} is finished`)
    return userWithoutPassword
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      throw new InputError('Email already exists.')
    }
    throw new UnexpectedError(`Unexpected error in ${methodName}`)
  }
}

export const loginUser = async (
  email: string,
  password: string
): Promise<string | null> => {
  const methodName = 'loginUser'
  logger.info(`${methodName} is called`, { email })
  try {
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

    logger.info(`${methodName} is finished`)
    return token
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpected error in ${methodName}`)
  }
}
