import {window, document} from 'global'

const isClient = Boolean(window && document)

export default isClient
