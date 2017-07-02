// @flow
import React from 'react'
import document from 'global/document'
import ReactDom from 'react-dom'
import {Router} from 'react-router'
import {browserHistory} from 'react-router'
import JSONGlobals from 'json-globals/get'
import {Provider} from 'react-redux'

import configureStore from '../../shared/store/configure-store'
import Routes from '../../shared/routes'
import {initAssetURL} from '../../lib/asset-url'

const store = configureStore(JSONGlobals('state'))
const {siteURL, routePrefix} = store.getState().base

initAssetURL(siteURL, routePrefix)

ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {Routes(routePrefix)}
    </Router>
  </Provider>,
  document.getElementById('app-content')
)
