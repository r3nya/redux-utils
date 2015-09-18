'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

exports['default'] = function (map) {
  return _utils2['default'].every(map, _utils2['default'].isFunction);
};

module.exports = exports['default'];
//# sourceMappingURL=isActionMap.js.map