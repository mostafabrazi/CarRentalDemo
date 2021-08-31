import {combineReducers} from 'redux';
import authReducer from './authReducer';
import carsReducer from './carsReducer';
import rentsReducer from './rentsReducer';

export default combineReducers({
  authReducer,
  carsReducer,
  rentsReducer,
});
