import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './components/app'
import Home from './components/home'

export default function Routes(routePrefix = '/') {
  return (
    <Route path={routePrefix} component={App}>
      <IndexRoute component={Home}/>
      <Route path='index' component={Home}/>
    </Route>
  )
}
