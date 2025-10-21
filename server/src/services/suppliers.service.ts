import prisma from '@/utils/prisma'
import logger from '@/config/logger'
import { UnexpectedError } from '@/errors/apiErrors'

export const createSupplier = async (name: string) => {
  const methodName = 'createSupplier'
  logger.info(`${methodName} is called`, { name })
  try {
    logger.info(`${methodName} is finished`)
    return await prisma.supplier.create({
      data: { name }
    })
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpecte error in ${methodName}`)
  }
}

export const getAllSuppliers = async () => {
  const methodName = 'getAllSuppliers'
  logger.info(`${methodName} is called`)
  try {
    logger.info(`${methodName} is finished`)
    return await prisma.supplier.findMany()
  } catch (e: any) {
    logger.error(`Error in ${methodName}`, { message: e.message })
    throw new UnexpectedError(`Unexpected error in ${methodName}`)
  }
}
