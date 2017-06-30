export default function users(state = {
	load: false,
	loaded: false,
	error: null,
	users: [],
	visibleUsers: [],
	offset: 10
}, action) {
	switch (action.type) {
		case 'LOAD_DATA_START': {
			return {...state, load: true}
			break;
		}
		case 'LOAD_DATA': {
			return {...state, load: false, loaded: true, users: action.payload }
			break;
		}
		case 'LOAD_DATA_ERROR': {
			return {...state, load: false, error: action.payload}
			break;
		}
		case 'ADD_USERS_START': {
			return {...state, load: true, loaded: false}
			break;
		}
		case 'ADD_USERS': {
			return {...state, load: false, loaded: true, offset: action.payload }
			break;
		}
		case 'USER_STAR': {
			return {
				...state,
				users: state.users.map( (user) => {
					return user.id === action.id ?
					Object.assign({}, user, { favourite: !user.favourite }) :
					user
				})
			}
			break;
		}


	}
	return state;
}