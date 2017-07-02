import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as Actions from '../actions'
import Home from './home'
import HTMLHead from './html-head'
import assetURL from '../../lib/asset-url'

class App extends Component {
  render() {
    const {appProps, appActions} = this.props

    return (
      <div className='soft'>
        <HTMLHead />
        <h1>Hello world!</h1>
        <img src={assetURL('favicon.png')} />
        <Home appProps={appProps}
              appActions={appActions}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    appProps: state.app
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
