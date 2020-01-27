import { Action, alert, toast } from 'reactive';
import { UserReducerEnum } from '../enums/user-reducer.enum';
import LoginService from '../http/login.service';
import { UserModel } from '../models/user.model';


const loginService: LoginService = new LoginService();

export function setUserData(payload: any): Action {
  return { type: UserReducerEnum.SET_USER_DATA, payload };
}

export function setLostPasswor(payload: any): Action {
  return { type: UserReducerEnum.SET_LOST_PASSWORD, payload };
}

export function setLoginLoad(payload: any) {
  return { type: UserReducerEnum.SET_LOGIN_LOAD, payload };
}

export function login(email:string, password: string): Function {
  return async (dispatch: Function) => {
    dispatch(setLoginLoad(true));
    loginService.login(email, password, 
      (userData: any) => {
        const user: UserModel = new UserModel(userData.data);
        dispatch(setUserData(user));
        dispatch(setLostPasswor(false));
        dispatch(setLoginLoad(false));
        toast('success', `Bienvenid@ ${user.userName}`, 'bottom');
      }, (error: any) => {
        dispatch(setLostPasswor(true));
        dispatch(setLoginLoad(false));
        alert('error', error.message, '');
      }
    );
  }
}

export function recoverPassword(email: string): Function {
  return async (dispatch: Function) => {
    
  }
}