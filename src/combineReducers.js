import _ from './utils'
import Immutable from 'immutable'
import validateReducer from './validateReducer'
import validateAction from './validateAction'
import R from 'ramda'
import isActionMap from './isActionMap'
import isDomainMap from './isDomainMap'

let iterator = (domain, action, collection, tapper) => {
  if (!Immutable.Iterable.isIterable(domain)) {
    throw new Error(`Domain must be an instance of Immutable.Iterable.`)
  }
  _.forEach(collection, (value, domainName) => {
    if (isActionMap(value)) {
      if (value[action.name]) {
        tapper.isActionHandled = true
        let result = value[action.name](domain.get(domainName), action)
        if (!Immutable.Iterable.isIterable(result)) {
          throw new Error(`Reducer must return an instance of Immutable.Iterable. "${domainName}" domain "${action.name}" action handler result is "${typeof result}".`)
        }
        domain = domain.set(domainName, result)
      }
    } else if (isDomainMap(value)) {
      domain = domain.set(domainName, iterator(domain.get(domainName) || Immutable.Map(), action, value, tapper))
    }
  })
  return domain
}

export default (reducer) => {
  validateReducer(reducer)
  return (state, action) => {
    if (!action) {
      throw new Error(`Action parameter value must be an object.`)
    }
    if (action.type && R.not(R.contains('@@', action.type))) {
      console.info(`Ignoring private action "${action.type}". redux-immutable does not support state inflation. Refer to https://github.com/gajus/canonical-reducer-composition/issues/1.`)
      return state
    }
    validateAction(action)
    let tapper = {
      isActionHandled: false
    }
    let newState = iterator(state, action, reducer, tapper)
    if (!tapper.isActionHandled && action.name !== `CONSTRUCT`) {
      console.warn(`Unhandled action "${action.name}".`, action)
    }
    return newState
  }
}
