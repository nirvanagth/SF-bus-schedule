import React from 'react'
import {colors, fonts} from './styles'

const styles = {
  topBar: {
    position: 'absolute',
    top: 0,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: colors.green,
    ...fonts.primary,
    ...fonts.h1,
    color: colors.white,
    padding: '5px'
  }
}
export default function TopBar() {
  return (
    <div style={styles.topBar}>
      SF Bus Schedule
    </div>
  )
}
