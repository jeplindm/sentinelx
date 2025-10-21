import { NextFunction, Request, Response } from 'express'
import * as manufactureService from '@/services/manufacture.service'
import logger from '@/config/logger'

export const handleCreateManufacture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleCreateManufacture'
  try {
    const { name } = req.body
    const newManufacture = await manufactureService.createManufacture(name)
    res.status(201).json(newManufacture)
  } catch (e) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}

export const handleGetAllManufactures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleGetAllManufactures'
  try {
    const manufactures = await manufactureService.getAllManufactures()
    res.status(200).json(manufactures)
  } catch (e) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}
