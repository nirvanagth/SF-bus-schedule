import config from 'config'
import serve from 'koa-static'
import console from 'global/console'

import type Server from '../lib/server'
import {findIn1Mile} from './services/location'

export default function setRoutes(server: Server) {
  // Health checks
  server.get('health', '/health', async function onHealth(ctx) {
    ctx.body = 'OK'
  })

  // Optional route for testing error handling
  server.get(
    'trigger-error',
    '/trigger-error',
    async function triggerError(ctx) {
      server.logger.error('Testing an error')
    }
  )

  server.get('/api/near/', async function getNearLocations(ctx) {
    ctx.body = await findIn1Mile(ctx.query.lng, ctx.query.lat)
    console.log(ctx.body.length)
  })

  // Static file serving
  const staticDir = config.get('server').staticDir || 'dist'
  // // server.use ensures prefix handling
  server.use('/', serve(staticDir))

  server.get('SPA', '/*', async function onRoute(ctx) {
    ctx.putState('app', {})
    server.isoRender(ctx)
  })
}
