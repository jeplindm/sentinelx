import { NextFunction, Request, Response } from 'express'
import * as locationService from '@/services/location.service'
import logger from '@/config/logger'

export const handleCreateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleCreateLocation'
  try {
    const { name } = req.body
    const newLocation = await locationService.createLocation(name)
    res.status(201).json(newLocation)
  } catch (e) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}

export const handleGetAllLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleGetAllLocations'
  try {
    const locations = await locationService.getAllLocations()
    res.status(200).json(locations)
  } catch (e) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}
