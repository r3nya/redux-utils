'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _validateActionType = require('./validateActionType');

var _validateActionType2 = _interopRequireDefault(_validateActionType);

var _isDomainMap = require('./isDomainMap');

var _isDomainMap2 = _interopRequireDefault(_isDomainMap);

var _isActionMap = require('./isActionMap');

var _isActionMap2 = _interopRequireDefault(_isActionMap);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

exports['default'] = function (reducer) {
  var actionNames = [];
  if (!_isDomainMap2['default'](reducer) && _utils2['default'].values(reducer).length > 0) {
    throw new Error('Reducer definition object must begin with a domain definition.');
  }
  var iterator = function iterator(branch) {
    _utils2['default'].forEach(branch, function (value, domainName) {
      if (_isActionMap2['default'](value)) {
        _utils2['default'].forEach(value, function (action, name) {
          try {
            _validateActionType2['default'](name);
          } catch (e) {
            throw new Error('Reducer definition object action handler names must be valid action names.');
          }
          if (_ramda2['default'].contains(name, actionNames)) {
            throw new Error('Reducer definition object action handler names must be unique.');
          }
          if (name !== 'CONSTRUCT') {
            actionNames.push(name);
          }
        });
      } else if (_isDomainMap2['default'](value)) {
        iterator(branch[domainName]);
      } else {
        throw new Error('Reducer definition object value object all values must correspond to a function (action map) or an object (domain).');
      }
    });
  };
  iterator(reducer);
};

module.exports = exports['default'];
//# sourceMappingURL=validateReducer.js.map