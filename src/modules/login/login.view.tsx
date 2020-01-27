import React, { Component } from 'react';
import { FormLoginComponent } from './form-login/form-login.component';
import { Container, Row, connect } from 'reactive';
import { login } from '../../core/actions/login.actions';
import { FormRecoverPasswordComponent } from './from-recover-password/from-recover-password.component';

interface Props {
  login: Function;
  lostPassword: boolean;
  loginLoad: boolean;
}

interface State {
  showForm: number;
}


class LoginView extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      showForm: 2
    };
  }

  render() {
    const { login, lostPassword, loginLoad } = this.props;
    const { showForm } = this.state;

    return(
      <Container>
        <Row className="justify-content-md-center login-animation">
          {
            showForm === 0 && 
              <>
                Registrar
              </>
          }

          {
            showForm === 1 &&
              <FormLoginComponent
                submitActions={ (formData: any) => login(formData) }
                onRegist={ () => { console.log('cancelo') } }
                onRecoverPassword={ () => this.setState({ showForm: 2 }) }
                islostPassword={ lostPassword }
                isLoading={ loginLoad }
              />
          }

          {
            showForm === 2 && 
              <FormRecoverPasswordComponent 
                submitActions={ (formData: any) => login(formData) }
                onCancel={ () => { this.setState({ showForm: 1 }); } }
                islostPassword={ lostPassword }
                isLoading={ loginLoad }
              />
          }
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = (state: any) => ({
  lostPassword: state.lostPassword,
  loginLoad: state.loginLoad
});

const mapDispatchToProps = (dispatch: Function) => ({
  login: (formData: any) => dispatch(login(formData.email, formData.password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);