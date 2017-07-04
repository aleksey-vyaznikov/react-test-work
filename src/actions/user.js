export const loadUsers = () => dispatch => {
	dispatch({ type: 'LOAD_DATA_START'})
	$.getJSON( '/data/data.json', function(data) {
		dispatch({ type: 'LOAD_DATA', payload: data });
	})
	.fail(function(data, type, error) {
		dispatch({ type: 'LOAD_DATA_ERROR', payload: error})
	})
}

export const addUsers = (offset) => dispatch => {
	dispatch({ type: 'ADD_USERS_START'})
	setTimeout(function() {
		dispatch({ type: 'ADD_USERS', payload: offset });
	}, 0);
}

export const userStar = (id) => dispatch => {
	dispatch ({
		type: 'USER_STAR',
		id
	})
}


