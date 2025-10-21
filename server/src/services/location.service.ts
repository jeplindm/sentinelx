import prisma from '@/utils/prisma'
import logger from '@/config/logger'
import { UnexpectedError } from '@/errors/apiErrors'

export const createLocation = async (name: string) => {
  const methodName = 'createLocation'
  logger.info(`${methodName} is called`, { name })
  try {
    logger.info(`${methodName} is finished`)
    return await prisma.location.create({
      data: { name }
    })
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpecte error in ${methodName}`)
  }
}

export const getAllLocations = async () => {
  const methodName = 'getAllLocations'
  logger.info(`${methodName} is called`)
  try {
    logger.info(`${methodName} is finished`)
    return await prisma.location.findMany()
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpected error in ${methodName}`)
  }
}
