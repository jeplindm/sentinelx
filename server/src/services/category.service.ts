import prisma from '@/utils/prisma'
import logger from '@/config/logger'
import { UnexpectedError } from '@/errors/apiErrors'

export const createCategory = async (name: string) => {
  const methodName = 'createCategory'
  logger.info(`${methodName} is called`, { name })
  try {
    logger.info(`${methodName} is finished`)
    return await prisma.category.create({
      data: { name }
    })
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpected error in ${methodName}`)
  }
}

export const getAllCategories = async () => {
  const methodName = 'getAllCategories'
  logger.info(`${methodName} is called`)
  try {
    logger.info(`${methodName} is finished`)
    return await prisma.category.findMany()
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpected error in ${methodName}`)
  }
}
