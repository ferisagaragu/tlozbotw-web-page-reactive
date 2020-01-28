import React, { Component } from 'react';
import { FormLoginComponent } from './form-login/form-login.component';
import { Container, Row, connect } from 'reactive';
import { login, recoverPassword } from '../../core/actions/login.action';
import { FormRecoverPasswordComponent } from './from-recover-password/from-recover-password.component';
import { FormSignUpComponent } from './from-sign-up/from-sign-up.component';

interface Props {
  lostPassword: boolean;
  loading: boolean;
  login: Function;
  recoverPassword: Function;
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
    const { login, lostPassword, loading, recoverPassword } = this.props;
    const { showForm } = this.state;

    return(
      <Container>
        <Row className="justify-content-md-center login-animation">
          {
            showForm === 0 && 
              <FormSignUpComponent 
                submitActions={ (formData: any) => { console.log(formData) } }
                onCancel={ () => { this.setState({ showForm: 1 }); } }
                isLoading={ loading }
              />
          }

          {
            showForm === 1 &&
              <FormLoginComponent
                submitActions={ (formData: any) => login(formData) }
                onRegist={ () => { console.log('cancelo') } }
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
  recoverPassword: (FormData: any) => dispatch(recoverPassword(FormData.email))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);