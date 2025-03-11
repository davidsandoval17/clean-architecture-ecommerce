'use strict'

import build from './app.ts'

const port = process.env.PORT ?? 3000

const app = build({
  logger: true,
})

app.listen({ port: +port }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
