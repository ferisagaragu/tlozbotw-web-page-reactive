import { Action } from "reactive";
import { LoadingReducerEnum } from "../enums/loading-reducer.enum";

export const loading = (state = {}, action: Action) => {
  switch(action.type) {
    case LoadingReducerEnum.SET_LOADING: return action.payload;
    default: return state;
  }
}