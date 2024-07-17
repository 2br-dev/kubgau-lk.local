type User = {
	login: string,
	fullname: string,
	token: string
}

type Action = {
	type: string,
	payload: any
}

const userReducer = (state: User | {}, action: Action) => {
	switch (action.type) {
		case "LOGIN":
			return { ...state, action }
		case "LOGOUT":
			return { ...state, action }
	}
	return {};
}

export default userReducer;
