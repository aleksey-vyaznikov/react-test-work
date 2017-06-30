import React from 'react';
import styles from './styles.styl';
import Container from 'components/Container/';
import Lang from 'components/Lang/';
import text from 'config/text.json';
const HeaderContainer = ({lang}) => (
		<div className="HeaderContainer">
			<Container>
				<h1 className="HeaderContainer__title">{text.title[lang]}</h1>
				<Lang className="HeaderContainer__lang"/>
			</Container>
		</div>
)
export default HeaderContainer