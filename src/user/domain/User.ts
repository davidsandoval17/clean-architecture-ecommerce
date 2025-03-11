import type { IUser } from './IUser.ts'

import { Role } from './enums/Role.ts'

export class User {
  private readonly _props: IUser

  protected constructor(props: IUser) {
    this._props = props
  }

  get props() {
    return this._props
  }

  public static create(props: IUser): User {
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
