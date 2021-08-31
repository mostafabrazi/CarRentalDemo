import { RentService } from "../../api/RentService";
import * as firebase from 'firebase';

export const getRents = (offset) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'START_LOADING_RENTS' });
        const limit = 10; // PAGE count to be changed from here
        const {id: user_id, role} =  getState().authReducer.user;
        const params = { limit, offset, user_id, role };
        const response = await RentService.getRents(params);
        console.log('rents: ', response);
        if (typeof response !== 'string') {
            if (response && typeof response.message !== 'string') {
                const rents = response.message;
                var rentsResponse = [];
                for (var i = 0; i < rents.length; i++) {
                    const item = rents[i];
                    const photoName = item.photo;
                    const photoUrl = await firebase.storage().ref().child("images/" + photoName).getDownloadURL();
                    rentsResponse.push({ ...item, photoUrl });
                }
                dispatch({ type: 'RENTS_LIST_SUCCESS', rents: rentsResponse });
                return;
            }
        }
        dispatch({ type: 'RENTS_LIST_FAILED', error: response.message });
    };
};

export const crudRent = (id, car_id, user_id, pickup_date, return_date, client_phone, local, status, CRUD) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING_ADD_RENT' });

        const saveToServer = (params) => {
            RentService.crudRent(params)
                .then((response) => {
                    if (response && 'status' in response && response.status && response.message) {
                        dispatch({ type: 'ADD_RENT_SUCCESS' });
                        return;
                    }
                    dispatch({ type: 'ADD_RENT_FAILED', error: response.message });
                })
                .catch((_error) => {
                    console.log('error: ', JSON.stringify(_error));
                    dispatch({ type: 'ADD_RENT_FAILED' });
                });;
        };

        // parameters to be sent in request
        const params = { id, car_id, user_id, pickup_date, return_date, client_phone, local, status, CRUD };
        saveToServer(params);
    };
};