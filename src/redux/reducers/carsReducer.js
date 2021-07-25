const INITIAL_STATE = {
    loading: false,
    cars: null,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'START_LOADING_CARS':
            return { ...state, loading: true };
        case 'CARS_LIST_SUCCESS':
            return {
                ...state,
                cars: action.cars,
                loading: false,
            };
        case 'CARS_LIST_FAILED':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};
