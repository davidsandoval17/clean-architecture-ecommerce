import type { IUserRepository } from '../../domain/repository/IUserRepository.ts'
import { Result } from '../../../common/domain'
import type {
  ISignInDto,
  SignInPayload,
  ISignInUseCase,
} from './ISignInUseCase.ts'
import { Email } from '../../domain/email/Email.ts'
import { Password } from '../../domain/password/Password.ts'
import { InvalidEmailError } from '../../domain/email/EmailError.ts'
import { InvalidPasswordError } from '../../domain/password/PasswordError.ts'
import type { TokenService } from '../../../common/application/TokenService.ts'
import { UserErrors } from '../../domain/enums/UserErrors.ts'

export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly token: TokenService,
  ) {}

  async exec(dto: ISignInDto): Promise<Result<UserErrors, SignInPayload>> {
    try {
      const email = Email.valueOf(dto.email)
      const userFound = await this.repository.findByEmail(dto.email)

      if (userFound === null) {
        return Result.fail(UserErrors.INVALID_CREDENTIALS)
      }

      const password = Password.valueOf(dto.password)

      if (!userFound.props.password.comparePassword(password.value)) {
        return Result.fail(UserErrors.INVALID_CREDENTIALS)
      }

      this.token.createToken({ id: userFound.props.id, email: email.value })

      return Result.ok({ token: this.token.value })
    } catch (e) {
      return Result.fail(this.handlerError(e as Error))
    }
  }

  handlerError(e: Error): UserErrors {
    if (e instanceof InvalidEmailError) {
      return UserErrors.INVALID_EMAIL
    }

    if (e instanceof InvalidPasswordError) {
      return UserErrors.INVALID_PASSWORD
    }

    return UserErrors.UNEXPECTED_ERROR
  }
}
