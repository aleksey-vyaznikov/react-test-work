import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import UsersBlock from 'components/UsersBlock/';
import * as actions from 'actions/user';

function getSortableUsers(users, offset, sorting, name) {
	return users
	.filter(m => {
		return (
			(name == '' || m.name.toLowerCase().includes(name))
		);
	})
	.sort((a, b) => {
		if (sorting == 'age') {
			return a.age - b.age;
		}
		if (sorting == 'id') {
			return a.id - b.id;
		}
		if (sorting == 'name') {
			return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
		}
	}).slice(0 , offset)
}

function mapStateToProps(state, ownProps) {
	let { users, offset, load } = state.users;
	let { sorting, view, search }  = ownProps.location.query;
	let name = search || ''
	return {
		users: getSortableUsers(users, offset, sorting, name),
		allCount: users.filter(m => (name == '' || m.name.toLowerCase().includes(name))).length,
		view: view || 'table',
		offset: offset,
		load: load
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersBlock))
