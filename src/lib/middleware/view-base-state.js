// @flow
import dotty from 'dotty'
import deepExtend from 'deep-extend'

import type Server from '../server'

export default function viewBaseState(server: Server) {
  return async (ctx, next) => {

    ctx.state.view = {
      base: {
        routePrefix: server.routePrefix(),
        siteURL: server.siteURL
      }
    }

    ctx.deepExtendState = function deepExtendState(newState) {
      ctx.state.view = deepExtend({}, ctx.state.view, newState)
    }
    ctx.putState = function putState(path, val) {
      dotty.put(ctx.state.view, path, val)
    }
    ctx.getState = function getState(path) {
      if (path) {
        return dotty.get(ctx.state.view, path)
      }
      return ctx.state.view
    }
    ctx.removeState = function removeState(path) {
      return dotty.remove(ctx.state.view, path)
    }

    return await next()
  }
}
