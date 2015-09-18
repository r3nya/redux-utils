import { expect } from 'chai'
import validateAction from './../src/validateAction'
import describeThrow from './describeThrow'

describe('validateAction()', () => {
  context('when action is not an object', () => {
    it('throws an error', () => {
      expect(() => {
        validateAction(null)
      }).to.throw(Error, 'Action definition must be a plain object.')
    })
  })
  context('when action definition object', () => {
    let describeValidateActionThrow

    describeValidateActionThrow = (when, message, value) => {
      describeThrow(when, message, () => {
        validateAction(value)
      })
    }

    describeValidateActionThrow(
      'does not define "type" property',
      'Action definition object must define "type" property.',
      {}
    )

    describeValidateActionThrow(
      '"type" property value does not consist only of uppercase alphabetical characters and underscores',
      'Action definition object "type" property value must be a valid action type.',
      {
        type: 'lowercase'
      }
    )

    describeValidateActionThrow(
      '"data" property is present and it is not a plain object',
      'Action definition object "data" property value must be a plain object.',
      {
        type: 'FOO',
        data: 'not object'
      }
    )

    describeValidateActionThrow(
      '"meta" property is present and it is not a plain object',
      'Action definition object "meta" property value must be a plain object.',
      {
        type: 'FOO',
        meta: 'not object'
      }
    )

    describeValidateActionThrow(
      '"error" property is present and it is not a Boolean or null',
      'Action definition object "error" property value must be true, false or null refer to FSA for more info.',
      {
        type: 'FOO',
        error: {notNull: 'foo'}
      }
    )

    describeValidateActionThrow(
      'defines unknown properties',
      'Action definition object must not define unknown properties. "foo" is an unknown property.',
      {
        type: 'FOO',
        foo: 'bar'
      }
    )
  })
})
