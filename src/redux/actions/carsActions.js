import moment from "moment";
import { CarService } from "../../api/CarService";
import * as firebase from 'firebase';
import Utils from "../../utils";

export const getCars = (offset) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING_CARS' });
        const limit = 5;
        const params = { limit, offset };
        const response = await CarService.getCars(params);
        console.log('gg');
        if (typeof response !== 'string') {
            if (response && typeof response.message !== 'string') {
                const cars = response.message;
                var carsResponse = [];
                for (var i = 0; i < cars.length; i++) {
                    const item = cars[i];
                    const photoName = item.photo;
                    const photoUrl = await firebase.storage().ref().child("images/" + photoName).getDownloadURL();
                    carsResponse.push({ ...item, photoUrl });
                }
                dispatch({ type: 'CARS_LIST_SUCCESS', cars: carsResponse });
                return;
            }
        }
        dispatch({ type: 'CARS_LIST_FAILED', error: response.message });
    };
};

export const addCar = (id, brand, model, price, auto, photo, max_speed, pickup_position, fuel, seats, cyl_num, CRUD) => {
    return async (dispatch) => {
        dispatch({ type: 'START_LOADING_ADD_CAR' });

        const saveToServer = (params) => {
            CarService.crudCar(params)
                .then((response) => {
                    console.log('reponse: ', response);
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
            // Upload photo to FireBase
            console.log('photo: ', photo);
            const respoPhoto = await fetch(photo);
            var blob = await respoPhoto.blob();
            const imageExtension = Utils.getFileNameFromPath(photo).split('.')[1];
            const imageName = brand + "_" + model + "_" + moment.utc() + "." + imageExtension;
            firebase.storage().ref().child("images/" + imageName).put(blob).then((res) => {
                // Now photo uploaded then -> save data to server
                // Save data to SERVER
                saveToServer({...params, photo: photoName});

            }).catch((err) => {
                console.log('errPhoto: ', JSON.stringify(err));
                dispatch({ type: 'ADD_CAR_FAILED' });
            });
        } else {
            saveToServer({...params, photo});
        }
    };
};