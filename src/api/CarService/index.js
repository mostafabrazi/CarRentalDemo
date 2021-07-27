import axiosInstance from "..";
const qs = require('qs');

// Paths (to be concatenated to BASE_URL)
const CAR_LIST_PATH = "cars/";
const CRUD_CAR_PATH = "cars/CRUD/";

// Authentication API calls
export class CarService {
    static getCars = (params) => {
      return axiosInstance
        .post(CAR_LIST_PATH, qs.stringify(params))
        .then((response) => response.data);
    };

    static crudCar = (params) => {
      return axiosInstance
        .post(CRUD_CAR_PATH, qs.stringify(params))
        .then((response) => response.data);
    };
}