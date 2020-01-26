import { axiosInstance } from '../../config/app.config';

class UserService {

  public login(email: string, password: string, onSuccess: Function, onError: Function): void {

    axiosInstance.post('/auth/sign-in', {
      userName: email,
      password: password
    },{ 
      headers: {
        Authorization: `${sessionStorage.getItem('type')} ${sessionStorage.getItem('token')}`
      } 
    }).then(function (resp: any) {
      sessionStorage.setItem('token', resp.data.data.token);
      sessionStorage.setItem('type', resp.data.data.type);
      onSuccess(resp.data);
    }).catch(function (error: any) {
      onError(error.response.data);
    });
  }

}

export default UserService;