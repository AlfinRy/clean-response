import { describe, it, expect } from 'vitest';
import { paginate } from './paginate';

describe('paginate', () => {
  const meta = {
    page: 1,
    perPage: 10,
    total: 50,
    totalPages: 5,
  };

  it('should create a paginated response with data and meta', () => {
    const data = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ];
    const response = paginate(data, meta);

    expect(response).toEqual({
      success: true,
      message: 'Success',
      data,
      meta,
      timestamp: expect.any(String),
    });
  });

  it('should create a paginated response with custom message', () => {
    const data = [{ id: 1, name: 'John' }];
    const message = 'Users retrieved successfully';
    const response = paginate(data, meta, message);

    expect(response.message).toBe(message);
  });

  it('should include ISO timestamp', () => {
    const data = [{ id: 1 }];
    const response = paginate(data, meta);
    const timestamp = new Date(response.timestamp);

    expect(timestamp.toISOString()).toBe(response.timestamp);
  });

  it('should work with empty data array', () => {
    const response = paginate([], meta);

    expect(response.data).toEqual([]);
    expect(response.meta.total).toBe(50);
  });

  it('should work with different page numbers', () => {
    const page2Meta = { page: 2, perPage: 10, total: 50, totalPages: 5 };
    const response = paginate([{ id: 11 }], page2Meta);

    expect(response.meta.page).toBe(2);
  });

  it('should calculate total pages correctly', () => {
    const lastPageMeta = { page: 5, perPage: 10, total: 50, totalPages: 5 };
    const response = paginate([{ id: 41 }], lastPageMeta);

    expect(response.meta.totalPages).toBe(5);
  });

  it('should handle partial last page', () => {
    const partialMeta = { page: 5, perPage: 10, total: 46, totalPages: 5 };
    const data = Array(6)
      .fill(null)
      .map((_, i) => ({ id: 40 + i }));
    const response = paginate(data, partialMeta);

    expect(response.data.length).toBe(6);
    expect(response.meta.total).toBe(46);
  });

  it('should include requestId when provided', () => {
    const data = [{ id: 1 }];
    const response = paginate(data, meta, 'Success', 'req-789');

    expect(response.requestId).toBe('req-789');
    expect(response.data).toEqual(data);
  });

  it('should not include requestId when not provided', () => {
    const response = paginate([{ id: 1 }], meta);

    expect(response.requestId).toBeUndefined();
  });

  it('should work with all parameters', () => {
    const data = [{ id: 1, name: 'John' }];
    const response = paginate(data, meta, 'Users found', 'req-999');

    expect(response).toEqual({
      success: true,
      message: 'Users found',
      data,
      meta,
      requestId: 'req-999',
      timestamp: expect.any(String),
    });
  });
});
