type State = {
	name: string;
}

type Action = {
	type: 'write',
	payload: string
}

const initialState:State = {
	name: 'Выберите семестр'
};

const semesterReducer = ( state:State = initialState, action:Action ):State => {
	switch (action.type) {
		case 'write':
			return {...state, name: action.payload}
		default:
			return state;
	}
}

export default semesterReducer;