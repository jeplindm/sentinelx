export const categoriesSpec = {
  '/api/v1/categories': {
    post: {
      security: [{ bearerAuth: [] }],
      tags: ['Categories'],
      summary: 'Create a new category',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string', example: 'Laptops' }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'Category created successfully.' },
        '401': { description: 'Unauthorized,' },
        '403': { description: 'Forbidden.' }
      }
    },
    get: {
      security: [{ bearerAuth: [] }],
      tags: ['Categories'],
      summary: 'Get all categories',
      responses: {
        '200': { description: 'List of all categories.' },
        '401': { description: 'Unauthorized.' }
      }
    }
  }
}
