import React, {Component} from 'react'
import TopBar from './top-bar'
import Map from './map'

const styles = {
  blank: {
    margin: '48px'
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh'
  },
  leftPanel: {
    flex: '0 0 33%',
    maxWidth: '33%'
  },
  rightPanel: {
    flex: '0 0 67%',
    maxWidth: '67%'
  }
}
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.props.appProps)
  }

  render() {
    return (
    <div>
      <TopBar />
      <div style={styles.row}>
        <div style = {styles.leftPanel} />
        <div style = {styles.rightPanel}>
          <div style={styles.blank} />
          <Map />
        </div>
      </div>
    </div>

    )
  }
}

export default Home
