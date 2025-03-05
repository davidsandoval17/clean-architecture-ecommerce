import type { UserId, UserEntityProps, UserProps } from './User.interface.ts'
import { Role } from './User.interface.ts'

export class User {
  private readonly _props: UserEntityProps

  protected constructor(props: UserEntityProps) {
    this._props = props
  }

  get props(): UserProps {
    return {
      ...this._props,
      email: this._props.email.value,
      password: this._props.password.value,
    }
  }

  public static create(props: UserEntityProps): User {
    return new User(props)
  }

  public confirmEmail(): void {
    this._props.isTheEmailConfirmed = true
  }

  public makeClient(): void {
    this._props.role = Role.CLIENT
  }

  public makeAdmin(): void {
    this._props.role = Role.ADMIN
  }
}
