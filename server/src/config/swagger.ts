import swaggerJsDoc from 'swagger-jsdoc'
import { loginSpec } from '@/specs/v1/auth/login.api'
import { registerSpec } from '@/specs/v1/auth/register.api'

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sentinelx IT Asset Management API',
      version: '1.0.0',
      description:
        'API documentation for the Sentinel ITAM platform, used to manage hardware, software and user assignments.'
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Development server' }
    ],
    paths: {
      ...loginSpec,
      ...registerSpec
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/v1/*.ts']
}

const swaggerSpec = swaggerJsDoc(options)

export default swaggerSpec
