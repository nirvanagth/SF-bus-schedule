import React, {Component} from 'react'
import loadJS from 'load-js'

const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDq2JY6sXLwUtCgbDVZ-fiZEvoDc5owGoU'
const SF_POSITION = {lat: 37.787903, lng: -122.407486}

const styles = {
  map: {
    width: '100%',
    height: '100%'
  }
}

export default class Map extends Component {
  componentDidMount() {
    loadJS([{async: true, defer: true, url: GOOGLE_API_URL}]).then(() => {
      const map = new google.maps.Map(document.getElementById('map'), { // eslint-disable-line
        zoom: 14,
        center: SF_POSITION
      })
      const marker = new google.maps.Marker({ // eslint-disable-line
        position: SF_POSITION,
        map
      })
    })
  }

  render() {
    return (
      <div id = 'map' style={styles.map} />
    )
  }
}

