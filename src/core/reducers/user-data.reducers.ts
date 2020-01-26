import { Action } from 'reactive';
import { UserReducerEnum } from '../enums/user-reducer.enum';

export const userData = (state = {}, action: Action) => {
  switch(action.type) {
    case UserReducerEnum.SET_USER_DATA: return action.payload;
    default: return state;
  }
}

export const lostPassword = (state = {}, action: Action) => {
  switch(action.type) {
    case UserReducerEnum.SET_LOST_PASSWORD: return action.payload;
    default: return state;
  }
}