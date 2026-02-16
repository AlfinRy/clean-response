/**
 * Represents a successful API response
 */
export interface SuccessResponse<T = unknown> {
  success: true
  message: string
  data: T
  timestamp: string
}

/**
 * Represents an error API response
 */
export interface ErrorResponse {
  success: false
  message: string
  code?: number
  timestamp: string
}

/**
 * Metadata for paginated responses
 */
export interface PaginationMeta {
  page: number
  perPage: number
  total: number
  totalPages: number
}

/**
 * Represents a paginated API response
 */
export interface PaginatedResponse<T = unknown> {
  success: true
  message: string
  data: T[]
  meta: PaginationMeta
  timestamp: string
}

/**
 * Standard API response type (union of all response types)
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse | PaginatedResponse<T>
