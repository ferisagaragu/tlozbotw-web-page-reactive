import React, { Component } from 'react';
import { 
  Card, 
  reduxForm, 
  RenderTextField, 
  Field, 
  GradientButton, 
  Col, 
  Space, 
  Row
} from 'reactive';
import LoadingComponent from '../../../shared/loading/loading.component';
import { FormLoginReducerEnum } from '../../../core/enums/form-login-reducer.enum';
import bidKey from '../../../styles/img/big-key.png';
import dangerMan from '../../../styles/img/danger-man.png';
import sword from '../../../styles/img/sword.png';
import link from '../../../styles/img/link.png';
import logo from '../../../styles/animation/login-logo.gif';
import "./form-login.css";

interface Props { 
  initialValues: any;
  handleSubmit: any;
  submitting: any;
  islostPassword: boolean;
  isLoading: boolean;
  submitActions: Function;
  onRecoverPassword: Function;
  onRegist: Function;
}

interface State { }


class FormLogin extends Component<Props, State> {

  render() {
    const { 
      handleSubmit, 
      submitActions, 
      submitting, 
      islostPassword, 
      isLoading, 
      onRecoverPassword, 
      onRegist 
    } = this.props;

    return(
      <Card className="col-md-5 login-principal-container">
        <form onSubmit={ handleSubmit(submitActions) }>

          <Col className="text-center" md={ 12 }>
           <img 
             className="login-logo" 
             src={ logo }
             alt="login logo"
            />
          </Col>

          <Field 
            className="form-control"
            name="email"
            type="email"
            component={ RenderTextField }
            label="Nombre de usuario, correo electronico o telefono"
            disabled={ isLoading }
          />

          <Field 
            className="form-control"
            name="password"
            type="password"
            component={ RenderTextField }
            label="Contraseña"
            disabled={ isLoading }
          />

          {
            islostPassword &&
              <Row className="login-is-danger">
                <Col className="text-center danger-man-container" md={ 12 }>
                  <img 
                    className="danger-man" 
                    src={ dangerMan } 
                    alt="danger man" 
                  />
                </Col>
                Es peligroso ir solo...
                si no recuertas tu contraseña toma esto.
                <Col className="text-center recover-container" md={ 12 }>
                  <img 
                    className="recover-img" 
                    src={ sword }
                    alt="recover sword"
                    onClick={ () => onRecoverPassword() } 
                  />
                </Col>
              </Row>
          }

          <Col className="text-center login-buttons" md={ 12 }>
            {
              isLoading ? 
                <LoadingComponent />
              :
                <>
                  <GradientButton
                    className="mr-3"
                    variant="ligthBlue-blue"
                    onClick={ () => onRegist() }
                  > 
                    <img 
                      className="login-img-icon" 
                      src={ link } 
                      alt="link zelda" 
                    />
                    <Space spaces={ 2 }/>
                    Registrar usuario
                  </GradientButton>

                  <GradientButton 
                    variant="green-ligthGreen"
                    type="submit"
                    disabled={ submitting }
                  >
                    <img 
                      className="login-img-icon" 
                      src={ bidKey } 
                      alt="big key" 
                    />
                    <Space spaces={ 2 }/>
                    Iniciar sesión
                  </GradientButton>
                </>
            }
          </Col>
        </form>
      </Card>
    );
  }

}

const validate = (values: any) => {
  const errors = { 
    email: '',
    password: ''
  }

  if (!values.email) {
    errors.email = 'El nombre de usuario, correo electronico o telefono es requerido'
  }

  if (!values.password) {
    errors.password = 'La contraseña es requerida'
  }

  return errors;
}

export const FormLoginComponent = reduxForm({
  form: FormLoginReducerEnum.FORM_LOGIN_SUBMIT,
  validate
})(FormLogin);