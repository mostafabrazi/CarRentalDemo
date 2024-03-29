/**
 * ###################################################
 * ############## API configurations #################
 * ###################################################
 */
import axios from 'axios';
const LOCAL = false;

// BASE URL of the API
export const BASE_URL = LOCAL ? 'http://192.168.1.200:8888/CarRentalAPIDemo/' : 'https://carrentalyouschool.000webhostapp.com/';

// Axios config
export const config = {
  timeout: 30000,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const axiosInstance = axios.create(config);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // In case we want to intercept response before using it 
    // Do something here 
    return response;
  },
  function (error) {
    console.log('error: ', JSON.stringify(error));
    return Promise.reject(error);
  },
);

export default axiosInstance;
