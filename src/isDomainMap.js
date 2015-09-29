/* @flow */
import _ from './utils'

export default (map: Object) => {
  return _.every(map, _.isPlainObject)
}
