import { describe, expect, test } from 'bun:test'
import { CryptoManager } from './CryptoManager.ts'

describe('CryptoManager', () => {
  const cryptoManager = new CryptoManager()

  test('encrypt returns a non-empty string', () => {
    const message = 'Test message'
    const encrypted = cryptoManager.encrypt(message)
    expect(typeof encrypted).toBe('string')
    expect(encrypted.length).toBeGreaterThan(0)
  })

  test('decrypt returns the original text', () => {
    const message = 'Test message'
    const encrypted = cryptoManager.encrypt(message)
    const decrypted = cryptoManager.decrypt(encrypted)
    expect(decrypted).toBe(message)
  })

  test('compare returns true for matching text', () => {
    const message = 'Another test message'
    const encrypted = cryptoManager.encrypt(message)
    expect(cryptoManager.compare(message, encrypted)).toBe(true)
  })

  test('compare returns false for non-matching text', () => {
    const originalMessage = 'Original message'
    const wrongMessage = 'Wrong message'
    const encrypted = cryptoManager.encrypt(originalMessage)
    expect(cryptoManager.compare(wrongMessage, encrypted)).toBe(false)
  })

  test('isEncrypted returns true for an encrypted text', () => {
    const message = 'Encrypted message test'
    const encrypted = cryptoManager.encrypt(message)
    expect(cryptoManager.isEncrypted(encrypted)).toBe(true)
  })

  test('isEncrypted returns false for plain text', () => {
    const plainText = 'Just a normal string'
    expect(cryptoManager.isEncrypted(plainText)).toBe(false)
  })
})
