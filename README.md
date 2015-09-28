# redux-utils
##### Utility functions for redux 

Redux-utils is a simple library combining
[redux-immutable](https://github.com/gajus/redux-immutable) and
[redux-api-middleware](https://github.com/agraboso/redux-api-middleware).
It also adds two simple custom functions for creating actions and api call actions.
---
##### Installation

`npm install redux-utils`

---

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

    let action = createAction('FOO', function(user, pwd){
    return {
            userName : user,
            password : pwd
        }
    })
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

---

There is a currently a feature in the middleware where if you have an Immutable store and have a session object with token inside, it will use the token as part of the api call and place it in the header of the request. This will be worked on more.

