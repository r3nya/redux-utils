/* @flow */
import { merge, every } from './utils'

export default function(type: string) {
  if(!every(arguments, v => typeof v === 'string')) {
    throw new TypeError('ActionCreator only takes strings as input')
  }
  let props = Array.isArray(arguments[1]) ? arguments[1] : Array.prototype.slice.call(arguments, 1)
  return () => {
    if (!props.length) {
      return {type: type}
    }
    let payloadObj: Object = {payload: {}}
    return merge(props.reduce((action: Object, prop: Array, index: number) => {
      action.payload[prop] = prop, action
      return action
    }, {payload: {}}), {type: type})
  }
}