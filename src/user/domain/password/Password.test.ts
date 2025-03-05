import { describe, expect, test } from 'bun:test'
import { Password } from './Password.ts'
import { InvalidPasswordError } from './PasswordError.ts'

describe('Password value object', function () {
  test('valueOf should be defined', () => {
    expect(Password.valueOf).toBeDefined()
  })

  test('should return instance Password and not throw error', () => {
    expect(Password.valueOf('P@55word')).toBeInstanceOf(Password)
    expect(() => Password.valueOf('P@55word+')).not.toThrow()
  })

  test('validate password when is incorrect', () => {
    expect(() => Password.valueOf('123')).toThrow(InvalidPasswordError)
    expect(() => Password.valueOf('-___ASD_SAlAS_DAS__DAS_')).toThrow(
      InvalidPasswordError,
    )
  })
})
