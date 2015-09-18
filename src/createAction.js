export default function createAction (actionName, payload) {
  if (typeof payload === 'undefined' || payload === null || arguments.length === 1) {
    return () => ({
      name: actionName
    })
  }
  if (typeof payload === 'string') {
    return (value) => ({
      name: actionName,
      data: {[payload]: value}
    })
  }
  if (typeof payload === 'object') {
    return (value) => ({
      name: actionName,
      data: value
    })
  }
  if (typeof payload === 'function') {
    return function (...value) {
      return {
        name: actionName,
        data: payload(...value)
      }
    }
  }
  throw new Error('Invalid call to createAction, payload needs to be string or function')
}
