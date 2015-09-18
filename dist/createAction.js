'use strict';

exports.__esModule = true;
exports['default'] = createAction;

function createAction(actionName, payload) {
  if (typeof payload === 'undefined' || payload === null || arguments.length === 1) {
    return function () {
      return {
        name: actionName
      };
    };
  }
  if (typeof payload === 'string') {
    return function (value) {
      var _data;

      return {
        name: actionName,
        data: (_data = {}, _data[payload] = value, _data)
      };
    };
  }
  if (typeof payload === 'object') {
    return function (value) {
      return {
        name: actionName,
        data: value
      };
    };
  }
  if (typeof payload === 'function') {
    return function () {
      return {
        name: actionName,
        data: payload.apply(undefined, arguments)
      };
    };
  }
  throw new Error('Invalid call to createAction, payload needs to be string or function');
}

module.exports = exports['default'];
//# sourceMappingURL=createAction.js.map