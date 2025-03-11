import { Result } from '../../../common/domain'
import type { User } from '../../domain/User.ts'
import { UserErrors } from '../../domain/enums/UserErrors.ts'

export interface ISignUpDto {
  name: string
  lastName: string
  email: string
  password: string
}

export interface ISignUpUseCase {
  exec: (dto: ISignUpDto) => Promise<Result<UserErrors, User>>
}
