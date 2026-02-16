/**
 * clean-response
 *
 * A lightweight, type-safe TypeScript package for standardizing API responses
 * in backend applications (Express, Fastify, Node.js).
 *
 * @packageDocumentation
 */

// Export functions
export { success } from './success'
export { error } from './error'
export { paginate } from './paginate'

// Export types
export type {
  SuccessResponse,
  ErrorResponse,
  PaginationMeta,
  PaginatedResponse,
  ApiResponse,
} from './types'
