# clean-response

[![npm version](https://badge.fury.io/js/%40leviosary%2Fclean-response.svg)](https://www.npmjs.com/package/@leviosary/clean-response)
[![Downloads](https://img.shields.io/npm/dm/%40leviosary%2Fclean-response.svg)](https://www.npmjs.com/package/@leviosary/clean-response)
[![License](https://img.shields.io/npm/l/%40leviosary%2Fclean-response.svg)](LICENSE)
[![Build Status](https://github.com/leviosary/clean-response/actions/workflows/ci.yml/badge.svg)](https://github.com/leviosary/clean-response/actions/workflows/ci.yml)

> A lightweight, type-safe TypeScript package for standardizing API responses in backend applications (Express, Fastify, Node.js).

**clean-response** provides a simple, universal way to standardize your API responses across any Node.js backend framework.

## Features

- ✅ **Type-Safe**: Full TypeScript support with comprehensive type definitions
- ⚡ **Lightweight**: Zero runtime dependencies, tiny bundle size (<1KB)
- 🔧 **Framework Agnostic**: Works with Express, Fastify, and vanilla Node.js
- 🎯 **Clean API**: Simple, intuitive functions for consistent responses
- 📄 **Pagination Support**: Built-in paginated response helper
- 🛡️ **HTTP Helpers**: Convenience methods for common HTTP status codes
- 🔍 **Request Tracing**: Built-in request ID support for debugging
- ✅ **Validation Errors**: Field-level error support for form validation

## Installation

```bash
npm install @leviosary/clean-response
```

```bash
yarn add @leviosary/clean-response
```

```bash
pnpm add @leviosary/clean-response
```

## Installation

```bash
npm install clean-response
```

```bash
yarn add clean-response
```

```bash
pnpm add clean-response
```

## Usage

### Success Response

```typescript
import { success } from '@leviosary/clean-response';
import express from 'express';

const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id);
  res.json(success(user, 'User retrieved successfully'));
  // {
  //   "success": true,
  //   "message": "User retrieved successfully",
  //   "data": { "id": 1, "name": "John" },
  //   "timestamp": "2024-01-15T10:30:00.000Z"
  // }
});

// With request ID for tracing
app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id);
  const requestId = req.headers['x-request-id'] as string;
  res.json(success(user, 'User retrieved successfully', requestId));
});
```

### Error Response

```typescript
import { error } from '@leviosary/clean-response';

app.delete('/users/:id', async (req, res) => {
  const deleted = await deleteUser(req.params.id);

  if (!deleted) {
    return res.status(404).json(
      error('User not found', 404, {
        requestId: req.headers['x-request-id'] as string,
      })
    );
    // {
    //   "success": false,
    //   "message": "User not found",
    //   "code": 404,
    //   "timestamp": "2024-01-15T10:30:00.000Z",
    //   "requestId": "req-123"
    // }
  }

  res.json(success(null, 'User deleted'));
});

// With field validation errors
app.post('/users', async (req, res) => {
  const errors = validateUser(req.body);
  if (errors.length > 0) {
    return res.status(422).json(
      error('Validation failed', 422, {
        errors: [
          { field: 'email', message: 'Invalid email format', code: 'INVALID_EMAIL' },
          { field: 'password', message: 'Password too short', code: 'PASSWORD_TOO_SHORT' },
        ],
      })
    );
  }
});
```

### HTTP Convenience Methods

```typescript
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
} from '@leviosary/clean-response';

// Created (201)
app.post('/users', async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(created(user, 'User created successfully'));
});

// No Content (204)
app.delete('/users/:id', async (req, res) => {
  await deleteUser(req.params.id);
  res.status(204).json(noContent('User deleted'));
});

// Unauthorized (401)
app.post('/login', async (req, res) => {
  const valid = await validateCredentials(req.body);
  if (!valid) {
    return res.status(401).json(unauthorized('Invalid credentials'));
  }
});

// Forbidden (403)
app.delete('/admin/users/:id', async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json(forbidden('Admin access required'));
  }
});

// Not Found (404)
app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id);
  if (!user) {
    return res.status(404).json(notFound('User'));
  }
});

// Validation Error (422)
app.post('/users', async (req, res) => {
  const { errors, valid } = await validateUser(req.body);
  if (!valid) {
    return res.status(422).json(validationError(errors));
  }
});

// Bad Request (400)
app.get('/users', async (req, res) => {
  const { sort } = req.query;
  if (typeof sort !== 'string' || !['name', 'email'].includes(sort)) {
    return res.status(400).json(badRequest('Invalid sort parameter'));
  }
});

// Conflict (409)
app.post('/users', async (req, res) => {
  const exists = await checkEmailExists(req.body.email);
  if (exists) {
    return res.status(409).json(conflict('Email already exists'));
  }
});

// Internal Server Error (500)
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(success(users));
  } catch (err) {
    res.status(500).json(internalServerError('Database error', err as Error));
  }
});
```

### Paginated Response

```typescript
import { paginate } from '@leviosary/clean-response';

app.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const { users, total } = await getUsers(Number(page), Number(limit));

  res.json(
    paginate(
      users,
      {
        page: Number(page),
        perPage: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
      'Users retrieved successfully'
    )
  );
  // {
  //   "success": true,
  //   "message": "Users retrieved successfully",
  //   "data": [...],
  //   "meta": {
  //     "page": 1,
  //     "perPage": 10,
  //     "total": 50,
  //     "totalPages": 5
  //   },
  //   "timestamp": "2024-01-15T10:30:00.000Z"
  // }
});
```

## API Reference

### Core Functions

#### `success<T>(data: T, message?: string, requestId?: string): SuccessResponse<T>`

Creates a standardized success response.

**Parameters:**

- `data` - The response data (any type)
- `message` - Optional success message (defaults to "Success")
- `requestId` - Optional request ID for tracing

**Returns:** `SuccessResponse<T>`

---

#### `error(message: string, code?: number, options?: ErrorOptions): ErrorResponse`

Creates a standardized error response.

**Parameters:**

- `message` - The error message
- `code` - Optional error code (defaults to 500)
- `options` - Optional additional properties
  - `requestId` - Request ID for tracing
  - `errors` - Array of field-level validation errors
  - `stack` - Stack trace (for development)
  - `details` - Additional error details

**Returns:** `ErrorResponse`

---

#### `paginate<T>(data: T[], meta: PaginationMeta, message?: string, requestId?: string): PaginatedResponse<T>`

Creates a standardized paginated response.

**Parameters:**

- `data` - Array of items for the current page
- `meta` - Pagination metadata object
  - `page` - Current page number
  - `perPage` - Items per page
  - `total` - Total number of items
  - `totalPages` - Total number of pages
- `message` - Optional success message (defaults to "Success")
- `requestId` - Optional request ID for tracing

**Returns:** `PaginatedResponse<T>`

### HTTP Convenience Methods

| Function                                | HTTP Code | Description                   |
| --------------------------------------- | --------- | ----------------------------- |
| `created(data, message?)`               | 201       | Resource created successfully |
| `noContent(message?)`                   | 204       | Resource deleted successfully |
| `unauthorized(message?)`                | 401       | Authentication required       |
| `forbidden(message?)`                   | 403       | Access denied                 |
| `notFound(resource?)`                   | 404       | Resource not found            |
| `badRequest(message?)`                  | 400       | Invalid request               |
| `validationError(errors, message?)`     | 422       | Validation failed             |
| `conflict(message?)`                    | 409       | Resource conflict             |
| `internalServerError(message?, error?)` | 500       | Server error                  |
| `serviceUnavailable(message?)`          | 503       | Service unavailable           |

## TypeScript Support

This package is written in TypeScript and includes full type definitions:

```typescript
import type {
  SuccessResponse,
  ErrorResponse,
  PaginatedResponse,
  PaginationMeta,
  ApiResponse,
  FieldError,
  InferData,
  InferErrorCode,
} from '@leviosary/clean-response';

// Use types in your code
const handler: (data: User) => SuccessResponse<User> = (data) => {
  return success(data);
};

// Infer data type from response
type UserData = InferData<SuccessResponse<User>>; // User

// Type-safe field errors
const errors: FieldError[] = [{ field: 'email', message: 'Invalid email', code: 'INVALID_EMAIL' }];
```

### Response Types

```typescript
interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
  requestId?: string;
}

interface ErrorResponse {
  success: false;
  message: string;
  code?: number;
  timestamp: string;
  requestId?: string;
  errors?: FieldError[];
  stack?: string;
  details?: Record<string, unknown>;
}

interface PaginatedResponse<T = unknown> {
  success: true;
  message: string;
  data: T[];
  meta: PaginationMeta;
  timestamp: string;
  requestId?: string;
}
```

## Framework Examples

### Express

```typescript
import express from 'express';
import { success, error, notFound, created } from '@leviosary/clean-response';

const app = express();

app.get('/api/users', async (req, res) => {
  const users = await getUsers();
  res.json(success(users));
});

app.post('/api/users', async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(created(user));
});

app.use((err, req, res, next) => {
  res.status(500).json(
    error(err.message, 500, {
      requestId: req.headers['x-request-id'] as string,
    })
  );
});
```

### Fastify

```typescript
import Fastify from 'fastify';
import { success, error, notFound } from '@leviosary/clean-response';

const fastify = Fastify();

fastify.get('/api/users', async (request, reply) => {
  const users = await getUsers();
  reply.send(success(users));
});

fastify.setErrorHandler((err, request, reply) => {
  reply.status(500).send(
    error(err.message, 500, {
      requestId: request.headers['x-request-id'] as string,
    })
  );
});
```

### Vanilla Node.js

```typescript
import { createServer } from 'http';
import { success, error, notFound } from '@leviosary/clean-response';

const server = createServer(async (req, res) => {
  if (req.url === '/api/users') {
    const users = await getUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(success(users)));
  }
});
```

## Comparison with Alternatives

| Feature                   | clean-response | Alternatives |
| ------------------------- | -------------- | ------------ |
| Zero Runtime Dependencies | ✅             | ❌           |
| TypeScript First          | ✅             | ⚠️           |
| Request Tracing           | ✅             | ❌           |
| Validation Errors         | ✅             | ❌           |
| HTTP Helpers              | ✅             | ⚠️           |
| Pagination Support        | ✅             | ⚠️           |
| Bundle Size               | <1KB           | 2-10KB+      |

## License

MIT

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.

## Support

If you find a bug or have a feature request, please open an issue on [GitHub](https://github.com/leviosary/clean-response/issues).
