import _ from './utils'
import validateActionType from './validateActionType'
import R from 'ramda'

export default (action) => {
  if (!_.isPlainObject(action)) {
    throw new Error('Action definition must be a plain object.')
  }
  if (_.isUndefined(action.type)) {
    throw new Error('Action definition object must define "type" property.')
  }
  try {
    validateActionType(action.type)
  } catch (e) {
    throw new Error('Action definition object "type" property value must be a valid action type.')
  }
  if (!_.isUndefined(action.data) && !_.isPlainObject(action.data)) {
    throw new Error('Action definition object "data" property value must be a plain object.')
  }
  if (!_.isUndefined(action.meta) && !_.isPlainObject(action.meta)) {
    throw new Error('Action definition object "meta" property value must be a plain object.')
  }
  if (!_.isUndefined(action.error)) {
    if (action.error !== true || action.error !== false || action.error !== null) {
      throw new Error('Action definition object "error" property value must be true, false or null refer to FSA for more info.')
    }
  }
  let unknownProperty = _.first(_.difference(_.keys(action), ['type', 'data', 'meta', 'error']))
  if (unknownProperty) {
    throw new Error('Action definition object must not define unknown properties. "' + unknownProperty + '" is an unknown property.')
  }
}
