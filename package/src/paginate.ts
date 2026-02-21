import type { PaginatedResponse, PaginationMeta } from './types';

/**
 * Creates a standardized paginated response
 *
 * @template T - The type of items in the data array
 * @param {T[]} data - The array of items for the current page
 * @param {PaginationMeta} meta - Pagination metadata
 * @param {string} [message="Success"] - Optional success message
 * @param {string} [requestId] - Optional request ID for tracing
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
 *
 * // With request ID
 * const response = paginate(users, meta, 'Users retrieved successfully', 'req-123')
 * ```
 */
export function paginate<T = unknown>(
  data: T[],
  meta: PaginationMeta,
  message: string = 'Success',
  requestId?: string
): PaginatedResponse<T> {
  const response: PaginatedResponse<T> = {
    success: true,
    message,
    data,
    meta,
    timestamp: new Date().toISOString(),
  };

  if (requestId) {
    response.requestId = requestId;
  }

  return response;
}
