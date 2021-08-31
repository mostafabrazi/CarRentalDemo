import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "../../api/AuthService/";

export const login = (username, password) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING' });

        const params = { username, password };
        await AuthService.login(params)
            .then((response) => {
                if (response && 'status' in response && response.status) {
                    if (typeof response.message === 'string') {
                        dispatch({
                            type: 'LOGIN_FAILED',
                            user: null,
                            error: response.message,
                        });
                        return;
                    }
                    AsyncStorage.setItem('SESSION', JSON.stringify(response.message)).then((_value) => {
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            user: response.message,
                            error: null,
                        });
                    });
                    return;
                }
                dispatch({
                    type: 'LOGIN_FAILED',
                    user: null,
                    error: response.message,
                });
            })
            .catch((_error) => {
                dispatch({
                    type: 'LOGIN_FAILED',
                    user: null,
                    error: 'Erreur inconu',
                });
            });
    };
};

export const editProfile = (id, first_name, last_name, username) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'EDIT_PROFILE_START_LOADING' });

        const params = { id, first_name, last_name, username };
        await AuthService.editProfile(params)
            .then((response) => {
                if (response && 'status' in response && response.status) {
                    const usr = { ...getState().authReducer.user, first_name, last_name, username };
                    AsyncStorage.setItem('SESSION', JSON.stringify(usr)).then((_value) => {
                        dispatch({ type: 'LOGGED_IN', user: usr });
                        dispatch({
                            type: 'EDIT_PROFILE_SUCCESS',
                            updated: response.message,
                            error: null,
                        });
                        return;
                    });
                }
            })
            .catch((_error) => {
                dispatch({
                    type: 'EDIT_PROFILE_FAILED',
                    error: 'Erreur inconu',
                });
            });
    };
};

// Destroy session -> update state with LOGGED_OUT to trigger redirect to login screen later
export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING' });
        AsyncStorage.removeItem('SESSION').then((value) => {
            // TODO: TO BE REMOVED (Just to simulate spiner)
            setTimeout(() => {
                dispatch({ type: 'LOGGED_OUT' });
            }, 250);
        });
    };
};

// Check if user logged in already 
export const loggedIn = () => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING' });
        AsyncStorage.getItem('SESSION').then((_value) => {
            if (_value) {
                dispatch({ type: 'LOGGED_IN', user: JSON.parse(_value) });
            } else {
                dispatch({ type: 'NOT_LOGGED_IN', error: '' });
            }
        });
    };
};