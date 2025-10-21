export const manufactureSpec = {
  '/api/v1/manufactures': {
    post: {
      security: [{ bearerAuth: [] }],
      tags: ['Manufactures'],
      summary: 'Create a new manufacture',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string', example: 'Apple' }
              }
            }
          }
        }
      },
      responses: {
        '201': { description: 'Manufacture created successfully.' },
        '401': { description: 'Unauthorized,' },
        '403': { description: 'Forbidden.' }
      }
    },
    get: {
      security: [{ bearerAuth: [] }],
      tags: ['Manufactures'],
      summary: 'Get all manufactures',
      responses: {
        '200': { description: 'List of all manufactures.' },
        '401': { description: 'Unauthorized.' }
      }
    }
  }
}
