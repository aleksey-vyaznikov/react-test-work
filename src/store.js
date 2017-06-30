import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';


import rootReducer from './reducers/index';

const middleware = applyMiddleware(
	routerMiddleware(browserHistory),
	thunk,
	logger
);

const store = createStore( rootReducer, composeWithDevTools(
	middleware
));

export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers').default;
		console.log(nextRootReducer);
		store.replaceReducer(nextRootReducer);
	});
}


export default store;