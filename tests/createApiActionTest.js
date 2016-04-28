import { expect } from 'chai'
import createApiAction from '../src/createApiAction'
import _ from 'lodash'

describe('createApiAction', () => {
	it('should make get call', () => {
		let expected = {
			type: 'CALL_API',
			CALL_API: {
				types: ['A_REQUEST', 'A_SUCCESS', 'A_FAILURE'],
				endpoint: 'foo',
				method: 'get'
			}
		}
		let fooCreator = createApiAction('A', 'foo', 'get')
		let created = fooCreator()
		expect(expected).to.eql(created)
	})
	it('should make post call', () => {
		let expected = {
			type: 'CALL_API',
			CALL_API: {
				types: ['A_REQUEST', 'A_SUCCESS', 'A_FAILURE'],
				endpoint: 'foo',
				method: 'get',
				body: {'foo': 'foo'},
				headers: {
					'Content-Type': 'application/json'
				}
			}
		}
		let fooCreator = createApiAction('A', 'foo', 'get', {'foo': 'foo'})
		let created = fooCreator()
		expect(expected).to.eql(created)
	})

	it('should allow both body and endpoint to be functions', () => {
		let expected = {
			type: 'CALL_API',
			CALL_API: {
				types: ['A_REQUEST', 'A_SUCCESS', 'A_FAILURE'],
				endpoint: 'api/test',
				method: 'post',
				body: { value: 'hello' }
			}
		}

		let fooCreator = createApiAction(
			'A',
			address => `api/${address}`,
			'post',
			(address, value) => ({ value: value })
		)
		let created = fooCreator('test', 'hello')
		expect(expected).to.eql(created)
	})
})