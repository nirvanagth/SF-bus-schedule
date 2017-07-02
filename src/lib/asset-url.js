// @flow
import urlJoin from 'url-join'

let _siteUrl: string
let _routePrefix: string

export function initAssetURL(siteUrl: string, routePrefix: string): void {
  _siteUrl = siteUrl
  _routePrefix = routePrefix
}

export default function assetURL(filename: string): string {
  return urlJoin(_siteUrl, _routePrefix, filename)
}
