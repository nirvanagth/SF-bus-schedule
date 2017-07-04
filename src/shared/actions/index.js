import xhr from 'xhr'
import console from 'global/console'
import window from 'global/window'

export const RECEIVE_NEAR_POSITIONS = 'RECEIVE_NEAR_POSITIONS'

export function findNearPositions(lng, lat) {
  return (dispatch, getState) => {
    xhr({
      uri: `/api/near/?lng=${lng}&lat=${lat}`,
      headers: {
        'content-type': 'application/json',
        'x-whetstone-origin': 'SF-bus-schedule',
        'x-csrf-token': window.csrfToken
      }
    }, (err, resp, body) => {
      if (err) {
        console.error(`failed to findNearPositions: ${err}`)
        return
      }
      dispatch(receiveNearPositions(JSON.parse(body)))
    })
  }
}

export function receiveNearPositions(positions) {
  return {
    type: RECEIVE_NEAR_POSITIONS,
    payload: positions
  }
}
