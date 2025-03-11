import { Result } from '../../../common/domain'
import type { UserErrors } from '../../domain/enums/UserErrors.ts'

export interface ISignInDto {
  email: string
  password: string
}

export interface SignInPayload {
  token: string
}

export interface ISignInUseCase {
  exec: (dto: ISignInDto) => Promise<Result<UserErrors, SignInPayload>>
}
