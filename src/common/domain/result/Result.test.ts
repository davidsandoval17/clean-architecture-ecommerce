import { describe, test, expect } from 'bun:test'
import { Result } from './Result.ts'

const isPar = (number: number): Result<string, number> => {
  if (number % 2 === 0) {
    return Result.ok(number * 2)
  }

  return Result.fail('number ' + number + ' not par')
}

describe('result test', () => {
  test('should return the ok value when result variable is defined as "ok"', () => {
    const result = Result.ok('example')
    expect(result.isOk()).toBe(true)
    expect(result.getValue()).toEqual({ kind: 'ok', value: 'example' })
  })

  test('should return the fail value when result variable is defined as "fail"', () => {
    const result = Result.fail({ code: 304, message: 'is fail code' })
    expect(result.isFail()).toBe(true)
    expect(result.getValue()).toEqual({
      kind: 'fail',
      value: { code: 304, message: 'is fail code' },
    })
  })

  test('', () => {
    const resultSuccess = isPar(2)
    const resultFail = isPar(3)

    expect(resultSuccess.getValue()).toEqual({ kind: 'ok', value: 4 })
    expect(resultFail.getValue()).toEqual({
      kind: 'fail',
      value: 'number 3 not par',
    })
  })
})
