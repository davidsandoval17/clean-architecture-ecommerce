import type { Email } from './email/Email.ts'
import type { Password } from './password/Password.ts'

export enum Role {
  CLIENT,
  ADMIN,
}

export type UserId = string

export interface UserEntityProps {
  id?: UserId
  name: string
  lastName: string
  email: Email
  password: Password
  isTheEmailConfirmed: boolean
  role: Role
  isActive: boolean
}

export interface UserProps {
  id?: string
  name: string
  lastName: string
  email: string
  password: string
  isTheEmailConfirmed: boolean
  role: Role
  isActive: boolean
}
