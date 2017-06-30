import React from 'react';
import PanelContainer from 'containers/PanelContainer/';
import UsersContainer from 'containers/UsersContainer/';
import HeaderContainer from 'containers/HeaderContainer/';
import Container from 'components/Container/';

import styles from './styles/styles.styl';


const App = ({ params }) => {
	return(
		<div className="App">
			<HeaderContainer lang={params.lang || 'ru'} />
			<Container>
				<PanelContainer lang={params.lang || 'ru'} />
				<UsersContainer lang={params.lang || 'ru'} />
			</Container>
		</div>
	);
}
export default App;