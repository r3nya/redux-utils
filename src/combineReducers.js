/* @flow weak */
import Immutable from 'immutable'
import validateReducer from './validateReducer'
import validateAction from './validateAction'
import { forEach, isObject } from './utils'
import isActionMap from './isActionMap'
import isDomainMap from './isDomainMap'

let isIterable = (collection, message) => {
  if (!Immutable.Iterable.isIterable(collection)) {
    throw new TypeError(message)
  }
}

let iterator = (domain, action, reducersObj, isActionHandled) => {
  isIterable(domain, 'Domain must be an instance of Immutable.Iterable.')
  forEach(reducersObj, (value, domainName) => {
    if (isActionMap(value)) {
      if (value[action.type]) {
        isActionHandled = true
        let result = value[action.type](domain.get(domainName), action)
        isIterable(result, `Reducer must return an instance of Immutable.Iterable. "${domainName}" domain "${action.type}" action handler result is "${typeof result}".`)
        domain = domain.set(domainName, result)
      }
    } else if (isDomainMap(value)) {
      domain = domain.set(domainName, iterator(domain.get(domainName) || Immutable.Map(), action, value, isActionHandled))
    }
  })
  return domain
}

let foo = (reducer) => {
  validateReducer(reducer)
  return (state, action) => {
    if (!isObject(action)) {
      throw new TypeError(`Action parameter value must be an object.`)
    }
    if (action.type && action.type.indexOf(`@@`) === 0) {
      return state;
    }
    validateAction(action)
    let isActionHandled = false
    let newState = iterator(state, action, reducer, isActionHandled)
    if (!isActionHandled && action.type !== `CONSTRUCT`) {
      console.warn(`Unhandled action "${action.type}".`, action)
    }
    return newState
  }
}

export default foo
