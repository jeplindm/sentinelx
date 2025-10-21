import swaggerJsDoc from 'swagger-jsdoc'
import { loginSpec } from '@/specs/v1/auth/login.api'
import { registerSpec } from '@/specs/v1/auth/register.api'
import { categoriesSpec } from '@/specs/v1/categories.api'
import { manufactureSpec } from '@/specs/v1/manufactures.api'
import { supplierSpec } from '@/specs/v1/suppliers.api'
import { locationSpec } from '@/specs/v1/locations.api'

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sentinelx IT Asset Management API',
      version: '1.0.0',
      description:
        'API documentation for the Sentinelx ITAM platform, used to manage hardware, software and user assignments.'
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Development server' }
    ],
    paths: {
      ...loginSpec,
      ...registerSpec,
      ...categoriesSpec,
      ...manufactureSpec,
      ...supplierSpec,
      ...locationSpec
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
