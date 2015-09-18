import _ from './utils'
import validateActionName from './validateActionName'
import isDomainMap from './isDomainMap'
import isActionMap from './isActionMap'
import R from 'ramda'

export default (reducer) => {
  let actionNames = []
  if (!isDomainMap(reducer) && _.values(reducer).length > 0) {
    throw new Error('Reducer definition object must begin with a domain definition.')
  }
  let iterator = (branch) => {
    _.forEach(branch, (value, domainName) => {
      if (isActionMap(value)) {
        _.forEach(value, (action, name) => {
          try {
            validateActionName(name)
          } catch (e) {
            throw new Error('Reducer definition object action handler names must be valid action names.')
          }
          if (R.contains(name, actionNames)) {
            throw new Error('Reducer definition object action handler names must be unique.')
          }
          if (name !== 'CONSTRUCT') {
            actionNames.push(name)
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
