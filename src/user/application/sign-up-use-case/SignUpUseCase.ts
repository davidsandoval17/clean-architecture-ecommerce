import type { IUserRepository } from '../../domain/repository/IUserRepository.ts'
import { Result } from '../../../common/domain'
import { User } from '../../domain/User.ts'
import { Email } from '../../domain/email/Email.ts'
import { Password } from '../../domain/password/Password.ts'
import { InvalidEmailError } from '../../domain/email/EmailError.ts'
import type { ISignUpDto, ISignUpUseCase } from './ISignUpUseCase.ts'
import { InvalidPasswordError } from '../../domain/password/PasswordError.ts'
import { Role } from '../../domain/enums/Role.ts'
import { UserErrors } from '../../domain/enums/UserErrors.ts'

export class SignUpUseCase implements ISignUpUseCase {
  public constructor(private readonly repository: IUserRepository) {}

  async exec(dto: ISignUpDto): Promise<Result<UserErrors, User>> {
    try {
      const email = Email.valueOf(dto.email)
      const password = Password.valueOf(dto.password)
      const existEmailInDB = await this.repository.exists(dto.email)

      if (existEmailInDB) {
        return Result.fail(UserErrors.EMAIL_EXISTS)
      }

      await password.encryptPassword()

      const user = User.create({
        email,
        password,
        lastName: dto.lastName,
        name: dto.name,
        isTheEmailConfirmed: false,
        role: Role.CLIENT,
        isActive: true,
      })

      const userCreated = await this.repository.save(user)

      return Result.ok(userCreated)
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
