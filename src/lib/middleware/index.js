// @flow
import baseState from './view-base-state'
import type Server from '../server'

export default function initMiddleware(server: Server) {
  server.use(baseState(server))
}
