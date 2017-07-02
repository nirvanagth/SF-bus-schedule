import {combineReducers} from 'redux'
import app from './app'

function noop(state = {}, action) {
  return state
}

const rootReducer = combineReducers({
  base: noop,
  app
})

export default rootReducer
