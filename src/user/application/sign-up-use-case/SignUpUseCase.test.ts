import { beforeEach, describe, expect, mock, spyOn, test } from 'bun:test'
import { SignUpUseCase } from './SignUpUseCase.ts'
import { User } from '../../domain/User.ts'
import { Email } from '../../domain/email/Email.ts'
import { Password } from '../../domain/password/Password.ts'
import { Role } from '../../domain/enums/Role.ts'
import { UserErrors } from '../../domain/enums/UserErrors.ts'

describe('SignUpUseCase test', () => {
  let userRepository: any = {
    save: () => {},
    exists: () => {},
  }

  beforeEach(() => {
    mock.restore()
  })

  test('should be defined', async () => {
    const useCase = new SignUpUseCase(userRepository)
    expect(useCase).toBeDefined()
  })

  test('should fail if provide an invalid email', async () => {
    const useCase = new SignUpUseCase(userRepository)
    const result = await useCase.exec({
      email: 'invalid_email',
      password: '123456',
      name: 'James David',
      lastName: 'Sandoval Bartra',
    })
    expect(result.isFail()).toBe(true)
    expect(result.getFailValue()).toEqual(UserErrors.INVALID_EMAIL)
  })

  test('should fail if provide an invalid password', async () => {
    const useCase = new SignUpUseCase(userRepository)
    const result = await useCase.exec({
      email: 'email@mail.com',
      password: '123456',
      name: 'James David',
      lastName: 'Sandoval Bartra',
    })
    expect(result.isFail()).toBe(true)
    expect(result.getFailValue()).toEqual(UserErrors.INVALID_PASSWORD)
  })

  test('should fail if email exists in DB', async () => {
    const spy = spyOn(userRepository, 'exists')
    spy.mockImplementation(() => true)
    const useCase = new SignUpUseCase(userRepository)
    const result = await useCase.exec({
      email: 'email_exists@mail.com',
      password: 'P@55word+',
      name: 'James David',
      lastName: 'Sandoval Bartra',
    })
    expect(result.isFail()).toBe(true)
    expect(result.getFailValue()).toEqual(UserErrors.EMAIL_EXISTS)
  })

  test('should be created user', async () => {
    const spyExists = spyOn(userRepository, 'exists')
    const spySave = spyOn(userRepository, 'save')
    spyExists.mockImplementation(() => false)
    spySave.mockImplementation(() => {
      const email = Email.valueOf('email_valid@mail.com')
      const password = Password.valueOf('P@55word+')
      password.encryptPassword()
      return User.create({
        email,
        password,
        name: 'James David',
        lastName: 'Sandoval Bartra',
        role: Role.CLIENT,
        isTheEmailConfirmed: false,
        isActive: true,
      })
    })
    const useCase = new SignUpUseCase(userRepository)
    const result = await useCase.exec({
      email: 'email_valid@mail.com',
      password: 'P@55word+',
      name: 'James David',
      lastName: 'Sandoval Bartra',
    })
    expect(result.isOk()).toBe(true)
    expect(result.getValue()).toBeInstanceOf(User)
  })
})
