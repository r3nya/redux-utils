'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _validateActionType = require('./validateActionType');

var _validateActionType2 = _interopRequireDefault(_validateActionType);

exports['default'] = function (action) {
  if (!_utils2['default'].isPlainObject(action)) {
    throw new TypeError('Action definition must be a plain object.');
  }
  if (_utils2['default'].isUndefined(action.type)) {
    throw new TypeError('Action definition object must define "type" property.');
  }
  try {
    _validateActionType2['default'](action.type);
  } catch (e) {
    console.log(action);
    throw new TypeError('Action definition object "type" property value must be a valid action type.');
  }
  if (!_utils2['default'].isUndefined(action.payload) && !_utils2['default'].isPlainObject(action.payload)) {
    throw new TypeError('Action definition object "payload" property value must be a plain object.');
  }
  if (!_utils2['default'].isUndefined(action.meta) && !_utils2['default'].isPlainObject(action.meta)) {
    throw new TypeError('Action definition object "meta" property value must be a plain object.');
  }
  if (!_utils2['default'].isUndefined(action.error)) {
    if (action.error !== true && action.error !== false && action.error !== null) {
      throw new TypeError('Action definition object "error" property value must be true, false or null refer to FSA for more info.');
    }
  }
  var unknownProperty = _utils2['default'].first(_utils2['default'].difference(_utils2['default'].keys(action), ['CALL_API', 'payload', 'type', 'meta', 'error']));
  if (unknownProperty) {
    throw new TypeError('Action definition object must not define unknown properties. "' + unknownProperty + '" is an unknown property.');
  }
};

module.exports = exports['default'];
//# sourceMappingURL=validateAction.js.map