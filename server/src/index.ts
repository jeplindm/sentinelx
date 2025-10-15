import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import { loadRoutes } from './utils/loadRoutes'

dotenv.config()

const startServer = async () => {
  const app = express()
  const PORT = process.env.PORT || 3001

  app.use(express.json())

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/api/health', (req, res) => {
    res.send({ message: 'Server is healthy and running!' })
  })

  await loadRoutes(app)

  app.listen(PORT, () => {
    console.log(`\n🚀 Sentinelx server is running on http://localhost:${PORT}`)
    console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs\n`)
  })
}

startServer()
