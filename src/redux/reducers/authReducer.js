const INITIAL_STATE = {
    isLoggedIn: false,
    loading: false,
    updated: false,
    user: null,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CLEAN_RESPONSE':
            return { ...state, error: null };
        case 'EDIT_PROFILE_START_LOADING':
        case 'START_LOADING':
            return { ...state, loading: true };
        case 'END_LOADING':
            return { ...state, loading: false };
        case 'LOGGED_IN':
            return {
                ...state,
                loading: false,
                user: action.user,
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

        case 'EDIT_PROFILE_SUCCESS':
            return {
                ...state,
                loading: false,
                updated: action.updated,
            };
        case 'EDIT_PROFILE_FAILED':
        case 'LOGIN_FAILED':
        case 'NOT_LOGGED_IN':
            return { ...state, error: action.error, loading: false };
        case 'LOGGED_OUT':
            return INITIAL_STATE;
        default:
            return state;
    }
};
