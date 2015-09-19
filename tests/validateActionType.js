import { expect } from 'chai'

import validateActionType from './../src/validateActionType'
import describeThrow from './describeThrow'

describe('validateActionType()', () => {
  describe('when action type', () => {
    let describeValidateActionTypeThrow

    describeValidateActionTypeThrow = (when, message, value) => {
      describeThrow(when, message, () => {
        validateActionType(value)
      })
    }

    describeValidateActionTypeThrow(
      'does not consist only of uppercase alphabetical characters and underscores',
      'Action definition object "type" property value must consist only of uppercase alphabetical characters and underscores.',
      {
        type: 'lowercase'
      }
    )
  })
})
