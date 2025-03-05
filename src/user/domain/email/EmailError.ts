export class InvalidEmailError extends Error {
  constructor() {
    super()
    this.name = 'InvalidEmailErrorName'
  }
}

export class EmailIsAlreadyRegistered extends Error {
  constructor() {
    super()
    this.name = 'EmailIsAlreadyRegisteredName'
  }
}
