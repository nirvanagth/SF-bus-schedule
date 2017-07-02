// @flow
import Helmet from 'react-helmet'
import JsonGlobals from 'json-globals'
import React from 'react'
import type {$Request} from 'express'
import {match, RouterContext} from 'react-router'
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'

import assetURL, {initAssetURL} from './asset-url'
import configureStore from '../shared/store/configure-store'
import Routes from '../shared/routes'
import type Server from './server'

export type isoRender = (req: $Request, res: Response) => void

export default function initIsoRender(server: Server): isoRender {
  return ctx => {
    match(
      {
        routes: Routes(server.routePrefix()),
        location: ctx.url
      },
      (error, redirectLocation, renderProps) => {
        if (error) {
          ctx.status = 500
          ctx.message = error.message
        } else if (redirectLocation) {
          ctx.redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          renderHTML(renderProps, ctx)
        } else {
          ctx.status = 404
          ctx.message = 'view not found'
        }
      }
    )
  }
}

function renderHTML(renderProps, ctx) {
  const state = ctx.getState()
  const jsonGlobals = JsonGlobals({state})
  initAssetURL(state.base.siteURL, state.base.routePrefix)
  const store = configureStore(state)

  const reactMarkup = renderToString(
    <Provider store={store}>
      <RouterContext {...renderProps}/>
    </Provider>
  )

  ctx.body = fillHTMLTemplate(jsonGlobals, reactMarkup)
}

function fillHTMLTemplate(jsonGlobals, reactMarkup): string {
  const head = Helmet.rewind()
  return `<!DOCType html>
<html ${head.htmlAttributes.toString()}>
    <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        <script type="text/javascript">${jsonGlobals}</script>
        ${head.script.toString()}
    </head>
    <body>
        <div id='app-content'>${reactMarkup}</div>
        <script type="text/javascript" crossorigin="" src=${assetURL('src/client/javascripts/main.js')}></script>
    </body>
</html>
`
}
