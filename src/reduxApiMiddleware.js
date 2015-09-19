import { normalize, Schema } from 'normalizr';
import fetch from 'isomorphic-fetch';
import isPlainObject from 'lodash.isplainobject';

class ApiError extends Error {
  constructor(status, statusText, response) {
    super();
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.message = `${status} - ${statusText}`;
    this.response = response;
  }
}

function callApi(endpoint, method, headers, body, schema) {
  const requestOptions = { method, body, headers }

  return fetch(endpoint, requestOptions)
    .then((response) => {
      if (response.ok) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    })
    .then((response) => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && ~contentType.indexOf('json')) {
        return response.json().then((json) => {
          if (schema) {
            return Promise.resolve(normalize(json, schema));
          } else {
            return Promise.resolve(json);
          }
        });
      } else {
        return Promise.resolve();
      }
    },
    (response) => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && ~contentType.indexOf('json')) {
        return response.json().then((json) => {
          return Promise.reject(new ApiError(response.status, response.statusText, json));
        });
      } else {
        return Promise.reject(new ApiError(response.status, response.statusText, response));
      }
    });
}

export const CALL_API = 'CALL_API'

export function isRSAA(action) {
  const validRootKeys = [
    CALL_API,
    'type',
    'payload',
    'meta'
  ];
  const validCallAPIKeys = [
    'endpoint',
    'method',
    'types',
    'body',
    'headers',
    'schema',
    'bailout'
  ];
  const validMethods = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ]

  const callAPI = action[CALL_API];
  if (!isPlainObject(action) || typeof callAPI === 'undefined') {
    return false;
  }

  const { endpoint, method, body, headers, schema, types, bailout } = callAPI;

  return Object.keys(action).every((key) => ~validRootKeys.indexOf(key)) &&
    isPlainObject(callAPI) &&
    Object.keys(callAPI).every((key) => ~validCallAPIKeys.indexOf(key)) &&
    (typeof endpoint === 'string' || typeof endpoint === 'function') &&
    ~validMethods.indexOf(method.toUpperCase()) &&
    (Array.isArray(types) && types.length === 3) &&
    (typeof headers === 'undefined' || isPlainObject(headers)) &&
    (typeof schema === 'undefined' || schema instanceof Schema || schema.hasOwnProperty('_itemSchema')) &&
    (typeof bailout === 'undefined' || typeof bailout === 'boolean' || typeof bailout === 'function');
}

export function apiMiddleware({ getState }) {
  return (next) => (action) => {
    const callAPI = action[CALL_API];
    if (!isRSAA(action)) {
      console.log('The following action is not RSAA')
      console.log(action)
      return next(action);
    }
    console.log('The following action is RSAA')
    console.log(action)

    let { endpoint } = callAPI;
    const { method, body, headers, schema, types, bailout } = callAPI;
    if (typeof endpoint === 'function') {
      endpoint = endpoint(getState());
    }
    if ((typeof bailout === 'boolean' && bailout) ||
        (typeof bailout === 'function' && bailout(getState()))) {
      return Promise.resolve('Bailing out');
    }

    function actionWith(data, payload) {
      const finalPayload = { ...action.payload, ...payload };
      const finalAction = { ...action, payload: finalPayload, ...data };
      delete finalAction[CALL_API];
      return finalAction;
    }

    const [requestType, successType, failureType] = types;
    next(actionWith({ type: requestType }));

    return callApi(endpoint, method, headers, body, schema).then(
      (response) => next(actionWith({ type: successType }, response)),
      (error) => next(actionWith({
        type: failureType,
        payload: error,
        error: true
      }))
    );
  };
}
