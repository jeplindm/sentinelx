const RegisterRequestBody = {
  email: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    passwordHash: { type: 'string', format: 'password', minLength: 8 },
    role: { type: 'string' }
  }
}

const RegisterResponse = {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  email: { type: 'string', format: 'email' },
  role: { type: 'string' }
}

export const registerSpec = {
  '/api/v1/auth/register': {
    post: {
      tags: ['Authentication'],
      summary: 'Register a user',
      description:
        'Registers a user with first name, last name, email, passwordHash and role',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'firstName',
                'lastName',
                'email',
                'passwordHash',
                'role'
              ],
              properties: RegisterRequestBody
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Successful register, returns user details.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: RegisterResponse
              }
            }
          }
        },
        '400': {
          description: 'Bad request.'
        }
      }
    }
  }
}
