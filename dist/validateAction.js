'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _validateActionType = require('./validateActionType');

var _validateActionType2 = _interopRequireDefault(_validateActionType);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

exports['default'] = function (action) {
  if (!_utils2['default'].isPlainObject(action)) {
    throw new Error('Action definition must be a plain object.');
  }
  if (_utils2['default'].isUndefined(action.type)) {
    throw new Error('Action definition object must define "type" property.');
  }
  try {
    _validateActionType2['default'](action.type);
  } catch (e) {
    throw new Error('Action definition object "type" property value must be a valid action type.');
  }
  if (!_utils2['default'].isUndefined(action.data) && !_utils2['default'].isPlainObject(action.data)) {
    throw new Error('Action definition object "data" property value must be a plain object.');
  }
  if (!_utils2['default'].isUndefined(action.meta) && !_utils2['default'].isPlainObject(action.meta)) {
    throw new Error('Action definition object "meta" property value must be a plain object.');
  }
  if (!_utils2['default'].isUndefined(action.error)) {
    if (action.error !== true || action.error !== false || action.error !== null) {
      throw new Error('Action definition object "error" property value must be true, false or null refer to FSA for more info.');
    }
  }
  var unknownProperty = _utils2['default'].first(_utils2['default'].difference(_utils2['default'].keys(action), ['type', 'data', 'meta', 'error']));
  if (unknownProperty) {
    throw new Error('Action definition object must not define unknown properties. "' + unknownProperty + '" is an unknown property.');
  }
};

module.exports = exports['default'];
//# sourceMappingURL=validateAction.js.map