'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _validateReducer = require('./validateReducer');

var _validateReducer2 = _interopRequireDefault(_validateReducer);

var _validateAction = require('./validateAction');

var _validateAction2 = _interopRequireDefault(_validateAction);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _isActionMap = require('./isActionMap');

var _isActionMap2 = _interopRequireDefault(_isActionMap);

var _isDomainMap = require('./isDomainMap');

var _isDomainMap2 = _interopRequireDefault(_isDomainMap);

var immutableIterableCheck = function immutableIterableCheck(collection, message) {
  if (!_immutable2['default'].Iterable.isIterable(collection)) {
    throw new Error(message);
  }
};

var iterator = function iterator(domain, action, reducersObj, actionTracker) {
  immutableIterableCheck(domain, 'Domain must be an instance of Immutable.Iterable.');
  _ramda2['default'].mapObjIndexed(function (value, domainName) {
    if (_isActionMap2['default'](value)) {
      if (value[action.type]) {
        actionTracker.isActionHandled = true;
        var result = value[action.type](domain.get(domainName), action);
        immutableIterableCheck(result, 'Reducer must return an instance of Immutable.Iterable. "' + domainName + '" domain "' + action.type + '" action handler result is "' + typeof result + '".');
        domain = domain.set(domainName, result);
      }
    } else if (_isDomainMap2['default'](value)) {
      domain = domain.set(domainName, iterator(domain.get(domainName) || _immutable2['default'].Map(), action, value, actionTracker));
    }
  }, reducersObj);
  return domain;
};

exports['default'] = function (reducer) {
  _validateReducer2['default'](reducer);
  return function (state, action) {
    if (typeof action !== 'object') {
      throw new Error('Action parameter value must be an object.');
    }
    if (action.type && action.type.indexOf('@@') === 0) {
      console.info('Uh Oh, it looks like you are using ' + action.type + ', which is not supported');
      return state;
    }
    _validateAction2['default'](action);
    var actionTracker = {
      isActionHandled: false
    };
    var newState = iterator(state, action, reducer, actionTracker);
    if (!actionTracker.isActionHandled && action.type !== 'CONSTRUCT') {
      console.warn('Unhandled action "' + action.type + '".', action);
    }
    return newState;
  };
};

module.exports = exports['default'];
//# sourceMappingURL=combineReducers.js.map