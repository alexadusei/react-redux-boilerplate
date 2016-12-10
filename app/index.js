import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from './config/routes'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {routerReducer, syncHistoryWithStore} from 'react-router-redux'
import * as reducers from 'redux/modules'
import {browserHistory} from 'react-router'

// create store by combining all reducers from your reducers/modules, including
// routing history. Compose lets you apply several store enhancers in a row
// use applyMiddleware function to add redux thunks (a means of returning
// functions to call later) for your action creators to return functions 
// (dispatches) instead of doing their actions right away. Add Redux DevTools 
// extension to get your Redux Debugger on Chrome
const store = createStore(
  combineReducers({...reducers, routing: routerReducer}),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

// syncs history with your redux state tree. Allows you to look at your
// history in relation to how state tree changes per route, and saves each
// state tree in consecutive order of how the user changes routes
const history = syncHistoryWithStore(browserHistory, store)

// react-redux's Provider allows you to connect your redux store to your routes
ReactDOM.render(
  <Provider store={store}>
    {getRoutes(history)}
  </Provider>,
  document.getElementById('app')
)
