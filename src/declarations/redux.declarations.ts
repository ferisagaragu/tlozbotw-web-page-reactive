import { combineReducers, reducer, windowSize } from 'reactive';
import { userData, lostPassword, loginLoad } from '../core/reducers/login.reducers';

export const reducers = combineReducers({
  form: reducer,
  windowSize,
  userData,
  lostPassword,
  loginLoad
});

export const initState = { 
  userData: null,
  lostPassword: false,
  loginLoad: false,
  windowSize: "xm"
};