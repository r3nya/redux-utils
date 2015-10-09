/* @flow */
import { every, isPlainObject } from './utils'

export default (map: Object) => {
  return every(map, isPlainObject)
}
