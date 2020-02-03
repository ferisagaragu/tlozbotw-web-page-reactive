import { Action, alert, alertQuestion, alertLoading, closeAlertLoading } from 'reactive';
import { UserModel } from '../models/user.model';
import { setLogin } from './loading.action';
import AdminService from '../http/admin.service';
import { AdminReducerEnum } from '../enums/admin-reducer.enum';


const adminService: AdminService = new AdminService();

export function setAllUsers(payload: any): Action {
  return { type: AdminReducerEnum.SET_ALL_USERS_DATA, payload };
}

export function getAllUsers(adminId: number): Function {
  return async (dispatch: Function) => {
    dispatch(setLogin(true));
    adminService.getAllUsers(adminId, (resp: Array<UserModel>) => {
      dispatch(setLogin(false));
      dispatch(setAllUsers(resp));
    }, (error: any) => {
      dispatch(setLogin(false));
      alert('error', error.message, '');
    });
  }
}

export function lockUser(adminId: number): Function {
  return async (dispatch: Function) => {
    alertQuestion(
      'question', 
      'Eliminar usuario', 
      '¿Estas seguro que deseas eliminar el usuario?', 
      () => {
        dispatch(setLogin(true));
        adminService.lockUser(adminId, (resp: any) => {
          dispatch(setLogin(false));
          //dispatch(setAllUsers(resp));
        }, (error: any) => {
          dispatch(setLogin(false));
          alert('error', error.message, '');
        });
      }
    );
  }
}

export function deleteUser(userId: number, adminId: number): Function {
  return async (dispatch: Function) => {
    alertQuestion(
      'question', 
      'Eliminar usuario', 
      '¿Estas seguro que deseas eliminar el usuario?', 
      () => {
        dispatch(setLogin(true));
        alertLoading('Procesando solicitud');
        adminService.deleteUser(userId, (resp: any) => {
          dispatch(setLogin(false));
          dispatch(getAllUsers(adminId));
          closeAlertLoading();
          alert('success', resp.message, '');
        }, (error: any) => {
          dispatch(setLogin(false));
          closeAlertLoading();
          alert('error', error.message, '');
        });
      }
    );
  }
}