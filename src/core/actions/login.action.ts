import { Action, alert, toast, Firebase, key } from 'reactive';
import { UserReducerEnum } from '../enums/user-reducer.enum';
import LoginService from '../http/login.service';
import { UserModel } from '../models/user.model';
import { setLogin } from './loading.action';
import { LoginMessageEnum } from '../enums/message.enum';


const loginService: LoginService = new LoginService();
const firebase: Firebase = new Firebase();

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

export function signUp(userData: UserModel): Function {
  return async (dispatch: Function) => {
    let fileName = key();
    dispatch(setLogin(true));
    firebase.putStorage(`/user-img/${fileName}`, userData.imageUrl, (url: string) => {
      userData.imageUrl = url;
      loginService.signUp(userData, 
        (resp: any) => {
          alert('success', resp.message, '');
          dispatch(setLogin(false));
        }, (error: any) => {
          firebase.removeStorage(`/user-img/${fileName}`);
          alert('error', error.message, '');
          dispatch(setLogin(false));
        }
      );
    }, () => {
      alert('error', LoginMessageEnum.UPDATE_PHOTO_ERROR, '');
      dispatch(setLogin(false));
    });
    
  }
}