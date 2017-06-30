import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import store from './store';

const rootEl = document.getElementById('root');

const render = Component => {
	ReactDOM.render(
		<Provider store={store}>
			<AppContainer>
				<Root />
			</AppContainer>
		</Provider>,
		rootEl
	)
}

render(Root)

if (module.hot) {
  module.hot.accept('./Root', () => { render(Root) })
}