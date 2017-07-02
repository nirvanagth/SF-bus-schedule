// @flow
import config from 'config'
import Koa from 'koa'
import methods from 'methods'
import path from 'path'
import process from 'process'
import Router from 'koa-router'
import url from 'url'
import {hostname} from 'os'
import {Logger} from 'winston'

import initIsoRender from './iso-render'
import initMiddleware from './middleware'
import IntegratedGateways from './integrated-gateways/integrated-gateways'
import type {isoRender} from './iso-render'

export type Config = {
  project: string,
  server: {
    routePrefix: string,
    host: string,
    port: string,
    protocol: 'http:' | 'https:'
  },
  gateways: {
    logger: {
      enabled: boolean,
      baseDir: string,
      topicName: string,
      level: 'debug' | 'info' | 'warn' | 'error'
    },
    mysql: {
      enabled: boolean
    }
  }
}

export default class Server {
  app: express$Application
  gateways: IntegratedGateways
  logger: Logger
  config: Config
  siteURL: string
  isoRender: isoRender
  httpServer: any

  constructor() {
    this.config = config
    this.siteURL = siteURL(this.config)
    process.title = `nodejs-web-${this.config.project}-on-${hostname()}`
    this.app = new Koa()
    this.gateways = new IntegratedGateways(this.config)
    this.logger = this.gateways.logger
    this.router()

    initMiddleware(this)

    this.isoRender = initIsoRender(this)
  }

  router() {
    const router = new Router()
    const self = this

    methods.forEach(setRouterOnVerb)
    setRouterOnVerb('all')

    function setRouterOnVerb(verb) {
      // $FlowFixMe
      self[verb] = function applyVerb() {
        const args = [].slice.call(arguments)

        let expressRoute = args.shift()
        if (typeof args[0] === 'string') {
          expressRoute = args.shift()
        }

        expressRoute = self.getRoute(expressRoute)
        args.unshift(expressRoute)
        // $FlowFixMe
        return router[verb](...args)
      }
    }

    this.router = router
    this.app.use(router.routes())
  }

  use(...args: any) {
    if (typeof args[0] === 'function') {
      // default route to '/' => add prefix if necessary
      args.unshift(this.getRoute('/'))
    } else {
      // route passed in, add prefix if necessary
      args[0] = this.getRoute(args[0])
    }
    // // $FlowFixMe
    this.router.use(...args)
  }

  listen(port: number, done: ()=>void = () => { }) {
    this.httpServer = this.app.listen(port, () => {
      this.logger.info(`${process.title} listening on ${port}`)
      return done(this)
    })
    return this.httpServer
  }

  routePrefix() {
    return this.config.server.routePrefix
  }

  getRoute(relativePath: string) {
    return path.join(this.config.server.routePrefix, relativePath)
  }

  close(done: ()=>void = () => { }) {
    this.gateways.close()

    this.httpServer.close(done)
  }
}

function siteURL(cfg: Config): string {
  return url.format({
    hostname: cfg.server.host,
    port: cfg.server.port,
    protocol: cfg.server.protocol || 'http:'
  }, true)
}
