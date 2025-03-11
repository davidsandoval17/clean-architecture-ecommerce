import type { FastifyReply, FastifyRequest } from 'fastify'
import type { RestErrorResponse } from '../../../common/infrastructure'
import type { ISignInUseCase } from '../../application/sign-in-use-case/ISignInUseCase.ts'
import type { ISignUpUseCase } from '../../application/sign-up-use-case/ISignUpUseCase.ts'
import { UserErrors } from '../../domain/enums/UserErrors.ts'

export class UserController {
  constructor(
    private readonly signUpUseCase: ISignUpUseCase,
    private readonly signInUseCase: ISignInUseCase,
  ) {}

  private handlerError(error: UserErrors): RestErrorResponse {
    if (error === UserErrors.INVALID_CREDENTIALS) {
      return {
        error: 'Unauthorized',
        statusCode: 401,
        message: 'Credenciales inválidas',
      }
    }

    if (error === UserErrors.INVALID_EMAIL) {
      return {
        error: 'Bad Request',
        statusCode: 400,
        message: 'No es un correo electrónico válido',
      }
    }

    if (error === UserErrors.INVALID_PASSWORD) {
      return {
        error: 'Bad Request',
        statusCode: 400,
        message:
          'La contraseña debe tener al menos 8 caracteres, incluir letras mayúsculas, minúsculas y números, y no puede ser una contraseña común.',
      }
    }

    if (error === UserErrors.EMAIL_EXISTS) {
      return {
        error: 'Bad Request',
        statusCode: 400,
        message: 'El correo electrónico ya se encuentra registrado',
      }
    }

    if (error === UserErrors.NOT_FOUND) {
      return {
        error: 'Not Found',
        statusCode: 404,
        message:
          'El usuario que intenta buscar no está registrado en el sistema',
      }
    }

    return {
      error: '',
      message: '',
      statusCode: 0,
    }
  }

  public async signUp(request: FastifyRequest, reply: FastifyReply) {
    const { email, password, lastName, name } = request.body as {
      email: string
      password: string
      lastName: string
      name: string
    }

    if (!email || !password) {
      return reply.code(400).send({
        error: 'Bad Request',
        statusCode: 400,
        message:
          'Revisar que los campos requeridos como email y password esten completos',
      })
    }

    const result = await this.signUpUseCase.exec({
      email,
      password,
      name,
      lastName,
    })

    if (result.isFail()) {
      const error = this.handlerError(result.getFailValue())
      return reply.code(error.statusCode).send(error)
    }

    const user = result.getValue()

    return reply.code(201).send({
      id: user.props.id,
      email: user.props.email.value,
      role: user.props.role,
      lastName: user.props.lastName,
      name: user.props.name,
      isTheEmailConfirmed: user.props.isTheEmailConfirmed,
    })
  }

  public async signIn(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    if (!email || !password) {
      return reply.code(400).send({
        error: 'Bad Request',
        statusCode: 400,
        message: 'El email y la contraseña son requeridas',
      })
    }

    const result = await this.signInUseCase.exec({ email, password })

    if (result.isFail()) {
      const error = this.handlerError(result.getFailValue())
      return reply.code(error.statusCode).send(error)
    }

    return reply.code(200).send({
      token: result.getValue().token,
    })
  }
}
