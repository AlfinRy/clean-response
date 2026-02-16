<div align="center">

# clean-response

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![npm](https://img.shields.io/npm/v/clean-response)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)

**Standardize API responses with type-safe, lightweight functions**

Works like your response formatter. Add, update, and remove with clean functions you already know.

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API](#api) • [Examples](#examples)

</div>

---

## ✨ Features

- **🔷 TypeScript First** - Full TypeScript support with comprehensive type definitions for IntelliSense and autocomplete
- **🪶 Lightweight** - Zero dependencies. Tiny bundle size under 1KB minified
- **⚡ Framework Agnostic** - Works seamlessly with Express, Fastify, and vanilla Node.js applications
- **🎯 Clean API** - Simple, intuitive functions that just work. No boilerplate required
- **📦 Pagination Ready** - Built-in pagination response helpers
- **🔒 Type Safe** - Fully typed for better developer experience

## 📦 Installation

Install the package using your favorite package manager:

```bash
# npm
npm install clean-response

# yarn
yarn add clean-response

# pnpm
pnpm add clean-response
```

## 🚀 Usage

### Basic Success Response

```typescript
import { success } from 'clean-response'

app.get('/users/:id', (req, res) => {
  const user = await findUser(req.params.id)
  return res.json(success(user, 'User retrieved successfully'))
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
  }
}
```

### Error Response

```typescript
import { error } from 'clean-response'

app.delete('/users/:id', (req, res) => {
  const deleted = await deleteUser(req.params.id)
  if (!deleted) {
    return res.status(404).json(error('User not found', 404))
  }
  return res.json(success(null, 'User deleted'))
})
```

**Response:**
```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "details": null
  }
}
```

### Paginated Response

```typescript
import { paginate } from 'clean-response'

app.get('/users', (req, res) => {
  const { page = 1, limit = 10 } = req.query
  const { users, total } = await getUsers(page, limit)

  return res.json(paginate(users, {
    page: Number(page),
    perPage: Number(limit),
    total,
    totalPages: Math.ceil(total / limit)
  }))
})
```

**Response:**
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" }
  ],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 📚 API Reference

### `success(data, message?)`

Creates a standardized success response.

**Parameters:**
- `data` (any) - The response data
- `message` (string, optional) - Success message

**Returns:**
```typescript
{
  success: true,
  message: string,
  data: any
}
```

### `error(message, code?, details?)`

Creates a standardized error response.

**Parameters:**
- `message` (string) - Error message
- `code` (number, optional) - HTTP status code
- `details` (any, optional) - Additional error details

**Returns:**
```typescript
{
  success: false,
  message: string,
  error: {
    code: number,
    details: any
  }
}
```

### `paginate(data, metadata)`

Creates a paginated response with metadata.

**Parameters:**
- `data` (any[]) - Array of items
- `metadata` (object) - Pagination metadata
  - `page` (number) - Current page number
  - `perPage` (number) - Items per page
  - `total` (number) - Total number of items
  - `totalPages` (number) - Total number of pages

**Returns:**
```typescript
{
  success: true,
  message: string,
  data: any[],
  pagination: {
    page: number,
    perPage: number,
    total: number,
    totalPages: number,
    hasNext: boolean,
    hasPrev: boolean
  }
}
```

### `created(data, message?)`

Creates a response for created resources (201 status).

**Parameters:**
- `data` (any) - The created resource data
- `message` (string, optional) - Success message

**Returns:**
```typescript
{
  success: true,
  message: string,
  data: any
}
```

### `noContent(message?)`

Creates a response for successful operations with no data (204 status).

**Parameters:**
- `message` (string, optional) - Success message

**Returns:**
```typescript
{
  success: true,
  message: string
}
```

## 🎯 Why clean-response?

### Before ❌

Inconsistent response formats across your API:

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
import { success, error } from 'clean-response'

// Always the same format
res.json(success(user))
res.json(error('Invalid input', 400))
```

## 🌐 Framework Examples

### Express.js

```typescript
import express from 'express'
import { success, error, paginate } from 'clean-response'

const app = express()

app.get('/users/:id', async (req, res) => {
  try {
    const user = await findUser(req.params.id)
    res.json(success(user))
  } catch (err) {
    res.status(404).json(error('User not found', 404))
  }
})

app.listen(3000)
```

### Fastify

```typescript
import Fastify from 'fastify'
import { success, error } from 'clean-response'

const fastify = Fastify()

fastify.get('/users/:id', async (request, reply) => {
  try {
    const user = await findUser((request.params as any).id)
    reply.send(success(user))
  } catch (err) {
    reply.status(404).send(error('User not found', 404))
  }
})

fastify.listen({ port: 3000 })
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

server.listen(3000)
```

## 📝 Complete Example

Here's a complete REST API example using Express:

```typescript
import express from 'express'
import { success, error, paginate, created, noContent } from 'clean-response'

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
    return res.status(404).json(error('User not found', 404))
  }
  return res.json(success(user))
})

// POST create user
app.post('/users', async (req, res) => {
  const user = await createUser(req.body)
  return res.status(201).json(created(user, 'User created successfully'))
})

// PUT update user
app.put('/users/:id', async (req, res) => {
  const user = await updateUser(req.params.id, req.body)
  if (!user) {
    return res.status(404).json(error('User not found', 404))
  }
  return res.json(success(user, 'User updated successfully'))
})

// DELETE user
app.delete('/users/:id', async (req, res) => {
  const deleted = await deleteUser(req.params.id)
  if (!deleted) {
    return res.status(404).json(error('User not found', 404))
  }
  return res.json(noContent('User deleted successfully'))
})

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err)
  res.status(500).json(error('Internal server error', 500, err.message))
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**alfinry**

- GitHub: [@alfinry](https://github.com/alfinry)

## ⭐ Show Your Support

If this project helped you, please consider giving it a star ⭐

---

Made with ❤️ by [alfinry](https://github.com/alfinry)
