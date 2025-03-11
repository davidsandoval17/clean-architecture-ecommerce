import jwt from 'jsonwebtoken'

export class TokenService<Payload = string | Buffer | object> {
  private _value: string = ''

  constructor() {}

  get value(): string {
    return this._value
  }

  public createToken(payload: string | Buffer | object): void {
    this._value = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: '1h',
    })
  }
}
