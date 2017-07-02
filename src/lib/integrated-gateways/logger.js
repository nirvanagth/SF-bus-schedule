// @flow
import path from 'path'
import winston from 'winston'
import deepExtend from 'deep-extend'
import fs from 'fs'

export type Logger = {
  debug: (name: string, meta: Object) => void,
  info: (name: string, meta: Object) => void,
  warn: (name: string, meta: Object) => void,
  error: (name: string, meta: Object) => void
}

export type LoggerConfig = {
  baseDir: string,
  topicName: string
}

const defaultCfg: LoggerConfig = {
  baseDir: '/var/log',
  topicName: 'unknown-topic',
  level: 'info'
}

export function createLogger(cfg: LoggerConfig): Logger {
  const c = deepExtend(defaultCfg, cfg)
  const filename = path.join(c.baseDir, `${c.topicName}.log`)

  const transports = [
    new (winston.transports.Console)({
      colorize: 'all'
    })
  ]

  try {
    if (!fs.existsSync(c.baseDir)) {
      fs.mkdirSync(c.baseDir)
      transports.push(new (winston.transports.File)({filename}))
    }
  } catch (e) {
    winston.error(`createLogger: cannot create log file: ${e}`)
  }

  return new (winston.Logger)({
    level: c.level,
    transports
  })
}

