import JSONGlobals from 'json-globals/get'

const environment = JSONGlobals('environment') || 'production'

export default environment
