// @flow
import type {$Response} from 'express'

export interface Response extends $Response {
  putState: (path: string, val: any) => any,
  getState: (path: ?string) => any,
  removeState: (path: string) => boolean,
  deepExtendState: (newState: any) => void
}
