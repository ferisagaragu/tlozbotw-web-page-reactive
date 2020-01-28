import { Action, alert, toast } from 'reactive';
import { UserReducerEnum } from '../enums/user-reducer.enum';
import LoginService from '../http/login.service';
import { UserModel } from '../models/user.model';
import { setLogin } from './loading.action';


const loginService: LoginService = new LoginService();

export function setUserData(payload: any): Action {
  return { type: UserReducerEnum.SET_USER_DATA, payload };
}

export function setLostPasswor(payload: any): Action {
  return { type: UserReducerEnum.SET_LOST_PASSWORD, payload };
}

export function login(email:string, password: string): Function {
  return async (dispatch: Function) => {
    dispatch(setLogin(true));
    loginService.login(email, password, 
      (userData: any) => {
        const user: UserModel = new UserModel(userData.data);
        dispatch(setUserData(user));
        dispatch(setLostPasswor(false));
        dispatch(setLogin(false));
        toast('success', `Bienvenid@ ${user.userName}`, 'bottom');
      }, (error: any) => {
        dispatch(setLostPasswor(true));
        dispatch(setLogin(false));
        alert('error', error.message, '');
      }
    );
  }
}

export function recoverPassword(email: string): Function {
  return async (dispatch: Function) => {
    dispatch(setLogin(true));
    loginService.recoverPassword(email, 
      (resp: any) => {
        alert('success', resp.message, '');
        dispatch(setLogin(false));
      }, (error: any) => {
        alert('error', error.message, '');
        dispatch(setLogin(false));
      }
    );
  }
}