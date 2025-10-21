export const locationSpec = {
  '/api/v1/locations': {
    post: {
      security: [{ bearerAuth: [] }],
      tags: ['Locations'],
      summary: 'Create a new location',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string', example: 'Jakarta' }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'Location created successfully.' },
        '401': { description: 'Unauthorized,' },
        '403': { description: 'Forbidden.' }
      }
    },
    get: {
      security: [{ bearerAuth: [] }],
      tags: ['Locations'],
      summary: 'Get all locations',
      responses: {
        '200': { description: 'List of all locations.' },
        '401': { description: 'Unauthorized.' }
      }
    }
  }
}
