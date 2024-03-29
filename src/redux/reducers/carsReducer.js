const INITIAL_STATE = {
    loading: false,
    cars: null,
    rents_count: null,
    brands: null,
    crud: null,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'START_LOADING_ADD_CAR':
        case 'START_LOADING_CARS':
            return { ...state, loading: true };
        case 'CARS_LIST_SUCCESS':
            const {rents_count, brands, cars} = action;
            return {
                ...state,
                cars,
                rents_count,
                brands,
                loading: false,
            };
        case 'ADD_CAR_SUCCESS':
            return {
                ...state,
                crud: 'ok',
                loading: false,
            };
        case 'CLEAR':
            return {
                ...state,
                crud: null,
                loading: false,
            };
        case 'ADD_CAR_FAILED':
        case 'CARS_LIST_FAILED':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};
