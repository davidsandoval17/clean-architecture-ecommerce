import { SignInUseCase } from '../application/sign-in-use-case/SignInUseCase.ts'
import { SignUpUseCase } from '../application/sign-up-use-case/SignUpUseCase.ts'
import { InMemoryUserRepository } from '../infrastructure/repository/InMemoryUserRepository.ts'
import { UserAdapter } from '../infrastructure/repository/UserAdapter.ts'
import { TokenService } from '../../common/application/TokenService.ts'
import { UserController } from '../infrastructure/rest/UserController.ts'

export const userAdapter = new UserAdapter()
export const repository = new InMemoryUserRepository(userAdapter)
export const tokenService = new TokenService()
export const signInUseCase = new SignInUseCase(repository, tokenService)
export const signUpUseCase = new SignUpUseCase(repository)
export const userController = new UserController(signUpUseCase, signInUseCase)
