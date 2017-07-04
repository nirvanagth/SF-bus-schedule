import loadJS from 'load-js'
import React, {Component} from 'react'
import window from 'global/window'
import {connect} from 'react-redux'

import {findNearPositions} from '../actions/index'

const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDq2JY6sXLwUtCgbDVZ-fiZEvoDc5owGoU'
const SF_POSITION = {lng: -122.407486, lat: 37.787903}

const styles = {
  map: {
    width: '100%',
    height: '100%'
  }
}

class MapInner extends Component {
  constructor(props) {
    super(props)

    this.markers = []
  }

  componentDidMount() {
    const {findNearPositions} = this.props
    loadJS([{async: true, defer: true, url: GOOGLE_API_URL}]).then(() => {
      this.map = initializeMap(findNearPositions)
    })
  }
  componentWillReceiveProps(nextProps) {
    const {nearPositions} = nextProps

    for (const m of this.markers) {
      m.setMap(null)
    }
    this.markers = []

    for (const p of nearPositions) {
      this.markers.push(new window.google.maps.Marker({
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 2.5
        },
        position: {lng: p.location[0], lat: p.location[1]},
        map: this.map,
        title: 'abc'
      }))
    }
  }

  render() {
    return (
      <div id='map' style={styles.map}/>
    )
  }
}

function initializeMap(findNearPositions) {
  const initialPosition = new window.google.maps.LatLng(SF_POSITION.lat, SF_POSITION.lng)
  const initialZoom = 13

  const mapOptions = {
    zoom: initialZoom,
    center: initialPosition
  }
  const map = new window.google.maps.Map(window.document.getElementById('map'),
    mapOptions)

  const centerMarker = new window.google.maps.Marker({
    position: initialPosition,
    map,
    title: 'Click to show bus stops nearby...'
  })
  window.google.maps.event.addListener(map, 'center_changed', function centerChanged() {
    window.setTimeout(function timeoutSet() {
      const center = map.getCenter()
      centerMarker.setPosition(center)
    }, 100)
  })
  window.google.maps.event.addListener(centerMarker, 'click', function onClick() {
    const loc = centerMarker.getPosition()
    findNearPositions(loc.lng(), loc.lat())
  })
  return map
}

export default connect(
  function mapStateToProps(state) {
    return {
      nearPositions: state.app.nearPositions
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      findNearPositions: (lng, lat) => dispatch(findNearPositions(lng, lat))
    }
  }
)(MapInner)
