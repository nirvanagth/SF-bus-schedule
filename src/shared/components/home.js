import React, {Component} from 'react'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.props.appProps)
  }

  render() {
    return (
      <h2>{this.state.variable}</h2>
    )
  }
}

export default Home
