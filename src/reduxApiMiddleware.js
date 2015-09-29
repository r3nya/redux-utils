/* @flow weak */
import { normalize, Schema } from 'normalizr';
import fetch from 'isomorphic-fetch';
import Immutable from 'immutable'

class ApiError extends Error {
  status: any;
  statusText: string;
  response: Object;
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

export function apiMiddleware({ getState }) {
  return (next) => (action) => {
    if (getState() instanceof Immutable.Map) {
      if (getState().get('session') !== undefined) {
        if (getState().get('session').get('token') !== undefined && getState().get('session').get('token') !== null) {
          var token = getState().get('session').get('token')
        }
      }
    }
    const callAPI = action[CALL_API];
    if (typeof callAPI === 'undefined') {
      return next(action);
    }
    let { endpoint } = callAPI;
    let { method, body, headers, schema, types, bailout } = callAPI;
    if (token !== undefined && token !== '' && token !== null) {
      headers = {Authorization: `Bearer ${token}`}    
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
      const finalPayload = { ...action.payload, ...payload };
      const finalAction = { ...action, payload: finalPayload, ...data };
      delete finalAction[CALL_API];
      return finalAction;
    }
    let [requestType, successType, failureType] = types;
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