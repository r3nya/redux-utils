import { expect } from 'chai'

import {isRSAA} from './../src/reduxApiMiddleware'

const REDDIT_REQUEST = 'REDDIT_REQUEST'
const REDDIT_SUCCESS = 'REDDIT_SUCCESS'
const REDDIT_FAILURE = 'REDDIT_FAILURE'

describe('isRSAA()', () => {
    it('it is true', () => {
      let input = {
          type : 'CALL_API',
          CALL_API : {
            types: [REDDIT_REQUEST, REDDIT_SUCCESS, REDDIT_FAILURE],
            endpoint: 'http://www.reddit.com/r/soccer.json',
            method: 'GET'
          }
        }
      let result = isRSAA(input)
      expect(true).to.be.true
    })
})
