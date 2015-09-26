import { expect } from 'chai'
import createApiAction from '../src/createApiAction'

describe('apiAction', () => {
	it('should accept basic get request', () => {
		let expected = {
			type: 'CALL_API',
			CALL_API: {
						types: ['LOGOUT_REQUEST', 'LOGOUT_SUCCESS', 'LOGOUT_FAILURE'],
						endpoint: 'lol',
						method: 'GET'
					}
				}
		let created = createApiAction('LOGOUT', 'lol', 'GET')
		expect(expected).to.eql(created)
	})
	it('should handle post request', () => {
		let expected = {
			type: 'CALL_API',
			CALL_API: {
						types: ['LOGOUT_REQUEST', 'LOGOUT_SUCCESS', 'LOGOUT_FAILURE'],
						endpoint: 'lol',
						method: 'POST',
						body: '{"foo":"bar"}'
					}
				}
		let created = createApiAction('LOGOUT', 'lol', 'POST', {
			body: {
				foo: 'bar'
			}
		})
		expect(expected).to.eql(created)
	})
})