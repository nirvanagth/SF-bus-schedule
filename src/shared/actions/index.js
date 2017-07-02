import {ACTION} from '../utils/constants'

export function submit(uri, body) {
  return {
    type: ACTION.SUBMIT,
    uri,
    body
  }
}

export function recvSuccess(resp) {
  return {
    type: ACTION.RECV_SUCCESS,
    resp
  }
}

export function recvFailure(error) {
  return {
    type: ACTION.RECV_FAILURE,
    error
  }
}
