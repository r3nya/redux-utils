'use strict';

exports.__esModule = true;
exports['default'] = createAction;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function createAction(actionName, payload) {
  if (_lodash2['default'].isUndefined(payload)) {
    return function () {
      return {
        name: actionName
      };
    };
  }
  if (_lodash2['default'].isString(payload)) {
    return function (value) {
      var _data;

      return {
        name: actionName,
        data: (_data = {}, _data[payload] = value, _data)
      };
    };
  }
  if (_lodash2['default'].isObject(payload)) {
    return function (value) {
      return {
        name: actionName,
        data: value
      };
    };
  }
  if (_lodash2['default'].isFunction(payload)) {
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