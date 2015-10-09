/* @flow */
import { forEach, includes } from './utils'
import validateActionType from './validateActionType'
import isDomainMap from './isDomainMap'
import isActionMap from './isActionMap'
import R from 'ramda'

export default (reducer: Object) => {
  let actionTypes: Array<string> = []
  if (!isDomainMap(reducer) && R.values(reducer).length > 0) {
    throw new TypeError('Reducer definition object must begin with a domain definition.')
  }
  let iterator: Function = (branch) => {
    forEach(branch, (value, domainName) => {
      if (isActionMap(value)) {
        forEach(value, (action, name) => {
          try {
            validateActionType(name)
          } catch (e) {
            throw new TypeError('Reducer definition object action handler names must be valid action names.')
          }
          if (includes(actionTypes, name)) {
            throw new TypeError('Reducer definition object action handler names must be unique.')
          }
          if (name !== 'CONSTRUCT') {
            actionTypes.push(name)
          }
        })
      } else if (isDomainMap(value)) {
        iterator(branch[domainName])
      } else {
        throw new Error('Reducer definition object value object all values must correspond to a function (action map) or an object (domain).')
      }
    })
  }
  iterator(reducer)
}
