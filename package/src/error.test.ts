import { describe, it, expect } from 'vitest'
import { error } from './error'

describe('error', () => {
  it('should create an error response with message', () => {
    const message = 'Something went wrong'
    const response = error(message)

    expect(response).toEqual({
      success: false,
      message,
      code: 500,
      timestamp: expect.any(String),
    })
  })

  it('should create an error response with custom code', () => {
    const message = 'User not found'
    const code = 404
    const response = error(message, code)

    expect(response).toEqual({
      success: false,
      message,
      code,
      timestamp: expect.any(String),
    })
  })

  it('should include ISO timestamp', () => {
    const response = error('Error')
    const timestamp = new Date(response.timestamp)

    expect(timestamp.toISOString()).toBe(response.timestamp)
  })

  it('should work with different HTTP status codes', () => {
    const badRequest = error('Bad request', 400)
    const unauthorized = error('Unauthorized', 401)
    const forbidden = error('Forbidden', 403)
    const notFound = error('Not found', 404)

    expect(badRequest.code).toBe(400)
    expect(unauthorized.code).toBe(401)
    expect(forbidden.code).toBe(403)
    expect(notFound.code).toBe(404)
  })

  it('should handle empty messages', () => {
    const response = error('')
    expect(response.message).toBe('')
  })
})
