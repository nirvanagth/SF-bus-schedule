// @flow
import config from 'config'
import winston from 'winston'
import mysql from 'mysql'

import type {Logger} from './logger'
import {createLogger} from './logger'
import type {Config} from '../server'

export default class IntegratedGateways {
  logger: Logger
  mySQL: mysql
  config: Config

  constructor(cfg: Config) {
    this.config = config

    if (cfg.gateways.logger.enabled) {
      this.initLogger()
    }
    if (cfg.gateways.mysql.enabled) {
      this.initMySQL()
    }
  }

  initLogger() {
    this.logger = createLogger(this.config.gateways.logger)
  }

  initMySQL() {
    this.mySQL = createMySQL(this.logger)
  }

  close() {
    if (config.gateways.mysql.enabled) {
      this.mySQL.end()
    }
  }

  onClose(cb) {
    const close = this.close
    this.close = () => {
      close()
      cb()
    }
  }
}

function createMySQL(logger): winston {
  const conn = mysql.createConnection({
    host: config.gateways.mysql.host,
    user: config.gateways.mysql.user,
    password: config.gateways.mysql.password,
    database: config.gateways.mysql.database
  })

  conn.connect(function onError(err) {
    if (err) {
      logger.error('Could not establish connection to MySQL', err)
    }
  })

  return conn
}
