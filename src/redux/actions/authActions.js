import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "../../api/AuthService/";

export const login = (username, password) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING' });

        const params = { username, password };
        await AuthService.login(params)
            .then((response) => {
                console.log('login response: ', response);

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
                        dispatch({ type: 'LOGGED_IN' });
                        dispatch({
                            type: 'LOGIN_SUCCESS',
                            user: response.message,
                            error: null,
                        });
                        console.log('ppppppp');

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

export const loggedIn = () => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING' });
        AsyncStorage.getItem('SESSION').then((_value) => {
            if (_value) {
                dispatch({ type: 'LOGGED_IN', user: JSON.parse(_value) });
            } else {
                dispatch({ type: 'NOT_LOGGED_IN', error: 'Session introuvable' });
            }
        });
    };
};