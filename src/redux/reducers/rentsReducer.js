const INITIAL_STATE = {
    loading: false,
    rents: null,
    rented: null,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'START_LOADING_RENTS':
        case 'START_LOADING_ADD_RENT':
            return { ...state, loading: true };
        case 'RENTS_LIST_SUCCESS':
            return {
                ...state,
                rents: action.rents,
                loading: false,
            };
        case 'ADD_RENT_SUCCESS':
            return {
                ...state,
                rented: 'ok',
                loading: false,
            };
        case 'CLEAR':
            return {
                ...state,
                rented: null,
                loading: false,
            };
        case 'ADD_RENT_FAILED':
        case 'RENTS_LIST_FAILED':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};
