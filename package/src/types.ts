/**
 * Represents a successful API response
 */
export interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
  requestId?: string;
}

/**
 * Represents a field-level validation error
 */
export interface FieldError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Represents an error API response
 */
export interface ErrorResponse {
  success: false;
  message: string;
  code?: number;
  timestamp: string;
  requestId?: string;
  errors?: FieldError[];
  stack?: string;
  details?: Record<string, unknown>;
}

/**
 * Metadata for paginated responses
 */
export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

/**
 * Represents a paginated API response
 */
export interface PaginatedResponse<T = unknown> {
  success: true;
  message: string;
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
  requestId?: string;
}

/**
 * Standard API response type (union of all response types)
 */
export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse | PaginatedResponse<T>;

/**
 * Utility type to extract data from SuccessResponse
 */
export type InferData<T> = T extends SuccessResponse<infer D> ? D : never;

/**
 * Utility type to extract error code from ErrorResponse
 */
export type InferErrorCode<T> = T extends ErrorResponse ? T['code'] : never;
