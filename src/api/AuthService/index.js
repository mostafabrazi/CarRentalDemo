import axiosInstance from "..";
const qs = require('qs');

// Paths (to be concatenated to BASE_URL)
const LOGIN_PATH = "auth/login/";
const PROFILE_PATH = "auth/profile/";

// Authentication API calls
export class AuthService {
    static login = (params) => {
      return axiosInstance
        .post(LOGIN_PATH, qs.stringify(params))
        .then((response) => response.data);
    };

    static editProfile = (params) => {
      return axiosInstance
        .post(PROFILE_PATH, qs.stringify(params))
        .then((response) => response.data);
    };
}