import _ from './utils'
import validateActionType from './validateActionType'
import isDomainMap from './isDomainMap'
import isActionMap from './isActionMap'
import R from 'ramda'

export default (reducer) => {
  let actionTypes = []
  if (!isDomainMap(reducer) && R.values(reducer).length > 0) {
    throw new Error('Reducer definition object must begin with a domain definition.')
  }
  let iterator = (branch) => {
    R.mapObjIndexed((value, domainName) => {
      if (isActionMap(value)) {
        R.mapObjIndexed((action, name) => {
          try {
            validateActionType(name)
          } catch (e) {
            throw new Error('Reducer definition object action handler names must be valid action names.')
          }
          if (R.contains(name, actionTypes)) {
            throw new Error('Reducer definition object action handler names must be unique.')
          }
          if (name !== 'CONSTRUCT') {
            actionTypes.push(name)
          }
        }, value)
      } else if (isDomainMap(value)) {
        iterator(branch[domainName])
      } else {
        throw new Error('Reducer definition object value object all values must correspond to a function (action map) or an object (domain).')
      }
    }, branch)
  }
  iterator(reducer)
}
