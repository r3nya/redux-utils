import _ from './utils'
import Immutable from 'immutable'
import validateReducer from './validateReducer'
import validateAction from './validateAction'
import R from 'ramda'
import isActionMap from './isActionMap'
import isDomainMap from './isDomainMap'

let iterator = (domain, action, reducersObj, actionTracker) => {
  if (!Immutable.Iterable.isIterable(domain)) {
    throw new Error(`Domain must be an instance of Immutable.Iterable.`)
  }
  R.mapObjIndexed((value, domainName) => {
    if (isActionMap(value)) {
      if (value[action.type]) {
        actionTracker.isActionHandled = true
        let result = value[action.type](domain.get(domainName), action)
        if (!Immutable.Iterable.isIterable(result)) {
          throw new Error(`Reducer must return an instance of Immutable.Iterable. "${domainName}" domain "${action.type}" action handler result is "${typeof result}".`)
        }
        domain = domain.set(domainName, result)
      }
    } else if (isDomainMap(value)) {
      domain = domain.set(domainName, iterator(domain.get(domainName) || Immutable.Map(), action, value, actionTracker))
    }
  }, reducersObj)
  return domain
}

export default (reducer) => {
  validateReducer(reducer)
  return (state, action) => {
    if (!action) {
      throw new Error(`Action parameter value must be an object.`)
    }
    if (action.name) {
      console.info(`Ignoring private action "${action.name}". redux-utils does not support name property. Refer to Flux Standard Action`)
      return state
    }
    validateAction(action)
    let actionTracker = {
      isActionHandled: false
    }
    let newState = iterator(state, action, reducer, actionTracker)
    if (!actionTracker.isActionHandled && action.type !== `CONSTRUCT`) {
      console.warn(`Unhandled action "${action.type}".`, action)
    }
    return newState
  }
}
