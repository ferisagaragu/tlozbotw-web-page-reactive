import React, { Component } from 'react';
import { FormLoginComponent } from './form-login/form-login.component';
import { Container, Row, connect } from 'reactive';
import { login } from '../../core/actions/user.actions';

interface Props {
  login: Function;
  lostPassword: boolean;
}

interface State {}


class LoginView extends Component<Props, State> {

  render() {
    const { login, lostPassword } = this.props;

    return(
      <Container>
        <Row className="justify-content-md-center login-animation">
          <FormLoginComponent
            submitActions={ (formData: any) => login(formData) }
            cancel={ () => {} }
            islostPassword={ lostPassword }
          />
        </Row>
      </Container>
    );
  }

}

const mapStateToProps = (state: any) => ({
  lostPassword: state.lostPassword
});

const mapDispatchToProps = (dispatch: Function) => ({
  login: (formData: any) => dispatch(login(formData.email, formData.password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);