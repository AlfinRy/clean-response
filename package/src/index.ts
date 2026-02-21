/**
 * clean-response
 *
 * A lightweight, type-safe TypeScript package for standardizing API responses
 * in backend applications (Express, Fastify, Node.js).
 *
 * @packageDocumentation
 */

// Core functions
export { success } from './success';
export { error, type ErrorOptions } from './error';
export { paginate } from './paginate';

// HTTP convenience functions
export {
  created,
  noContent,
  unauthorized,
  forbidden,
  notFound,
  validationError,
  badRequest,
  conflict,
  internalServerError,
  serviceUnavailable,
} from './http';

// Export types
export type {
  SuccessResponse,
  ErrorResponse,
  FieldError,
  PaginationMeta,
  PaginatedResponse,
  ApiResponse,
  InferData,
  InferErrorCode,
} from './types';
