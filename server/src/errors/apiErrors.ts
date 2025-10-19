export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode

    // This is necessary to make 'instanceof' work correctly with custom errors in TypeScript
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

/**
 * Represents a 400 Bad Request error.
 * Use this when the client sends invalid data (e.g., validation fails).
 */
export class InputError extends ApiError {
  constructor(message: string = 'Bad Request') {
    super(message, 400)
  }
}

/**
 * Represents a 404 Not Found error.
 * Use this when a requested resource does not exist.
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
  }
}

/**
 * Represents a 401 Unauthorized error.
 * Use this when a user needs to be authenticated but is not.
 */
export class AuthError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401)
  }
}

/**
 * Represents a 403 Forbidden error.
 * Use this when a user is authenticated but does not have permission to access a resource.
 */
export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(message, 403)
  }
}

/**
 * Represents a 502 Forbidden error.
 * Use this when something unexpected condition happens.
 */
export class UnexpectedError extends ApiError {
  constructor(message: string = 'Unexpected') {
    super(message, 502)
  }
}
