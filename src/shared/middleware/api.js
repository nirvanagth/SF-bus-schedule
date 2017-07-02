import xhr from 'xhr'
import window from 'global/window'

import {ACTION} from '../utils/constants'
import {recvSuccess, recvFailure} from '../actions'

function post(uri, body, onResp) {
  xhr({
    method: 'post',
    body: JSON.stringify(body),
    uri,
    headers: {
      'content-type': 'application/json',
      'x-whetstone-origin': 'SF-bus-schedule',
      'x-csrf-token': window.csrfToken
    }
  }, onResp)
}

export default store => next => action => {
  if (action.type === ACTION.SUBMIT) {
    post(action.uri, action.body, (err, resp, body) => {
      if (err) {
        return next(recvFailure('received error'))
      }

      if (resp.statusCode === 403) {
        return next(recvFailure('received error'))
      }

      if (resp.statusCode === 200) {
        return next(recvSuccess(JSON.parse(body)))
      }

      return next(action)
    })
  }

  return next(action)
}
