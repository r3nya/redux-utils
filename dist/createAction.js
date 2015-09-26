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
      var _data;

      return {
        type: actionType,
        data: (_data = {}, _data[payload] = value, _data)
      };
    };
  }
  if (typeof payload === 'object') {
    return function (value) {
      return {
        type: actionType,
        data: value
      };
    };
  }
  if (typeof payload === 'function') {
    return function () {
      return {
        type: actionType,
        data: payload.apply(undefined, arguments)
      };
    };
  }
  throw new Error('Invalid call to createAction, payload needs to be string, object or function');
}

module.exports = exports['default'];
//# sourceMappingURL=createAction.js.map