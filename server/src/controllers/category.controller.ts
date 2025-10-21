import { NextFunction, Request, Response } from 'express'
import * as categoryService from '@/services/category.service'
import logger from '@/config/logger'

export const handleCreateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleCreateCategory'
  try {
    const { name } = req.body
    const newCategory = await categoryService.createCategory(name)
    res.status(201).json(newCategory)
  } catch (e) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}

export const handleGetAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const methodName = 'handleGetAllCategories'
  try {
    const categories = await categoryService.getAllCategories()
    res.status(200).json(categories)
  } catch (e) {
    logger.error(`Error in ${methodName}`)
    next(e)
  }
}
