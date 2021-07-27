const INITIAL_STATE = {
    loading: false,
    cars: null,
    crud: null,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'START_LOADING_ADD_CAR':
        case 'START_LOADING_CARS':
            return { ...state, loading: true };
        case 'CARS_LIST_SUCCESS':
            return {
                ...state,
                cars: action.cars,
                loading: false,
            };
        case 'ADD_CAR_SUCCESS':
            return {
                ...state,
                crud: 'ok',
                loading: false,
            };
        case 'ADD_CAR_FAILED':
        case 'CARS_LIST_FAILED':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};
