import { InvalidPasswordError } from './PasswordError.ts'
import { CryptoManager } from '../../../common/domain/'

export class Password {
  private _value: string
  private cryptManage: CryptoManager = new CryptoManager()

  protected constructor(password: string) {
    this._value = password
  }

  get value(): string {
    return this._value
  }

  public static valueOf(value: string): Password {
    if (!Password.isValidPassword(value)) {
      throw new InvalidPasswordError()
    }
    return new Password(value)
  }

  public static isValidPassword(password: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!^(?:12345678|password|123456|123456789|qwerty|abc123|football)$).{8,}$/

    return regex.test(password)
  }

  public isHashed(): boolean {
    return this.cryptManage.isEncrypted(this._value)
  }

  public encryptPassword(): void {
    if (this.isHashed()) {
      return
    }
    this._value = this.cryptManage.encrypt(this._value)
  }

  public comparePassword(plainTextPassword: string): boolean {
    if (this.isHashed()) {
      return this.cryptManage.compare(plainTextPassword, this._value)
    }
    return this._value === plainTextPassword
  }
}
