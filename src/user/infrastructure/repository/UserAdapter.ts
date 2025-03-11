import { User } from '../../domain/User.ts'
import type { IAdapter } from '../../../common/infrastructure'
import { Email } from '../../domain/email/Email.ts'
import { Password } from '../../domain/password/Password.ts'
import { Role } from '../../domain/enums/Role.ts'

export class UserSchema {
  id!: string | undefined
  name!: string
  lastName!: string
  isActive!: boolean
  email!: string
  password!: string
  role!: Role
  isTheEmailConfirmed!: boolean
}

export class UserAdapter implements IAdapter<User, UserSchema> {
  toDomain(target: UserSchema): User {
    return User.create({
      id: target.id,
      isActive: false,
      isTheEmailConfirmed: false,
      lastName: target.name,
      name: target.name,
      password: Password.valueOf(target.password),
      role: target.role,
      email: Email.valueOf(target.email),
    })
  }

  toPersistence(target: User): UserSchema {
    return {
      id: target.props.id?.toString(),
      email: target.props.email.value,
      isActive: target.props.isActive,
      isTheEmailConfirmed: target.props.isTheEmailConfirmed,
      lastName: target.props.lastName,
      name: target.props.name,
      password: target.props.password.value,
      role: target.props.role,
    }
  }
}
