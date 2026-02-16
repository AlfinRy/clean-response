import type { ErrorResponse } from './types'

/**
 * Creates a standardized error response
 *
 * @param {string} message - The error message
 * @param {number} [code=500] - Optional error code (defaults to 500)
 * @returns {ErrorResponse} A standardized error response object
 *
 * @example
 * ```ts
 * import { error } from 'clean-response'
 *
 * // Default error code (500)
 * const response = error('Something went wrong')
 *
 * // With custom error code
 * const response = error('User not found', 404)
 *
 * // With custom error code
 * const response = error('Unauthorized', 401)
 * ```
 */
export function error(
  message: string,
  code: number = 500
): ErrorResponse {
  return {
    success: false,
    message,
    code,
    timestamp: new Date().toISOString(),
  }
}
