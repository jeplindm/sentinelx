import { Express } from 'express'
import { glob } from 'glob'
import path from 'path'

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
const httpMethods: HttpMethod[] = ['get', 'post', 'put', 'delete', 'patch']

/**
 * Dynamically loads all route handlers from the `src/routes` directory,
 * maps them to API endpoints based on their file path, and registers them
 * with the Express application.
 * @param app The Express application instance.
 */
export const loadRoutes = async (app: Express): Promise<void> => {
  console.log('🔄 Loading routes...')

  // Use glob to find all .ts files under the routes directory, excluding test files.
  const routeFiles = await glob('src/routes/**/*.ts', {
    ignore: ['**/*.test.ts'] // It's good practice to exclude test files.
  })

  // Process each discovered route file.
  for (const filePath of routeFiles) {
    // Dynamically import the route handler module using its absolute path.
    const routeHandlers = await import(path.resolve(filePath))

    // Transform the file path into a URL-friendly API endpoint.
    // e.g., 'src/routes/v1/auth/login.ts' becomes '/api/v1/auth/login'
    const urlPath = filePath
      .replace('src/routes', '/api') // Prepend with /api
      .replace('.ts', '') // Remove the file extension
      .replace(/\/index$/, '') // Handle index files (e.g., 'users/index.ts' -> '/users')

    // Check for exported functions that match our defined HTTP methods.
    for (const method of httpMethods) {
      if (routeHandlers[method]) {
        // If a handler for the method exists (e.g., export const post = ...),
        // register it with the Express app for the generated URL path.
        app[method](urlPath, routeHandlers[method])

        // Log the successful registration for debugging and confirmation.
        console.log(`✅ Registered route: ${method.toUpperCase()} ${urlPath}`)
      }
    }
  }
  console.log('🚀 Route loading complete.')
}
