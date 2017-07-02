// @flow
import config from 'config'

import Server from '../lib/server'
import setMiddleware from './middleware'
import setRoutes from './routes'

function startServer(callback: () => void) {
  const server = new Server()

  setMiddleware(server)
  setRoutes(server)

  const port = config.get('server.port')
  server.listen(port, callback)
  return server
}

export default startServer
