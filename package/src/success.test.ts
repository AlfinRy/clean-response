import { describe, it, expect } from 'vitest'
import { success } from './success'

describe('success', () => {
  it('should create a success response with data', () => {
    const data = { id: 1, name: 'John Doe' }
    const response = success(data)

    expect(response).toEqual({
      success: true,
      message: 'Success',
      data,
      timestamp: expect.any(String),
    })
  })

  it('should create a success response with custom message', () => {
    const data = { id: 1, name: 'John Doe' }
    const message = 'User created successfully'
    const response = success(data, message)

    expect(response.message).toBe(message)
  })

  it('should include ISO timestamp', () => {
    const data = { test: true }
    const response = success(data)
    const timestamp = new Date(response.timestamp)

    expect(timestamp.toISOString()).toBe(response.timestamp)
  })

  it('should work with primitive types', () => {
    expect(success(42).data).toBe(42)
    expect(success('hello').data).toBe('hello')
    expect(success(true).data).toBe(true)
  })

  it('should work with arrays', () => {
    const data = [1, 2, 3]
    const response = success(data)

    expect(response.data).toEqual(data)
  })

  it('should work with null and undefined', () => {
    expect(success(null).data).toBe(null)
    expect(success(undefined).data).toBe(undefined)
  })
})
