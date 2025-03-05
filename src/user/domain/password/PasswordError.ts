export class InvalidPasswordError extends Error {
  constructor() {
    super()
    this.name = 'InvalidPasswordError'
  }
}
