'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.apiMiddleware = apiMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _normalizr = require('normalizr');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var ApiError = (function (_Error) {
  _inherits(ApiError, _Error);

  function ApiError(status, statusText, response) {
    _classCallCheck(this, ApiError);

    _Error.call(this);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.message = status + ' - ' + statusText;
    this.response = response;
  }

  return ApiError;
})(Error);

function callApi(endpoint, method, headers, body, schema) {
  var requestOptions = { method: method, body: body, headers: headers };
  return _isomorphicFetch2['default'](endpoint, requestOptions).then(function (response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  }).then(function (response) {
    var contentType = response.headers.get('Content-Type');
    if (contentType && ~contentType.indexOf('json')) {
      return response.json().then(function (json) {
        if (schema) {
          return Promise.resolve(_normalizr.normalize(json, schema));
        } else {
          return Promise.resolve(json);
        }
      });
    } else {
      return Promise.resolve();
    }
  }, function (response) {
    var contentType = response.headers.get('Content-Type');
    if (contentType && ~contentType.indexOf('json')) {
      return response.json().then(function (json) {
        return Promise.reject(new ApiError(response.status, response.statusText, json));
      });
    } else {
      return Promise.reject(new ApiError(response.status, response.statusText, response));
    }
  });
}

var CALL_API = 'CALL_API';

exports.CALL_API = CALL_API;

function apiMiddleware(_ref) {
  var getState = _ref.getState;

  return function (next) {
    return function (action) {
      if (getState() instanceof _immutable2['default'].Map) {
        if (getState().get('session') !== undefined) {
          if (getState().get('session').get('token') !== undefined && getState().get('session').get('token') !== null) {
            var token = getState().get('session').get('token');
          }
        }
      }
      var callAPI = action[CALL_API];
      if (typeof callAPI === 'undefined') {
        return next(action);
      }
      var endpoint = callAPI.endpoint;
      var method = callAPI.method;
      var body = callAPI.body;
      var headers = callAPI.headers;
      var schema = callAPI.schema;
      var types = callAPI.types;
      var bailout = callAPI.bailout;

      if (token !== undefined) {
        headers = { Authorization: 'Bearer ' + token };
      }
      /*
      if (typeof endpoint === 'function') {
        endpoint = endpoint(getState());
      }
      if ((typeof bailout === 'boolean' && bailout) ||
          (typeof bailout === 'function' && bailout(getState()))) {
        return Promise.resolve('Bailing out');
      }*/
      function actionWith(data, payload) {
        var finalPayload = _extends({}, action.payload, payload);
        var finalAction = _extends({}, action, { payload: finalPayload }, data);
        delete finalAction[CALL_API];
        return finalAction;
      }
      var requestType = types[0];
      var successType = types[1];
      var failureType = types[2];

      next(actionWith({ type: requestType }));
      return callApi(endpoint, method, headers, body, schema).then(function (response) {
        return next(actionWith({ type: successType }, response));
      }, function (error) {
        return next(actionWith({
          type: failureType,
          payload: error,
          error: true
        }));
      });
    };
  };
}
//# sourceMappingURL=reduxApiMiddleware.js.map