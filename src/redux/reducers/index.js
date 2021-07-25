import {combineReducers} from 'redux';
import authReducer from './authReducer';
import carsReducer from './carsReducer';

export default combineReducers({
  authReducer,
  carsReducer,
});
