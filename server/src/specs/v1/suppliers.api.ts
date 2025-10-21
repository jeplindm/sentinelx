export const supplierSpec = {
  '/api/v1/suppliers': {
    post: {
      security: [{ bearerAuth: [] }],
      tags: ['Suppliers'],
      summary: 'Create a new supplier',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string', example: 'SHI International' }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'Supplier created successfully.' },
        '401': { description: 'Unauthorized,' },
        '403': { description: 'Forbidden.' }
      }
    },
    get: {
      security: [{ bearerAuth: [] }],
      tags: ['Suppliers'],
      summary: 'Get all suppliers',
      responses: {
        '200': { description: 'List of all suppliers.' },
        '401': { description: 'Unauthorized.' }
      }
    }
  }
}
