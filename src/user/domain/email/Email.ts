import { InvalidEmailError } from './EmailError.ts'

export class Email {
  private readonly _value: string

  protected constructor(email: string) {
    this._value = email
  }

  public static valueOf(value: string): Email {
    if (!Email.isValidEmail(value)) {
      throw new InvalidEmailError()
    }
    return new Email(value)
  }

  public static isValidEmail(email: string): boolean {
    const EMAIL_REGEX = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    const emailRegex = new RegExp(EMAIL_REGEX)
    return emailRegex.test(email)
  }

  get value(): string {
    return this._value
  }
}
