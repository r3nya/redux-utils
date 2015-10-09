import { expect } from 'chai'
import createAction from '../src/createAction'

describe('createAction', () => {
	it('should make no payload', () => {
		let loginAction = createAction('LOGIN')
		let result = loginAction()
		let expected = {
			type: 'LOGIN',
		}
		expect(expected).to.eql(result)
	})
	it('should make 1 item', () => {
		let loginAction = createAction('LOGIN', 'g')
		let result = loginAction('g')
		let expected = {
			type: 'LOGIN',
			payload: {
				g: 'g'
			}
		}
		expect(expected).to.eql(result)
	})
	it('should two items', () => {
		let loginAction = createAction('LOGIN', 'e', 'g')
		let result = loginAction('e', 'g')
		let expected = {
			type: 'LOGIN',
			payload: {
				e: 'e',
				g: 'g'
			}
		}
		expect(expected).to.eql(result)
	})
})