import type { Email } from './email/Email.ts'
import type { Password } from './password/Password.ts'
import { Role } from './enums/Role.ts'

export type UserId = string

export interface IUser {
  id?: UserId
  name: string
  lastName: string
  email: Email
  password: Password
  isTheEmailConfirmed: boolean
  role: Role
  isActive: boolean
}
