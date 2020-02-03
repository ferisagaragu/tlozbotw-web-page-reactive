import { Action } from 'reactive';
import { LoginReducerEnum } from '../enums/login-reducer.enum';

export const userData = (state = {}, action: Action) => {
  switch(action.type) {
    case LoginReducerEnum.SET_USER_DATA: return action.payload;
    default: return state;
  }
}

export const lostPassword = (state = {}, action: Action) => {
  switch(action.type) {
    case LoginReducerEnum.SET_LOST_PASSWORD: return action.payload;
    default: return state;
  }
}