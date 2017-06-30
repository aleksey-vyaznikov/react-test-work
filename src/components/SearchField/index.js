import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';



import styles from './styles.styl'

const SearchField = ({ type, defaultValue, onChange, placeholder}) => (
		<div className="SearchField">
			<input defaultValue={defaultValue} className="SearchField__field" type="text" onChange={e=>onChange(type , e.target.value)} placeholder={placeholder}/>
		</div>
	)

export default SearchField;