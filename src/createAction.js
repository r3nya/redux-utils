export default function createAction (actionName, payload) {
  if (typeof payload === 'undefined' || payload === null || arguments.length === 1) {
    return () => ({
      type: actionName
    })
  }
  if (typeof payload === 'string') {
    return (value) => ({
      type: actionName,
      data: {[payload]: value}
    })
  }
  if (typeof payload === 'object') {
    return (value) => ({
      type: actionName,
      data: value
    })
  }
  if (typeof payload === 'function') {
    return function (...value) {
      return {
        type: actionName,
        data: payload(...value)
      }
    }
  }
  throw new Error('Invalid call to createAction, payload needs to be string or function')
}
