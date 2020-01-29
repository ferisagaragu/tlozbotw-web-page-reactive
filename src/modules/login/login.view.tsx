import React, { Component } from 'react';
import { FormLoginComponent } from './form-login/form-login.component';
import { Container, Row, connect } from 'reactive';
import { login, recoverPassword, signUp } from '../../core/actions/login.action';
import { FormRecoverPasswordComponent } from './from-recover-password/from-recover-password.component';
import { FormSignUpComponent } from './from-sign-up/from-sign-up.component';
import { UserModel } from '../../core/models/user.model';

interface Props {
  lostPassword: boolean;
  loading: boolean;
  login: Function;
  recoverPassword: Function;
  signUp: Function;
}

interface State {
  showForm: number;
}


class LoginView extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      showForm: 0
    };
  }

  render() {
    const { login, lostPassword, loading, recoverPassword, signUp } = this.props;
    const { showForm } = this.state;

    return(
      <Container>
        <Row className="justify-content-md-center login-animation">
          {
            showForm === 0 && 
              <FormSignUpComponent 
                submitActions={ (formData: UserModel) => signUp(formData) }
                onCancel={ () => { this.setState({ showForm: 1 }); } }
                isLoading={ loading }
              />
          }

          {
            showForm === 1 &&
              <FormLoginComponent
                submitActions={ (formData: any) => login(formData) }
                onRegist={ () => this.setState({ showForm: 0 }) }
                onRecoverPassword={ () => this.setState({ showForm: 2 }) }
                islostPassword={ lostPassword }
                isLoading={ loading }
              />
          }

          {
            showForm === 2 && 
              <FormRecoverPasswordComponent 
                submitActions={ (formData: any) => recoverPassword(formData) }
                onCancel={ () => { this.setState({ showForm: 1 }); } }
                isLoading={ loading }
              />
          }
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = (state: any) => ({
  lostPassword: state.lostPassword,
  loading: state.loading
});

const mapDispatchToProps = (dispatch: Function) => ({
  login: (formData: any) => dispatch(login(formData.email, formData.password)),
  recoverPassword: (formData: any) => dispatch(recoverPassword(formData.email)),
  signUp: (formData: UserModel) => dispatch(signUp(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);