import type { SuccessResponse, ErrorResponse, FieldError } from './types';

/**
 * Creates a standardized success response for resource creation (HTTP 201)
 *
 * @template T - The type of data being returned
 * @param {T} data - The created resource data
 * @param {string} [message="Resource created successfully"] - Optional success message
 * @returns {SuccessResponse<T>} A standardized success response object
 *
 * @example
 * ```ts
 * import { created } from 'clean-response'
 *
 * const response = created({ id: 1, name: 'John' }, 'User created successfully')
 * ```
 */
export function created<T = unknown>(
  data: T,
  message: string = 'Resource created successfully'
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized success response for successful deletion (HTTP 204)
 *
 * @param {string} [message="Resource deleted successfully"] - Optional success message
 * @returns {SuccessResponse<null>} A standardized success response object with null data
 *
 * @example
 * ```ts
 * import { noContent } from 'clean-response'
 *
 * const response = noContent('User deleted successfully')
 * ```
 */
export function noContent(
  message: string = 'Resource deleted successfully'
): SuccessResponse<null> {
  return {
    success: true,
    message,
    data: null,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized unauthorized error response (HTTP 401)
 *
 * @param {string} [message="Unauthorized"] - Optional error message
 * @returns {ErrorResponse} A standardized error response object with 401 code
 *
 * @example
 * ```ts
 * import { unauthorized } from 'clean-response'
 *
 * const response = unauthorized('Invalid credentials')
 * ```
 */
export function unauthorized(message: string = 'Unauthorized'): ErrorResponse {
  return {
    success: false,
    message,
    code: 401,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized forbidden error response (HTTP 403)
 *
 * @param {string} [message="Forbidden"] - Optional error message
 * @returns {ErrorResponse} A standardized error response object with 403 code
 *
 * @example
 * ```ts
 * import { forbidden } from 'clean-response'
 *
 * const response = forbidden('You do not have access to this resource')
 * ```
 */
export function forbidden(message: string = 'Forbidden'): ErrorResponse {
  return {
    success: false,
    message,
    code: 403,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized not found error response (HTTP 404)
 *
 * @param {string} [resource] - Optional resource name for the error message
 * @returns {ErrorResponse} A standardized error response object with 404 code
 *
 * @example
 * ```ts
 * import { notFound } from 'clean-response'
 *
 * const response = notFound('User')
 * // { success: false, message: 'User not found', code: 404, ... }
 * ```
 */
export function notFound(resource?: string): ErrorResponse {
  const message = resource ? `${resource} not found` : 'Resource not found';
  return {
    success: false,
    message,
    code: 404,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized validation error response (HTTP 422)
 *
 * @param {FieldError[]} errors - Array of field-level validation errors
 * @param {string} [message="Validation failed"] - Optional error message
 * @returns {ErrorResponse} A standardized error response object with 422 code and field errors
 *
 * @example
 * ```ts
 * import { validationError } from 'clean-response'
 *
 * const response = validationError([
 *   { field: 'email', message: 'Invalid email format', code: 'INVALID_EMAIL' },
 *   { field: 'password', message: 'Password is too short', code: 'PASSWORD_TOO_SHORT' }
 * ])
 * ```
 */
export function validationError(
  errors: FieldError[],
  message: string = 'Validation failed'
): ErrorResponse {
  return {
    success: false,
    message,
    code: 422,
    errors,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized bad request error response (HTTP 400)
 *
 * @param {string} [message="Bad request"] - Optional error message
 * @returns {ErrorResponse} A standardized error response object with 400 code
 *
 * @example
 * ```ts
 * import { badRequest } from 'clean-response'
 *
 * const response = badRequest('Invalid request parameters')
 * ```
 */
export function badRequest(message: string = 'Bad request'): ErrorResponse {
  return {
    success: false,
    message,
    code: 400,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized conflict error response (HTTP 409)
 *
 * @param {string} [message="Resource conflict"] - Optional error message
 * @returns {ErrorResponse} A standardized error response object with 409 code
 *
 * @example
 * ```ts
 * import { conflict } from 'clean-response'
 *
 * const response = conflict('Email already exists')
 * ```
 */
export function conflict(message: string = 'Resource conflict'): ErrorResponse {
  return {
    success: false,
    message,
    code: 409,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Creates a standardized internal server error response (HTTP 500)
 *
 * @param {string} [message="Internal server error"] - Optional error message
 * @param {Error} [originalError] - Optional original error for stack trace
 * @returns {ErrorResponse} A standardized error response object with 500 code
 *
 * @example
 * ```ts
 * import { internalServerError } from 'clean-response'
 *
 * try {
 *   // some operation
 * } catch (err) {
 *   return res.status(500).json(internalServerError('Database error', err))
 * }
 * ```
 */
export function internalServerError(
  message: string = 'Internal server error',
  originalError?: Error
): ErrorResponse {
  const response: ErrorResponse = {
    success: false,
    message,
    code: 500,
    timestamp: new Date().toISOString(),
  };

  if (originalError?.stack && process.env.NODE_ENV !== 'production') {
    response.stack = originalError.stack;
  }

  return response;
}

/**
 * Creates a standardized service unavailable error response (HTTP 503)
 *
 * @param {string} [message="Service unavailable"] - Optional error message
 * @returns {ErrorResponse} A standardized error response object with 503 code
 *
 * @example
 * ```ts
 * import { serviceUnavailable } from 'clean-response'
 *
 * const response = serviceUnavailable('Maintenance mode')
 * ```
 */
export function serviceUnavailable(message: string = 'Service unavailable'): ErrorResponse {
  return {
    success: false,
    message,
    code: 503,
    timestamp: new Date().toISOString(),
  };
}
