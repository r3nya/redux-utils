/* @flow */
import { every, isFunction } from './utils'

export default (map: Object) => {
  return every(map, isFunction)
}
