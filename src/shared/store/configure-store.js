import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import window from 'global/window'

import rootReducer from '../reducers'
import environment from '../utils/environment'

export default function configureStore(initialState) {
  const middleware = [thunk]
  if (environment === 'development') {
    middleware.push(createLogger())
  }

  const enhancers = [
    applyMiddleware(...middleware)
  ]

  if (window && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension())
  }

  return createStore(rootReducer, initialState, compose(...enhancers))
}
