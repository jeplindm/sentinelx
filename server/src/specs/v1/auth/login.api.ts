export const loginSpec = {
  '/api/v1/auth/login': {
    post: {
      tags: ['Authentication'],
      summary: 'Log in a user',
      description:
        'Authenticates a user with email and password, returning a JWT.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', format: 'email' },
                password: { type: 'string', format: 'password' }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Successful login, returns a JWT token.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { token: { type: 'string' } }
              }
            }
          }
        },
        '401': {
          description: 'Invalid credentials.'
        }
      }
    }
  }
}
