export const setFavouriteUsers = data => {
	if (!localStorage.getItem("favourite")) {
		let favourite = data.filter((user) => user.favourite).map((user)=> user.id)
		var serialObj = JSON.stringify(favourite);
		localStorage.setItem("favourite", serialObj);
	}
}

export const updateFavouriteUsers = id => {
	var favourite = JSON.parse(localStorage.getItem("favourite"))
	if (favourite.indexOf(id) == -1) {
		favourite.push(id);
	} else {
		favourite.splice(favourite.indexOf(id),1)
	}
	var serialObj = JSON.stringify(favourite);
	localStorage.setItem('favourite', serialObj);
}

export const getIsFavouriteUser = id => {
		let favourited = JSON.parse(localStorage.getItem("favourite"));
		let isFavourite = (favourited.indexOf(id) !== -1) ? true : false;
		return isFavourite;
}

export function pluralize(n, forms){
	return forms[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
}