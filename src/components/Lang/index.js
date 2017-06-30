import React, { Component } from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router';

import styles from './styles.styl'

const Lang = (props) => {
	let query =  props.location.query ? Object.assign({}, props.location.query) : ''
	query = JSON.stringify(query);
	return (
		<div className={props.className}>
			<Link to={{ pathname: '/', query: props.location.query }} className="Lang" activeClassName="Lang_active"> ru</Link>
			<Link to={{ pathname: '/en', query: props.location.query }} className="Lang" activeClassName="Lang_active"> en</Link>
		</div>
	)
}

export default withRouter(Lang);
