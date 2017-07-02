import deepKeyMirror from 'key-mirror-nested'

const MIRRORED_CONSTANTS = deepKeyMirror({
  ACTION: {
    SUBMIT: null,
    RECV_SUCCESS: null,
    RECV_FAILURE: null
  }
})

export const ACTION = MIRRORED_CONSTANTS.ACTION

export const INITIAL_STATE = {
  app: {
    variable: 'sub-component variable',
    submitting: false
  }
}
