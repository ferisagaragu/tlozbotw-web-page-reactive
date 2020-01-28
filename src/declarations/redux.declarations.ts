import { combineReducers, reducer, windowSize } from 'reactive';
import { userData, lostPassword } from '../core/reducers/login.reducer';
import { loading } from '../core/reducers/loading.reducer';

export const reducers = combineReducers({
  form: reducer,
  windowSize,
  userData,
  lostPassword,
  loading
});

export const initState = { 
  userData: null,
  lostPassword: false,
  loading: false,
  windowSize: "xm"
};