// @flow
import config from 'config'

import Server from '../lib/server'
import setGateways from './gateways'
import setMiddleware from './middleware'
import setRoutes from './routes'
import setServices from './services'

function startServer(callback: () => void) {
  const server = new Server()

  setGateways(server)
  setMiddleware(server)
  setServices(server)
  setRoutes(server)

  const port = config.get('server.port')
  server.listen(port, callback)
  return server
}

export default startServer
