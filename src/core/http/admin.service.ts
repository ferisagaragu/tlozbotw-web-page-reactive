import { AxiosResponse, AxiosError } from 'reactive';
import { axiosInstance } from '../../config/app.config';
import { UserModel } from '../models/user.model';
import { GeneralMessageEnum } from '../enums/message.enum';

class AdminService {

  public getAllUsers(adminId: number, onSuccess: Function, onError: Function): void {
    axiosInstance.get(`/user/get-all/${adminId}`,{
      headers: {
        Authorization: `${sessionStorage.getItem('type')} ${sessionStorage.getItem('token')}`
      } 
    }).then((resp) => {
      const users: Array<UserModel> = resp.data.data.map(
        (data: any) => new UserModel(data)
      );
      onSuccess(users);
    }).catch(function (error: AxiosError) {
      if (!error.response) {
        onError({ message: GeneralMessageEnum.SERVER_ERROR });
      } else {
        onError(error.response.data);
      }
    });
  }

  public lockUser(adminId: number, onSuccess: Function, onError: Function): void {
    axiosInstance.put(`/user/lock/${adminId}`,{
      headers: {
        Authorization: `${sessionStorage.getItem('type')} ${sessionStorage.getItem('token')}`
      } 
    }).then((resp) => {
      onSuccess(resp);
    }).catch((error: AxiosError) => {
      if (!error.response) {
        onError({ message: GeneralMessageEnum.SERVER_ERROR });
      } else {
        onError(error.response.data);
      }
    });
  }

  public deleteUser(userId: number, onSuccess: Function, onError: Function): void {
    axiosInstance.delete(`/user/${userId}`,{
      headers: {
        Authorization: `${sessionStorage.getItem('type')} ${sessionStorage.getItem('token')}`
      } 
    }).then((resp: AxiosResponse) => {
      onSuccess(resp.data);
    }).catch((error: AxiosError) =>  {
      if (!error.response) {
        onError({ message: GeneralMessageEnum.SERVER_ERROR });
      } else {
        onError(error.response.data);
      }
    });
  }

}

export default AdminService;