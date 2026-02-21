<div align="center">

# clean-response

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![npm](https://img.shields.io/npm/v/@leviosary/clean-response)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)

**Standardize API responses with type-safe, lightweight functions**

Works with Express, Fastify, and vanilla Node.js. Zero dependencies, under 1KB.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Reference](#-api-reference) • [Examples](#-complete-examples)

</div>

---

## ✨ Features

- **🔷 TypeScript First** - Full TypeScript support with comprehensive type definitions
- **🪶 Lightweight** - Zero dependencies, tiny bundle size under 1KB minified
- **⚡ Framework Agnostic** - Works with Express, Fastify, and vanilla Node.js
- **🎯 Clean API** - Simple, intuitive functions, no boilerplate required
- **📦 Pagination Ready** - Built-in paginated response helpers
- **🔒 Type Safe** - Fully typed with utility types for type inference
- **🛡️ HTTP Helpers** - Convenience methods for common HTTP status codes
- **🔍 Request Tracing** - Built-in request ID support for debugging

## 📦 Installation

```bash
# npm
npm install @leviosary/clean-response

# yarn
yarn add @leviosary/clean-response

# pnpm
pnpm add @leviosary/clean-response
```

## 🚀 Usage

### Success Response

```typescript
import { success } from '@leviosary/clean-response'

app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id)
  const requestId = req.headers['x-request-id']

  return res.json(success(user, 'User retrieved successfully', requestId))
})
```

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "requestId": "req-123"
}
```

### Error Response

```typescript
import { error } from '@leviosary/clean-response'

app.delete('/users/:id', async (req, res) => {
  const deleted = await deleteUser(req.params.id)
  if (!deleted) {
    return res.status(404).json(error('User not found', 404, {
      requestId: req.headers['x-request-id']
    }))
  }
  return res.json(success(null, 'User deleted'))
})
```

**Response:**
```json
{
  "success": false,
  "message": "User not found",
  "code": 404,
  "timestamp": "2024-01-15T10:30:00.000Z",
  "requestId": "req-123"
}
```

### Validation Errors

```typescript
import { validationError } from '@leviosary/clean-response'

app.post('/users', async (req, res) => {
  const errors = validateUser(req.body)
  if (errors.length > 0) {
    return res.status(422).json(validationError(errors))
  }
  // ...
})
```

**Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "code": 422,
  "errors": [
    { "field": "email", "message": "Invalid email format", "code": "INVALID_EMAIL" },
    { "field": "password", "message": "Password too short", "code": "PASSWORD_TOO_SHORT" }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Paginated Response

```typescript
import { paginate } from '@leviosary/clean-response'

app.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const { users, total } = await getUsers(Number(page), Number(limit))

  return res.json(paginate(users, {
    page: Number(page),
    perPage: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit))
  }, 'Users retrieved successfully'))
})
```

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" }
  ],
  "meta": {
    "page": 1,
    "perPage": 10,
    "total": 25,
    "totalPages": 3
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 📚 API Reference

### Core Functions

#### `success(data, message?, requestId?)`

Creates a standardized success response.

**Parameters:**
- `data` (any) - The response data
- `message` (string, optional) - Success message (default: "Success")
- `requestId` (string, optional) - Request ID for tracing

**Returns:** `SuccessResponse<T>`

---

#### `error(message, code?, options?)`

Creates a standardized error response.

**Parameters:**
- `message` (string) - Error message
- `code` (number, optional) - HTTP status code (default: 500)
- `options` (object, optional)
  - `requestId` (string) - Request ID for tracing
  - `errors` (FieldError[]) - Field-level validation errors
  - `stack` (string) - Stack trace (development only)
  - `details` (object) - Additional error details

**Returns:** `ErrorResponse`

---

#### `paginate(data, meta, message?, requestId?)`

Creates a paginated response with metadata.

**Parameters:**
- `data` (any[]) - Array of items
- `meta` (object) - Pagination metadata
  - `page` (number) - Current page number
  - `perPage` (number) - Items per page
  - `total` (number) - Total number of items
  - `totalPages` (number) - Total number of pages
- `message` (string, optional) - Success message
- `requestId` (string, optional) - Request ID for tracing

**Returns:** `PaginatedResponse<T>`

### HTTP Convenience Methods

| Function | HTTP Code | Description |
|----------|-----------|-------------|
| `created(data, message?)` | 201 | Resource created successfully |
| `noContent(message?)` | 204 | Resource deleted successfully |
| `unauthorized(message?)` | 401 | Authentication required |
| `forbidden(message?)` | 403 | Access denied |
| `notFound(resource?)` | 404 | Resource not found |
| `badRequest(message?)` | 400 | Invalid request |
| `validationError(errors, message?)` | 422 | Validation failed |
| `conflict(message?)` | 409 | Resource conflict |
| `internalServerError(message?, error?)` | 500 | Server error |
| `serviceUnavailable(message?)` | 503 | Service unavailable |

### TypeScript Types

```typescript
import type {
  SuccessResponse,
  ErrorResponse,
  PaginatedResponse,
  PaginationMeta,
  ApiResponse,
  FieldError,
  InferData,
  InferErrorCode
} from '@leviosary/clean-response'

