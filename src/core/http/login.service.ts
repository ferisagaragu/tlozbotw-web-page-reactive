import { axiosInstance } from '../../config/app.config';

class LoginService {

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

  public recoverPassword(email: string, onSuccess: Function, onError: Function): void {
    axiosInstance.post('/auth/recover-password', {
      email
    },{ 
      headers: {
        Authorization: `${sessionStorage.getItem('type')} ${sessionStorage.getItem('token')}`
      } 
    }).then(function (resp: any) {
      onSuccess(resp.data);
    }).catch(function (error: any) {
      onError(error.response.data);
    });
  }

}

export default LoginService;