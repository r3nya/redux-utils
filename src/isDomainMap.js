import _ from './utils'

export default (map) => {
  return _.every(map, _.isPlainObject)
}
