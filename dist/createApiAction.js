'use strict';

exports.__esModule = true;

exports['default'] = function (name, endpoint, method, rest) {
	if (rest === undefined) {
		return {
			type: 'CALL_API',
			CALL_API: {
				types: [name + '_REQUEST', name + '_SUCCESS', name + '_FAILURE'],
				endpoint: endpoint,
				method: method
			}
		};
	} else {
		var stringified = JSON.stringify(rest.body);
		return {
			type: 'CALL_API',
			CALL_API: {
				types: [name + '_REQUEST', name + '_SUCCESS', name + '_FAILURE'],
				endpoint: endpoint,
				method: method,
				body: stringified
			}
		};
	}
};

module.exports = exports['default'];
//# sourceMappingURL=createApiAction.js.map