// Infer data type from response
type UserData = InferData<SuccessResponse<User>>  // User

// Field-level error structure
interface FieldError {
  field: string
  message: string
  code?: string
}
```

## 🎯 Why clean-response?

### Before ❌

Inconsistent response formats:

```typescript
// Different formats everywhere
res.send({ data: user, status: 'ok' })
res.json({ success: true, result: user })
res.json({ user, timestamp: Date.now() })
res.status(400).json({ error: 'Invalid input', code: 400 })
```

### After ✅

Consistent, predictable responses:

```typescript
import { success, error, notFound, validationError } from '@leviosary/clean-response'

res.json(success(user))
res.status(404).json(notFound('User'))
res.status(422).json(validationError(errors))
```

## 🌐 Framework Examples

### Express.js

```typescript
import express from 'express'
import { success, error, paginate, created, notFound } from '@leviosary/clean-response'

const app = express()

app.get('/users/:id', async (req, res) => {
  try {
    const user = await findUser(req.params.id)
    if (!user) {
      return res.status(404).json(notFound('User'))
    }
    res.json(success(user))
  } catch (err) {
    res.status(500).json(error('Internal server error', 500))
  }
})

app.post('/users', async (req, res) => {
  const user = await createUser(req.body)
  res.status(201).json(created(user, 'User created successfully'))
})

app.listen(3000)
```

### Fastify

```typescript
import Fastify from 'fastify'
import { success, error, notFound } from '@leviosary/clean-response'

const fastify = Fastify()

fastify.get('/users/:id', async (request, reply) => {
  try {
    const user = await findUser((request.params as any).id)
    if (!user) {
      return reply.status(404).send(notFound('User'))
    }
    reply.send(success(user))
  } catch (err) {
    reply.status(500).send(error('Internal server error', 500))
  }
})

fastify.listen({ port: 3000 })
```

### Vanilla Node.js

```typescript
import { createServer } from 'http'
import { success, error } from '@leviosary/clean-response'

const server = createServer(async (req, res) => {
  if (req.url === '/api/users') {
    const users = await getUsers()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(success(users)))
  }
})

server.listen(3000)
```

## 📝 Complete Examples

### REST API with Express

```typescript
import express from 'express'
import {
  success,
  error,
  paginate,
  created,
  noContent,
  notFound,
  validationError,
  unauthorized
} from '@leviosary/clean-response'

const app = express()
app.use(express.json())

// GET all users (with pagination)
app.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const { users, total } = await getUsers(Number(page), Number(limit))

  return res.json(paginate(users, {
    page: Number(page),
    perPage: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit))
  }))
})

// GET single user
app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id)
  if (!user) {
    return res.status(404).json(notFound('User'))
  }
  return res.json(success(user))
})

// POST create user
app.post('/users', async (req, res) => {
  // Validate input
  const errors = validateUser(req.body)
  if (errors.length > 0) {
    return res.status(422).json(validationError(errors))
  }

  const user = await createUser(req.body)
  return res.status(201).json(created(user, 'User created successfully'))
})

// PUT update user
app.put('/users/:id', async (req, res) => {
  const user = await updateUser(req.params.id, req.body)
  if (!user) {
    return res.status(404).json(notFound('User'))
  }
  return res.json(success(user, 'User updated successfully'))
})

// DELETE user
app.delete('/users/:id', async (req, res) => {
  const deleted = await deleteUser(req.params.id)
  if (!deleted) {
    return res.status(404).json(notFound('User'))
  }
  return res.json(noContent('User deleted successfully'))
})

// Error handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err)
  res.status(500).json(error('Internal server error', 500, {
    stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined
  }))
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

## 🤝 Contributing

Contributions are welcome! Please see [package/CONTRIBUTING.md](package/CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Leviosary**

- GitHub: [@leviosary](https://github.com/leviosary)

## 📚 More Information

- **Package Documentation**: [package/README.md](package/README.md)
- **Changelog**: [package/CHANGELOG.md](package/CHANGELOG.md)
- **NPM Package**: [@leviosary/clean-response](https://www.npmjs.com/package/@leviosary/clean-response)

## ⭐ Show Your Support

If this project helped you, please consider giving it a star ⭐

---

Made with ❤️ by [Leviosary](https://github.com/leviosary)
