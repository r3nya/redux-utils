# redux-utils
#### Utility functions for redux 

Redux-utils makes it easy to combine redux and immutableJS as well as make api calls using FSA conventions.

It combines
[redux-immutable](https://github.com/gajus/redux-immutable) and
[redux-api-middleware](https://github.com/agraboso/redux-api-middleware).
It also adds two simple custom functions for creating actions and api call actions.

[Click here](https://github.com/penguinsoccer/redux-utils-example) for an example recreating the redux async example with far less code.

---
##### Installation

`npm install redux-utils`

##### Usage 

The two custom functions that come with redux-utils are `createAction` and `createApiAction`. They do what their names says.

Use `createAction` like this `createAction(Type, payloadTypes)`

`let action = createAction('FOO', 'id')`

This will make

    let action = (value) => {
    return {
        type: 'FOO',
        payload: {
            id: value
            }
        }
    }

If you want more than just one parameter

        let action = createAction('FOO', 'user', 'pwd')
This will make 

    let action = (user, pwd) => {
        return {
            type: 'FOO',
            payload: {
                userName: user,
                password: pwd
            }
        }
    }

In order to get the api calls to actually work, you need to apply this middleware.

Example: 

    import { apiMiddleware } from 'redux-utils'
    const createStoreWithMiddleware = applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      apiMiddleware
    )(createStore);

Now, `createApiAction(name, endpoint, method, body, rest(not Implemented yet))`

`let createFetchSubmissionsAction = createApiAction('POSTS','api/posts', 'GET')`

Well that's terse. It creates an api call to `api/posts` with the `GET` method and it creates 3 different actions that you can apply reducers to, `'POSTS_REQUEST'`, `'POSTS_SUCCESS'` and`'POSTS_FAILURE'`. The actions are made from the name given then `_REQUEST`, `_SUCCESS` and `_FAILURE` added to the end.

Now lets have a slightly more complex api call

    let createLoginAction = createApiAction('LOGIN', 'api/login', 'POST',
    function(user, password) {
        return JSON.stringify({
        userName: user,
        password: password
        })
    })
    
This creates `LOGIN_REQUEST`, `LOGIN_SUCCESS` and `LOGIN_FAILURE` which you can use with reducers. In order to call createLoginAction, you pass in a username and a password which are sent in the body of the request as a JSON object. Simple.

Combine reducers is a function from [redux-immutable](https://github.com/gajus/redux-immutable) with minor changes to make it FSA standard. 

The example below starts a store with the `CONSTRUCT` reducers. The import of reducers is different than normal so in order to use this, you need to check out the documentation of [redux-immutable](https://github.com/gajus/redux-immutable).

    let reducer = combineReducers(reducers)
    let state = Immutable.Map({})
    state = reducer(state, {type: `CONSTRUCT`})
    const Store = createStoreWithMiddleware(reducer, state)

All functions and middleware is imported with {} around it, there is no default export.

---

There is a currently a feature in the middleware where if you have an Immutable store and have a session object with token inside, it will use the token as part of the api call and place it in the header of the request. This will be worked on more.


#### Current maintainers:
[Divoolej](https://github.com/Divoolej)
