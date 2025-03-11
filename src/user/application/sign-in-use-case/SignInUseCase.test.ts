import { mock, test, describe, expect, spyOn, beforeEach } from 'bun:test'
import { SignInUseCase } from './SignInUseCase.ts'
import { User } from '../../domain/User.ts'
import { Email } from '../../domain/email/Email.ts'
import { Password } from '../../domain/password/Password.ts'

import { Role } from '../../domain/enums/Role.ts'
import { UserErrors } from '../../domain/enums/UserErrors.ts'

describe('SignInUseCase', function () {
  const email = Email.valueOf('email_valid@mail.com')
  const password = Password.valueOf('P@55word+')
  password.encryptPassword()
  const userValid = User.create({
    id: '1',
    email,
    password,
    name: 'James David',
    lastName: 'Sandoval Bartra',
    role: Role.CLIENT,
    isTheEmailConfirmed: false,
    isActive: true,
  })

  const userRepository: any = {
    findByEmail: () => {},
  }

  const tokenService: any = {
    createToken: () => {},
  }

  beforeEach(() => {
    mock.restore()
  })

  test('should be defined', async () => {
    const useCase = new SignInUseCase(userRepository, tokenService)
    expect(useCase).toBeDefined()
  })

  test('should fail if provide an invalid email', async () => {
    const useCase = new SignInUseCase(userRepository, tokenService)
    const result = await useCase.exec({
      email: 'invalid_email',
      password: '123456',
    })
    expect(result.isFail()).toBe(true)
    expect(result.getFailValue()).toEqual(UserErrors.INVALID_EMAIL)
  })

  test('should fail if provide an invalid password', async () => {
    const useCase = new SignInUseCase(userRepository, tokenService)
    const result = await useCase.exec({
      email: 'email@mail.com',
      password: '123456',
    })
    expect(result.isFail()).toBe(true)
    expect(result.getFailValue()).toEqual(UserErrors.INVALID_PASSWORD)
  })

  test('should return fail when find user by email', async () => {
    const spy = spyOn(userRepository, 'findByEmail')
    spy.mockImplementation(() => null)
    const useCase = new SignInUseCase(userRepository, tokenService)
    const result = await useCase.exec({
      email: 'notfound@mail.com',
      password: 'P@55word+',
    })
    expect(result.isFail()).toBe(true)
    expect(result.getFailValue()).toEqual(UserErrors.INVALID_CREDENTIALS)
  })

  test('should return fail if password is incorrect', async () => {
    const spy = spyOn(userRepository, 'findByEmail')
    spy.mockImplementation(() => userValid)
    const useCase = new SignInUseCase(userRepository, tokenService)
    const result = await useCase.exec({
      email: 'email_valid@mail.com',
      password: 'P@55word+NotEqual',
    })
    expect(result.isFail()).toBe(true)
    expect(result.getFailValue()).toEqual(UserErrors.INVALID_CREDENTIALS)
  })

  test('should return access token', async () => {
    const spyFindEmail = spyOn(userRepository, 'findByEmail')
    spyFindEmail.mockImplementation(() => userValid)
    const spySignIn = spyOn(tokenService, 'value')
    spySignIn.mockImplementation(() => 'valid_token')
    const useCase = new SignInUseCase(userRepository, tokenService)
    const result = await useCase.exec({
      email: 'email_valid@mail.com',
      password: 'P@55word+',
    })
    expect(result.isOk()).toBe(true)
    expect(result.getValue()).toEqual({
      token: 'valid_token',
    })
  })
})
