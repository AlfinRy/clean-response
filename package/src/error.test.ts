import { describe, it, expect } from 'vitest';
import { error } from './error';

describe('error', () => {
  it('should create an error response with message', () => {
    const message = 'Something went wrong';
    const response = error(message);

    expect(response).toEqual({
      success: false,
      message,
      code: 500,
      timestamp: expect.any(String),
    });
  });

  it('should create an error response with custom code', () => {
    const message = 'User not found';
    const code = 404;
    const response = error(message, code);

    expect(response).toEqual({
      success: false,
      message,
      code,
      timestamp: expect.any(String),
    });
  });

  it('should include ISO timestamp', () => {
    const response = error('Error');
    const timestamp = new Date(response.timestamp);

    expect(timestamp.toISOString()).toBe(response.timestamp);
  });

  it('should work with different HTTP status codes', () => {
    const badRequest = error('Bad request', 400);
    const unauthorized = error('Unauthorized', 401);
    const forbidden = error('Forbidden', 403);
    const notFound = error('Not found', 404);

    expect(badRequest.code).toBe(400);
    expect(unauthorized.code).toBe(401);
    expect(forbidden.code).toBe(403);
    expect(notFound.code).toBe(404);
  });

  it('should handle empty messages', () => {
    const response = error('');
    expect(response.message).toBe('');
  });

  it('should include requestId when provided in options', () => {
    const response = error('Not found', 404, { requestId: 'req-123' });

    expect(response.requestId).toBe('req-123');
    expect(response.code).toBe(404);
  });

  it('should include errors array when provided in options', () => {
    const errors = [{ field: 'email', message: 'Invalid email', code: 'INVALID_EMAIL' }];
    const response = error('Validation failed', 422, { errors });

    expect(response.errors).toEqual(errors);
    expect(response.code).toBe(422);
  });

  it('should include stack trace when provided in options', () => {
    const stack = 'Error: Test\n    at test.ts:10:15';
    const response = error('Error', 500, { stack });

    expect(response.stack).toBe(stack);
  });

  it('should include details when provided in options', () => {
    const details = { userId: 123, action: 'delete' };
    const response = error('Action failed', 400, { details });

    expect(response.details).toEqual(details);
  });

  it('should include multiple options', () => {
    const response = error('Validation failed', 422, {
      requestId: 'req-456',
      errors: [{ field: 'name', message: 'Required' }],
      details: { field: 'name' },
    });

    expect(response.requestId).toBe('req-456');
    expect(response.errors).toEqual([{ field: 'name', message: 'Required' }]);
    expect(response.details).toEqual({ field: 'name' });
    expect(response.code).toBe(422);
  });

  it('should not include optional fields when options is not provided', () => {
    const response = error('Error', 500);

    expect(response.requestId).toBeUndefined();
    expect(response.errors).toBeUndefined();
    expect(response.stack).toBeUndefined();
    expect(response.details).toBeUndefined();
  });
});
