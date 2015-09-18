import _ from 'lodash'

export default function createAction (actionName, payload) {
  if (_.isUndefined(payload)) {
    return () => ({
      name: actionName
    })
  }
  if (_.isString(payload)) {
    return (value) => ({
      name: actionName,
      data: {[payload]: value}
    })
  }
  if (_.isObject(payload)) {
    return (value) => ({
      name: actionName,
      data: value
    })
  }
  if (_.isFunction(payload)) {
    return function (...value) {
      return {
        name: actionName,
        data: payload(...value)
      }
    }
  }
  throw new Error('Invalid call to createAction, payload needs to be string or function')
}
