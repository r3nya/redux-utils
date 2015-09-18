import Immutable from 'immutable'
import validateReducer from './validateReducer'
import validateAction from './validateAction'
import R from 'ramda'
import isActionMap from './isActionMap'
import isDomainMap from './isDomainMap'

let immutableIterableCheck = (collection, message) => {
  if (!Immutable.Iterable.isIterable(collection)) {
    throw new Error(message)
  }
}

let iterator = (domain, action, reducersObj, actionTracker) => {
  immutableIterableCheck(domain, 'Domain must be an instance of Immutable.Iterable.')
  R.mapObjIndexed((value, domainName) => {
    if (isActionMap(value)) {
      if (value[action.type]) {
        actionTracker.isActionHandled = true
        let result = value[action.type](domain.get(domainName), action)
        immutableIterableCheck(result, `Reducer must return an instance of Immutable.Iterable. "${domainName}" domain "${action.type}" action handler result is "${typeof result}".`)
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
    if (typeof action !== 'object') {
      throw new Error(`Action parameter value must be an object.`)
    }
    if (action.type && action.type.indexOf(`@@`) === 0) {
      console.info(`Uh Oh, it looks like you are using ${action.type}, which is not supported`);
      return state;
    }
    console.log(action)
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
