import { Action } from "reactive";
import { AdminReducerEnum } from "../enums/admin-reducer.enum";


export const allUsers = (state = {}, action: Action) => {
  switch(action.type) {
    case AdminReducerEnum.SET_ALL_USERS_DATA: return action.payload;
    default: return state;
  }
}