import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import UsersBlock from 'components/UsersBlock/';
import * as actions from 'actions/user';

function filterUser(name, nameSearch) {
	let nameSername = name.toLowerCase();
	let sernameName = name.toLowerCase().split(' ').reverse().join(' ');
	return (
		nameSearch == '' || nameSername.includes(nameSearch) || sernameName.includes(nameSearch)
	);
}
function getSortableUsers(users, offset, sorting, nameSearch) {
	return users
	.filter(m => filterUser(m.name, nameSearch))
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
	let nameSearch = search.toLowerCase() || '';
	let filteringUsers = users.filter(m => filterUser(m.name, nameSearch));
	return {
		users: getSortableUsers(filteringUsers, offset, sorting, nameSearch),
		allCount: filteringUsers.length,
		view: view || 'table',
		offset: offset,
		load: load
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersBlock))
