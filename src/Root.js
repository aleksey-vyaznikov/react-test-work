import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

import App from './App';

const Root = () => {
	return (
		<Router history={history}>
			<Route path="/(:lang)" component={App} />
		</Router>
	)
}

export default Root