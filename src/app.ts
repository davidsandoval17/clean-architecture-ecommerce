'use strict'

import Fastify, { type FastifyServerOptions } from 'fastify'
import { userRouter } from './user/presentation/router.ts'

const build = (opts: FastifyServerOptions = {}) => {
  const app = Fastify(opts)

  app.register(
    (app) => {
      app.register((app) => {
        app.get('/', () => {
          return {
            name: 'Ecommerce Api with clean architecture',
            version: 1,
            author: 'David Sandoval',
            email: 'ing.david1993@gmail.com',
          }
        })
      })
      app.register(userRouter)
    },
    { prefix: '/api/v1' },
  )

  return app
}

export default build
