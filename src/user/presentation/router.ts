import type { FastifyInstance } from 'fastify'
import { userController } from './dependencies.ts'

export const userRouter = async (app: FastifyInstance, opts: Object) => {
  app.register(
    (app, opts) => {
      app.post('/sign-in', (request, reply) =>
        userController.signIn(request, reply),
      )
      app.post('/sign-up', (request, reply) =>
        userController.signUp(request, reply),
      )
    },
    { prefix: '/users' },
  )
}
