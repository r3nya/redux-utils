'use strict';

exports.__esModule = true;
exports['default'] = createAction;

function createAction(actionType, payload) {
  if (typeof payload === 'undefined' || payload === null || arguments.length === 1) {
    return function () {
      return {
        type: actionType
      };
    };
  }
  if (typeof payload === 'string') {
    return function (value) {
      var _payload;

      return {
        type: actionType,
        payload: (_payload = {}, _payload[payload] = value, _payload)
      };
    };
  }
  if (typeof payload === 'object') {
    return function (value) {
      return {
        type: actionType,
        payload: value
      };
    };
  }
  if (typeof payload === 'function') {
    return function () {
      return {
        type: actionType,
        payload: payload.apply(undefined, arguments)
      };
    };
  }
  throw new Error('Invalid call to createAction, payload needs to be string, object or function');
}

module.exports = exports['default'];
//# sourceMappingURL=createAction.js.map