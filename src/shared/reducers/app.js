import {ACTION, INITIAL_STATE} from '../utils/constants'

export default function app(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ACTION.SUBMIT:
    return Object.assign({}, state, {submitting: true})

  case ACTION.RECV_FAILURE:
    return Object.assign({}, state, {error: action.error, submitting: false})

  case ACTION.RECV_SUCCESS:
    return Object.assign(
      {},
      state,
      action.resp,
      {
        error: '',
        submitting: false
      }
    )

  default:
    return state
  }
}
