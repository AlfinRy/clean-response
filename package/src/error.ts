import type { ErrorResponse, FieldError } from './types';

/**
 * Options for creating an error response
 */
export interface ErrorOptions {
  /** Request ID for tracing */
  requestId?: string;
  /** Array of field-level validation errors */
  errors?: FieldError[];
  /** Stack trace (typically included only in development) */
  stack?: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * Creates a standardized error response
 *
 * @param {string} message - The error message
 * @param {number} [code=500] - Optional error code (defaults to 500)
 * @param {ErrorOptions} [options] - Optional additional error properties
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
 * // With request ID
 * const response = error('Unauthorized', 401, { requestId: 'req-123' })
 *
 * // With field errors for validation
 * const response = error('Validation failed', 422, {
 *   errors: [
 *     { field: 'email', message: 'Invalid email' }
 *   ]
 * })
 * ```
 */
export function error(message: string, code: number = 500, options?: ErrorOptions): ErrorResponse {
  const response: ErrorResponse = {
    success: false,
    message,
    code,
    timestamp: new Date().toISOString(),
  };

  if (options?.requestId) {
    response.requestId = options.requestId;
  }

  if (options?.errors) {
    response.errors = options.errors;
  }

  if (options?.stack) {
    response.stack = options.stack;
  }

  if (options?.details) {
    response.details = options.details;
  }

  return response;
}
