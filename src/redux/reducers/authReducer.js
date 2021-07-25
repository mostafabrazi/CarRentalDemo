const INITIAL_STATE = {
    isLoggedIn: false,
    loading: false,
    user: null,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CLEAN_RESPONSE':
            return { ...state, error: null };
        case 'START_LOADING':
            return { ...state, loading: true };
        case 'END_LOADING':
            return { ...state, loading: false };
        case 'LOGGED_IN':
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                error: null,
                user: action.user,
                loading: false,
                isLoggedIn: true,
            };
        case 'LOGIN_FAILED':
        case 'NOT_LOGGED_IN':
            return { ...state, error: action.error, loading: false };
        case 'LOGOUT_SUCCESS':
            return INITIAL_STATE;
        case 'LOGOUT_FAILED':
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};
