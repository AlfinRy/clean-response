import type { SuccessResponse } from './types'

/**
 * Creates a standardized success response
 *
 * @template T - The type of data being returned
 * @param {T} data - The response data
 * @param {string} [message="Success"] - Optional success message
 * @returns {SuccessResponse<T>} A standardized success response object
 *
 * @example
 * ```ts
 * import { success } from 'clean-response'
 *
 * // Simple usage
 * const response = success({ id: 1, name: 'John' })
 *
 * // With custom message
 * const response = success({ id: 1, name: 'John' }, 'User created successfully')
 * ```
 */
export function success<T = unknown>(
  data: T,
  message: string = 'Success'
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  }
}
