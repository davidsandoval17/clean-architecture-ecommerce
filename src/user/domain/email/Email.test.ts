import { describe, expect, test } from 'bun:test'
import { Email } from './Email.ts'

describe('Email value object test', () => {
  test('should return invalid email', () => {
    expect(() => Email.valueOf('jsandoval@email.com')).not.toThrow()
    expect(() => Email.valueOf('123')).toThrow()
  })

  test('should return instance of Email', () => {
    const email = Email.valueOf('jsandoval@email.com')
    expect(email).toBeInstanceOf(Email)
  })
})
