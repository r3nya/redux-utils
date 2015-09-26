export default (name, endpoint, method, rest) => {
	if (rest === undefined) {
	return {
			type: 'CALL_API',
			CALL_API: {
				types: [`${name}_REQUEST`, `${name}_SUCCESS`, `${name}_FAILURE`],
				endpoint: endpoint,
				method: method
			}
		}
	} else {
		let stringified = JSON.stringify(rest.body)
		return {
			type: 'CALL_API',
			CALL_API: {
				types: [`${name}_REQUEST`, `${name}_SUCCESS`, `${name}_FAILURE`],
				endpoint: endpoint,
				method: method,
				body: stringified
			}
		}
	}
}