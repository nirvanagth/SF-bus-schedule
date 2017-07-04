import test from 'tape'

import startServer from '../server/index'
import {testRequest} from './util'

test.only('GET /health', t => {
  startServer(onServer)

  function onServer(server) {
    testRequest(server, {
      method: 'GET',
      path: '/health'
    }, (err, res) => {
      t.error(err, 'no err')
      t.equal(res.statusCode, 200, 'res.statusCode')
      server.close(t.end)
    })
  }
})

test('GET /', t => {
  startServer(onServer)

  function onServer(server) {
    testRequest(server, {
      method: 'GET',
      path: '/'
    }, (err, res) => {
      t.error(err, 'No error making request')
      t.equal(res.statusCode, 200, 'Returns status code 200')

      const html = res.body
      t.true(html.includes('html'), 'html.includes(\'html\')')
      t.true(html.includes('head'), 'html.includes(\'head\')')
      t.true(html.includes('body'), 'html.includes(\'body\')')
      t.true(html.includes('<div id=\'app-content\'>'), 'html.includes(\'<div id=\'app-content\'>\')')

      server.close(t.end)
    })
  }
})

test('GET / map exists', t => {
  // Arrange
  startServer(onServer)

  // Act
  function onServer(server) {
    testRequest(server, {
      method: 'GET',
      path: '/'
    }, (err, res) => {

      // Assert
      t.error(err, 'No error making request')
      t.equal(res.statusCode, 200, 'Returns status code 200')

      const html = res.body
      t.true(html.includes('<div id=\"map\"'), 'html.includes(\'<div id = \'map\')')
      server.close(t.end)
    })
  }
})
