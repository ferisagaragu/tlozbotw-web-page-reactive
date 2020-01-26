import { Action, alert, toast } from 'reactive';
import { UserReducerEnum } from '../enums/user-reducer.enum';
import UserService from '../http/user.service';
import { UserModel } from '../models/user.model';


const userService: UserService = new UserService();

export function setUserData(payload: any): Action {
  return { type: UserReducerEnum.SET_USER_DATA, payload };
}

export function setLostPasswor(payload: any): Action {
  return { type: UserReducerEnum.SET_LOST_PASSWORD, payload };
}

export function login(email:string, password: string): Function {
  return async (dispatch: Function) => {
    userService.login(email, password, 
      (userData: any) => {
        const user: UserModel = new UserModel(userData.data);
        dispatch(setUserData(user));
        dispatch(setLostPasswor(false));
        toast('success', `Bienvenid@ ${user.userName}`, 'bottom')
      }, (error: any) => {
        dispatch(setLostPasswor(true));
        alert('error', error.message, '');
      }
    );
  }
}
