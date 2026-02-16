# clean-response

> A lightweight, type-safe TypeScript package for standardizing API responses in backend applications (Express, Fastify, Node.js).

**clean-response** provides a simple, universal way to standardize your API responses across any Node.js backend framework.

## Features

- ✅ **Type-Safe**: Full TypeScript support with comprehensive type definitions
- ⚡ **Lightweight**: Zero dependencies, tiny bundle size
- 🔧 **Framework Agnostic**: Works with Express, Fastify, and vanilla Node.js
- 🎯 **Clean API**: Simple, intuitive functions for consistent responses
- 📄 **Pagination Support**: Built-in paginated response helper

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
import { success } from 'clean-response'
import express from 'express'

const app = express()

app.get('/users/:id', async (req, res) => {
  const user = await findUser(req.params.id)
  res.json(success(user, 'User retrieved successfully'))
  // {
  //   "success": true,
  //   "message": "User retrieved successfully",
  //   "data": { "id": 1, "name": "John" },
  //   "timestamp": "2024-01-15T10:30:00.000Z"
  // }
})
```

### Error Response

```typescript
import { error } from 'clean-response'

app.delete('/users/:id', async (req, res) => {
  const deleted = await deleteUser(req.params.id)

  if (!deleted) {
    return res.status(404).json(error('User not found', 404))
    // {
    //   "success": false,
    //   "message": "User not found",
    //   "code": 404,
    //   "timestamp": "2024-01-15T10:30:00.000Z"
    // }
  }

  res.json(success(null, 'User deleted'))
})
```

### Paginated Response

```typescript
import { paginate } from 'clean-response'

app.get('/users', async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  const { users, total } = await getUsers(Number(page), Number(limit))

  res.json(paginate(users, {
    page: Number(page),
    perPage: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit))
  }, 'Users retrieved successfully'))
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
})
```

## API Reference

### `success<T>(data: T, message?: string): SuccessResponse<T>`

Creates a standardized success response.

**Parameters:**
- `data` - The response data (any type)
- `message` - Optional success message (defaults to "Success")

**Returns:** `SuccessResponse<T>`

---

### `error(message: string, code?: number): ErrorResponse`

Creates a standardized error response.

**Parameters:**
- `message` - The error message
- `code` - Optional error code (defaults to 500)

**Returns:** `ErrorResponse`

---

### `paginate<T>(data: T[], meta: PaginationMeta, message?: string): PaginatedResponse<T>`

Creates a standardized paginated response.

**Parameters:**
- `data` - Array of items for the current page
- `meta` - Pagination metadata object
  - `page` - Current page number
  - `perPage` - Items per page
  - `total` - Total number of items
  - `totalPages` - Total number of pages
- `message` - Optional success message (defaults to "Success")

**Returns:** `PaginatedResponse<T>`

## TypeScript Support

This package is written in TypeScript and includes full type definitions:

```typescript
import type {
  SuccessResponse,
  ErrorResponse,
  PaginatedResponse,
  PaginationMeta,
  ApiResponse
} from 'clean-response'

// Use types in your code
const handler: (data: User) => SuccessResponse<User> = (data) => {
  return success(data)
}
```

## Framework Examples

### Express

```typescript
import express from 'express'
import { success, error } from 'clean-response'

const app = express()

app.get('/api/users', (req, res) => {
  const users = await getUsers()
  res.json(success(users))
})

app.use((err, req, res, next) => {
  res.status(500).json(error(err.message))
})
```

### Fastify

```typescript
import Fastify from 'fastify'
import { success, error } from 'clean-response'

const fastify = Fastify()

fastify.get('/api/users', async (request, reply) => {
  const users = await getUsers()
  reply.send(success(users))
})

fastify.setErrorHandler((error, request, reply) => {
  reply.status(500).send(error(error.message))
})
```

### Vanilla Node.js

```typescript
import { createServer } from 'http'
import { success, error } from 'clean-response'

const server = createServer(async (req, res) => {
  if (req.url === '/api/users') {
    const users = await getUsers()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(success(users)))
  }
})
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you find a bug or have a feature request, please open an issue on GitHub.
