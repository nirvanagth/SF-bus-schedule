import React from 'react'
import Helmet from 'react-helmet'

import assetURL from '../../lib/asset-url'

export default function HTMLHead() {
  return (
    <Helmet
      htmlAttributes={{lang: 'en', amp: undefined}}
      title='My Title'
      titleTemplate='MySite.com - %s'
      defaultTitle='My Default Title'
      meta={[
        {name: 'description', content: 'Helmet application'},
        {name: 'viewport', content: 'width=device-width,minimum-scale=1,maximum-scale=1'},
        {property: 'og:type', content: 'article'}
      ]}
      link={[
        {rel: 'icon', type: 'image/x-icon', href: assetURL('favicon.png')},
        {rel: 'stylesheet', href: assetURL('stylesheets/main.css')}
      ]}
      script={[
        {src: assetURL('pace.min.js'), type: 'text/javascript'}
      ]}
    />
  )
}
