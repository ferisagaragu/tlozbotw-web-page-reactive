import { Action, alert, toast, Firebase, key } from 'reactive';
import { LoginReducerEnum } from '../enums/login-reducer.enum';
import LoginService from '../http/login.service';
import { UserModel } from '../models/user.model';
import { setLogin } from './loading.action';
import { LoginMessageEnum } from '../enums/message.enum';


const loginService: LoginService = new LoginService();
const firebase: Firebase = new Firebase();

export function setUserData(payload: any): Action {
  return { type: LoginReducerEnum.SET_USER_DATA, payload };
}

export function setLostPassword(payload: any): Action {
  return { type: LoginReducerEnum.SET_LOST_PASSWORD, payload };
}

export function login(email:string, password: string): Function {
  return async (dispatch: Function) => {
    dispatch(setLogin(true));
    loginService.login(email, password, 
      (userData: any) => {
        const user: UserModel = new UserModel(userData.data);
        dispatch(setUserData(user));
        dispatch(setLostPassword(false));
        dispatch(setLogin(false));
        toast('success', `Bienvenid@ ${user.userName}`, 'bottom');
      }, (error: any) => {
        dispatch(setLostPassword(true));
        dispatch(setLogin(false));
        alert('error', error.message, '');
      }
    );
  }
}

export function logout(): Function {
  return async (dispatch: Function) => {
    dispatch(setUserData(null));
    toast('info', `Sesión cerrada`, 'bottom');
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