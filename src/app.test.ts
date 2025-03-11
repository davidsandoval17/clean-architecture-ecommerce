import { describe, test, expect, beforeEach, afterEach } from 'bun:test'
import build from './app.ts'
import supertest from 'supertest'

describe('App test', async () => {
  test('GET / not found endpoint', async () => {
    const app = build()
    await app.ready()
    await supertest(app.server)
      .get('/')
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
    await app.close()
  })

  test('GET /api/v1 should return 200', async () => {
    const app = build()
    await app.ready()
    await supertest(app.server)
      .get('/api/v1')
      .expect(200)
      .expect('Content-Type', /json/)
    await app.close()
  })
})
