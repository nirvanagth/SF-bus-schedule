import JSONGlobals from 'json-globals/get'

const defaultConfig = {routePrefix: ''}
const config = JSONGlobals('config') || defaultConfig

export default config
