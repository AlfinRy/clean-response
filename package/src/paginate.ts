import type { PaginatedResponse, PaginationMeta } from './types'

/**
 * Creates a standardized paginated response
 *
 * @template T - The type of items in the data array
 * @param {T[]} data - The array of items for the current page
 * @param {PaginationMeta} meta - Pagination metadata
 * @param {string} [message="Success"] - Optional success message
 * @returns {PaginatedResponse<T>} A standardized paginated response object
 *
 * @example
 * ```ts
 * import { paginate } from 'clean-response'
 *
 * const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 *
 * const response = paginate(users, {
 *   page: 1,
 *   perPage: 10,
 *   total: 50,
 *   totalPages: 5
 * })
 *
 * // With custom message
 * const response = paginate(users, meta, 'Users retrieved successfully')
 * ```
 */
export function paginate<T = unknown>(
  data: T[],
  meta: PaginationMeta,
  message: string = 'Success'
): PaginatedResponse<T> {
  return {
    success: true,
    message,
    data,
    meta,
    timestamp: new Date().toISOString(),
  }
}
