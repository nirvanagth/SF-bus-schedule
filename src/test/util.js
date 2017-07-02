import path from 'path'
import request from 'request'

export function testRequest(server, options, cb) {
  const port = server.config.server.port
  const host = 'localhost'
  const prefixedPath = path.join(server.routePrefix(), options.path)

  request({
    method: options.method || 'GET',
    uri: `http://${host}:${port}${prefixedPath}`,
    followRedirect: false
  }, cb)
}
