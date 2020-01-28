import { LoadingReducerEnum } from '../enums/loading-reducer.enum';

export function setLogin(payload: any) {
  return { type: LoadingReducerEnum.SET_LOADING, payload };
}