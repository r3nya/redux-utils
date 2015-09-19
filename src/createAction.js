export default function createAction (actionType, payload) {
  if (typeof payload === 'undefined' || payload === null || arguments.length === 1) {
    return () => ({
      type: actionType
    })
  }
  if (typeof payload === 'string') {
    return (value) => ({
      type: actionType,
      data: {[payload]: value}
    })
  }
  if (typeof payload === 'object') {
    return (value) => ({
      type: actionType,
      data: value
    })
  }
  if (typeof payload === 'function') {
    return function (...value) {
      return {
        type: actionType,
        data: payload(...value)
      }
    }
  }
  throw new Error('Invalid call to createAction, payload needs to be string or function')
}
