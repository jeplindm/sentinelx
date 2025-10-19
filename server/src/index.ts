import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import { loadRoutes } from './utils/loadRoutes'
import logger from '@/config/logger'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const startServer = async () => {
  const app = express()
  const PORT = process.env.PORT || 3001

  app.use(express.json())

  const stream: morgan.StreamOptions = {
    write: (message) => logger.http(message.trim())
  }
  app.use(morgan('tiny', { stream }))

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/api/health', (req, res) => {
    res.send({ message: 'Server is healthy and running!' })
  })

  await loadRoutes(app)

  app.use(errorHandler)

  app.listen(PORT, () => {
    logger.info(`🚀 Sentinelx server is running on http://localhost:${PORT}`)
    logger.info(`📚 API Docs available at http://localhost:${PORT}/api-docs\n`)
  })
}

startServer()
