import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from '../reducers'
import isClient from '../utils/is-client'
import environment from '../utils/environment'

export default function configureStore(initialState) {
  const middleware = [thunk]
  if (isClient) {
    // only use xhr on client-side
    const api = require('../middleware/api').default
    middleware.push(api)
  }
  if (environment === 'development') {
    middleware.push(createLogger())
  }
  return createStore(rootReducer, initialState, applyMiddleware(...middleware))
}
