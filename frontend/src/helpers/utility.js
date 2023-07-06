const getAuthUser = () => {
	const authUser = localStorage.getItem('user')
		? JSON.parse(localStorage.getItem('user'))
		: '';
	return { ...authUser };
};

const isDefined = (object, property = null) => {
	if (property === null) {
		return typeof object !== 'undefined';
	}

	return (
		typeof object !== 'undefined' &&
		object &&
		typeof object[property] !== 'undefined'
	);
};

export const utility = {
	getAuthUser,
	isDefined,
};
