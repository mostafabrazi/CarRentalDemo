import moment from "moment";
import { CarService } from "../../api/CarService";
import * as firebase from 'firebase';
import Utils from "../../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LIMIT = 5; // PAGE count to be changed from here

export const clearState = () => {
    return async (dispatch) => {
        dispatch({ type: 'CLEAR' });
    };
};

// !!! Made this func generic to use it in getCars func here and in infinite scroll (fetch more in cars list) !!!
export const getCarsAPI = async (offset, user, filter = {}) => {
    const {id, role} = user;
    const params = { limit: LIMIT, offset, ...filter, user_id: id, role };
    const response = await CarService.getCars(params);
    if (typeof response !== 'string') {
        if (response && typeof response.message !== 'string' && response.message.cars) {

            const { rents_count, brands, cars} = response.message;
            var carsResponse = [];
            for (var i = 0; i < cars.length; i++) {
                const item = cars[i];
                const photoName = item.photo;
                const photoUrl = await firebase.storage().ref().child("images/" + photoName).getDownloadURL();
                carsResponse.push({ ...item, photoUrl });
            }
            return { type: 'CARS_LIST_SUCCESS', cars: carsResponse, rents_count, brands };
        }
    }
    return { type: 'CARS_LIST_FAILED', error: response.message };
};

export const getCars = (offset, filter = {}) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'START_LOADING_CARS' });
        var user = getState().authReducer.user;
        if (!user) {
            user = JSON.parse(await AsyncStorage.getItem('SESSION'));
        }
        const response = await getCarsAPI(offset, user, filter);
        dispatch(response);
    };
};

export const addCar = (id, brand, model, price, auto, photo, max_speed, pickup_position, fuel, seats, cyl_num, CRUD) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING_ADD_CAR' });

        const saveToServer = (params) => {
            CarService.crudCar(params)
                .then((response) => {
                    if (response && 'status' in response && response.status && response.message) {
                        dispatch({ type: 'ADD_CAR_SUCCESS' });
                        return;
                    }
                    dispatch({ type: 'ADD_CAR_FAILED', error: response.message });
                })
                .catch((_error) => {
                    console.log('error: ', JSON.stringify(_error));
                    dispatch({ type: 'ADD_CAR_FAILED' });
                });;
        };

        // parameters to be sent in request
        const params = { id, brand, model, price, auto: auto ? 1 : 0, max_speed, pickup_position, fuel, seats, cyl_num, CRUD };

        // Check if image not changed while "edit" ACTION
        if (photo.indexOf('file') !== -1) {
            /* 
                TODO: - clean the code here
                      - Make a Singleton of FIREBASE actions in Utils
            */
            // Upload photo to FireBase
            const respoPhoto = await fetch(photo);
            var blob = await respoPhoto.blob();
            const imageExtension = Utils.getFileNameFromPath(photo).split('.')[1];
            const imageName = brand + "_" + model + "_" + moment.utc() + "." + imageExtension;
            firebase.storage().ref().child("images/" + imageName).put(blob).then((res) => {
                // Now photo uploaded then -> save data to server
                // Save data to SERVER
                saveToServer({...params, photo: imageName});

            });
        } else {
            saveToServer({...params, photo});
        }
    };
};