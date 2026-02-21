import { describe, it, expect } from 'vitest';
import {
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

describe('HTTP Convenience Functions', () => {
  describe('created', () => {
    it('should create a 201 response with data', () => {
      const data = { id: 1, name: 'John' };
      const response = created(data, 'User created');

      expect(response).toEqual({
        success: true,
        message: 'User created',
        data,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when not provided', () => {
      const response = created({ id: 1 });

      expect(response.message).toBe('Resource created successfully');
      expect(response.success).toBe(true);
    });
  });

  describe('noContent', () => {
    it('should create a 204 response with null data', () => {
      const response = noContent('Deleted');

      expect(response).toEqual({
        success: true,
        message: 'Deleted',
        data: null,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when not provided', () => {
      const response = noContent();

      expect(response.message).toBe('Resource deleted successfully');
      expect(response.data).toBe(null);
    });
  });

  describe('unauthorized', () => {
    it('should create a 401 error response', () => {
      const response = unauthorized('Invalid credentials');

      expect(response).toEqual({
        success: false,
        message: 'Invalid credentials',
        code: 401,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when not provided', () => {
      const response = unauthorized();

      expect(response.message).toBe('Unauthorized');
      expect(response.code).toBe(401);
    });
  });

  describe('forbidden', () => {
    it('should create a 403 error response', () => {
      const response = forbidden('Access denied');

      expect(response).toEqual({
        success: false,
        message: 'Access denied',
        code: 403,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when not provided', () => {
      const response = forbidden();

      expect(response.message).toBe('Forbidden');
      expect(response.code).toBe(403);
    });
  });

  describe('notFound', () => {
    it('should create a 404 error response with resource name', () => {
      const response = notFound('User');

      expect(response).toEqual({
        success: false,
        message: 'User not found',
        code: 404,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when resource not provided', () => {
      const response = notFound();

      expect(response.message).toBe('Resource not found');
      expect(response.code).toBe(404);
    });
  });

  describe('validationError', () => {
    it('should create a 422 error response with field errors', () => {
      const errors = [
        { field: 'email', message: 'Invalid email', code: 'INVALID_EMAIL' },
        { field: 'password', message: 'Too short', code: 'TOO_SHORT' },
      ];
      const response = validationError(errors, 'Validation failed');

      expect(response).toEqual({
        success: false,
        message: 'Validation failed',
        code: 422,
        errors,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when not provided', () => {
      const errors = [{ field: 'name', message: 'Required' }];
      const response = validationError(errors);

      expect(response.message).toBe('Validation failed');
      expect(response.errors).toEqual(errors);
      expect(response.code).toBe(422);
    });
  });

  describe('badRequest', () => {
    it('should create a 400 error response', () => {
      const response = badRequest('Invalid parameters');

      expect(response).toEqual({
        success: false,
        message: 'Invalid parameters',
        code: 400,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when not provided', () => {
      const response = badRequest();

      expect(response.message).toBe('Bad request');
      expect(response.code).toBe(400);
    });
  });

  describe('conflict', () => {
    it('should create a 409 error response', () => {
      const response = conflict('Email already exists');

      expect(response).toEqual({
        success: false,
        message: 'Email already exists',
        code: 409,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when not provided', () => {
      const response = conflict();

      expect(response.message).toBe('Resource conflict');
      expect(response.code).toBe(409);
    });
  });

  describe('internalServerError', () => {
    it('should create a 500 error response', () => {
      const response = internalServerError('Database error');

      expect(response).toEqual({
        success: false,
        message: 'Database error',
        code: 500,
        timestamp: expect.any(String),
      });
    });

    it('should include stack trace in non-production', () => {
      const originalError = new Error('Original error');
      const response = internalServerError('Server error', originalError);

      expect(response.code).toBe(500);
      expect(response.stack).toBe(originalError.stack);
    });

    it('should not include stack trace when original error is not provided', () => {
      const response = internalServerError('Server error');

      expect(response.code).toBe(500);
      expect(response.stack).toBeUndefined();
    });

    it('should use default message when not provided', () => {
      const response = internalServerError();

      expect(response.message).toBe('Internal server error');
      expect(response.code).toBe(500);
    });
  });

  describe('serviceUnavailable', () => {
    it('should create a 503 error response', () => {
      const response = serviceUnavailable('Maintenance mode');

      expect(response).toEqual({
        success: false,
        message: 'Maintenance mode',
        code: 503,
        timestamp: expect.any(String),
      });
    });

    it('should use default message when not provided', () => {
      const response = serviceUnavailable();

      expect(response.message).toBe('Service unavailable');
      expect(response.code).toBe(503);
    });
  });
});
