import config from 'config'
import serve from 'koa-static'

import type Server from '../lib/server'

export default function setRoutes(server: Server) {
  // Health checks
  server.get('health', '/health', function onHealth(ctx) {
    ctx.body = 'OK'
  })

  // Optional route for testing error handling
  server.get(
    'trigger-error',
    '/trigger-error',
    function triggerError(ctx) {
      server.logger.error('Testing an error')
    }
  )

  // Static file serving
  const staticDir = config.get('server').staticDir || 'dist'
  // // server.use ensures prefix handling
  server.use('/', serve(staticDir))

  server.get('SPA', '/*', function onRoute(ctx) {
    ctx.putState('app', {})
    server.isoRender(ctx)
  })
}
