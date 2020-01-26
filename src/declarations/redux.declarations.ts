import { combineReducers, reducer, windowSize } from 'reactive';
import { userData, lostPassword } from '../core/reducers/user-data.reducers';

export const reducers = combineReducers({
  form: reducer,
  windowSize,
  userData,
  lostPassword
});

export const initState = { 
  userData: null,
  lostPassword: false,
  windowSize: "xm"
};