import {INITIAL_STATE} from '../utils/constants'
import {RECEIVE_NEAR_POSITIONS} from '../actions/index'

export default function app(state = INITIAL_STATE, action) {
  if (action.type === RECEIVE_NEAR_POSITIONS) {
    return {
      ...state,
      nearPositions: action.payload
    }
  }
  return state
}
