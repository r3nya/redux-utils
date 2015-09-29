/* @flow weak */
export default (name, endpoint, method, body, headers, rest) => {
  if (body === undefined) {
  return function () {
        return {
          type: 'CALL_API',
          CALL_API: {
            types: [`${name}_REQUEST`, `${name}_SUCCESS`, `${name}_FAILURE`],
            endpoint: endpoint,
            method: method
          }
        }
    }
  } else if (typeof body === 'function' && typeof endpoint === 'string') {
    return function () {
        return {
          type: 'CALL_API',
          CALL_API: {
            types: [`${name}_REQUEST`, `${name}_SUCCESS`, `${name}_FAILURE`],
            endpoint: endpoint,
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: body(...arguments)
          }
        }
    }
  }	else if (typeof body === 'string' && typeof endpoint === 'function') {
    return function () {
        return {
          type: 'CALL_API',
          CALL_API: {
            types: [`${name}_REQUEST`, `${name}_SUCCESS`, `${name}_FAILURE`],
            endpoint: endpoint(...arguments),
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: body
          }
        }
    }
  } else {
    let stringified = JSON.stringify(body)
    return function () {
        return {
          type: 'CALL_API',
          CALL_API: {
            types: [`${name}_REQUEST`, `${name}_SUCCESS`, `${name}_FAILURE`],
            endpoint: endpoint,
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: stringified
          }
        }
    }
  }
}