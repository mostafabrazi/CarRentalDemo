import axiosInstance from "..";
const qs = require('qs');

// Paths (to be concatenated to BASE_URL)
const RENTS_LIST_PATH = "rents/";
const CRUD_RENT_PATH = "rents/CRUD/";

// Authentication API calls
export class RentService {
    static getRents = (params) => {
      return axiosInstance
        .post(RENTS_LIST_PATH, qs.stringify(params))
        .then((response) => response.data);
    };

    static crudRent = (params) => {
      return axiosInstance
        .post(CRUD_RENT_PATH, qs.stringify(params))
        .then((response) => response.data);
    };
}