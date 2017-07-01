import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';



import styles from './styles.styl'

const PanelButton = ({ type, value, children, onClick, checked}) => (
		<div className="PanelButton">
			<input
				id={value}
				className="PanelButton__field"
				type="radio"
				name={type}
				value={value}
				onClick={e => onClick(type , e.target.value)}
				defaultChecked={checked}/>
			<label htmlFor={value} className="PanelButton__name">{children}</label>
		</div>
	)

export default PanelButton;