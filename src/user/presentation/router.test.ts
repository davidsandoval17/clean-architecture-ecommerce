import { test, describe, expect } from 'bun:test'
import supertest from 'supertest'
import build from '../../app.ts'
import { User } from '../domain/User.ts'
import { Email } from '../domain/email/Email.ts'
import { Role } from '../domain/enums/Role.ts'
import { Password } from '../domain/password/Password.ts'

describe('User Router', () => {
  describe('POST /api/v1/users/sign-in', () => {
    test('should return 400, when user send empty data', async () => {
      const app = build()
      await app.ready()
      await supertest(app.server)
        .post('/api/v1/users/sign-in')
        .send({})
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 400,
            error: 'Bad Request',
            message: 'El email y la contraseña son requeridas',
          })
        })
      await app.close()
    })

    test('should return 400, when user send empty email or password', async () => {
      const app = build()
      await app.ready()
      await supertest(app.server)
        .post('/api/v1/users/sign-in')
        .send({ email: 'mail@m.com' })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 400,
            error: 'Bad Request',
            message: 'El email y la contraseña son requeridas',
          })
        })
      await app.close()
    })

    test('should return 401 unauthorized', async () => {
      const app = build()
      await app.ready()
      await supertest(app.server)
        .post('/api/v1/users/sign-in')
        .send({ email: 'email_valid@mail.com', password: 'P@55word+' })
        .set('Accept', 'application/json')
        .expect(401)
        .then((response) => {
          expect(response.body.statusCode).toBe(401)
          expect(response.body.error).toBe('Unauthorized')
        })

      await app.close()
    })

    test('should return 200 with success token', async () => {
      const app = build()
      await app.ready()
      await supertest(app.server)
        .post('/api/v1/users/sign-in')
        .send({ email: 'jsandovalbd1993@mail.com', password: 'P@55word+' })
        .set('Accept', 'application/json')
        .expect(200)
        .then((response) => {
          expect(response.body.token).toBeDefined()
          expect(typeof response.body.token).toBe('string')
          const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
          expect(jwtRegex.test(response.body.token)).toBe(true)
        })
      await app.close()
    })
  })

  describe('POST /api/v1/users/sign-up', () => {
    test('should return 400 when user send not complete data', async () => {
      const app = build()
      await app.ready()
      await supertest(app.server)
        .post('/api/v1/users/sign-up')
        .send({
          email: '',
          password: '',
          name: '',
          lastName: '',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 400,
            error: 'Bad Request',
            message:
              'Revisar que los campos requeridos como email y password esten completos',
          })
        })
      await app.close()
    })

    test('should return 400 when user send email already registered', async () => {
      const app = build()
      await app.ready()
      await supertest(app.server)
        .post('/api/v1/users/sign-up')
        .send({
          email: 'jsandovalbd1993@mail.com',
          password: 'P@55word+',
          name: '',
          lastName: '',
        })
        .set('Accept', 'application/json')
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            statusCode: 400,
            error: 'Bad Request',
            message: 'El correo electrónico ya se encuentra registrado',
          })
        })
      await app.close()
    })

    test('should return 200 when user send complete data', async () => {
      const app = build()
      await app.ready()
      await supertest(app.server)
        .post('/api/v1/users/sign-up')
        .send({
          email: 'new_email@gmail.com',
          password: 'P@55word+',
          name: '',
          lastName: '',
        })
        .set('Accept', 'application/json')
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({
            email: 'new_email@gmail.com',
            role: Role.CLIENT,
            lastName: '',
            name: '',
            id: '2',
            isTheEmailConfirmed: false,
          })
        })
      await app.close()
    })
  })
})
