import { NextFunction, Request, Response } from 'express'
import * as supplierService from '@/services/suppliers.service'
import logger from '@/config/logger'

export const handleCreateSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleCreateSupplier'
  try {
    const { name } = req.body
    const newSupplier = await supplierService.createSupplier(name)
    res.status(201).json(newSupplier)
  } catch (e) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}

export const handleGetAllSuppliers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleGetAllSuppliers'
  try {
    const suppliers = await supplierService.getAllSuppliers()
    res.status(200).json(suppliers)
  } catch (e) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}
