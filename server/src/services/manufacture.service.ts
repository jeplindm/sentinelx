import prisma from '@/utils/prisma'
import logger from '@/config/logger'
import { UnexpectedError } from '@/errors/apiErrors'

export const createManufacture = async (name: string) => {
  const methodName = 'createManufacture'
  logger.info(`${methodName} is called`, { name })
  try {
    logger.info(`${methodName} is finished`)
    return await prisma.manufacturer.create({
      data: { name }
    })
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpecte error in ${methodName}`)
  }
}

export const getAllManufactures = async () => {
  const methodName = 'getAllManufactures'
  logger.info(`${methodName} is called`)
  try {
    logger.info(`${methodName} is finished`)
    return await prisma.manufacturer.findMany()
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpected error in ${methodName}`)
  }
}
