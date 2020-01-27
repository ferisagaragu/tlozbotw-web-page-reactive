import React, { Component } from 'react';
import { 
  Card, 
  reduxForm, 
  RenderTextField, 
  Field, 
  GradientButton, 
  Col, 
  Space
} from 'reactive';
import { FormRecoverPasswordReducerEnum } from '../../../core/enums/form-recover-password-reducer';
import LoadingComponent from '../../../shared/loading/loading.component';
import shieldPixel from '../../../styles/img/shield-pixel.png';
import heartPixel from '../../../styles/img/heart-pixel-emply.png';
import "./from-recover-password.css";

interface Props { 
  initialValues: any;
  handleSubmit: any;
  submitting: any;
  islostPassword: boolean;
  isLoading: boolean;
  submitActions: Function;
  onCancel: Function;
}

interface State { }


class FormRecoverPassword extends Component<Props, State> {

  render() {
    const { handleSubmit, submitActions, submitting, onCancel, isLoading } = this.props;

    return(
      <Card className="p-4 recover-margin">
        <form onSubmit={ handleSubmit(submitActions) }>
          <Col>
            <b>
              Si has olvidado tu contraseña puedes recuperarla 
              enviando un codigo de verificacion a tu correo.
            </b>
          </Col>

          <Col className="mt-4 mb-4">
            <Field 
              className="form-control"
              name="recoverPassword"
              type="email"
              component={ RenderTextField }
              label="Email de recuperacion"
            />
          </Col>

          <Col className="text-center" md={ 12 }>
            {
              isLoading ? 
                <LoadingComponent />
              :
                <>
                  <GradientButton
                    className="mr-3"
                    variant="red-ligthRed"
                    onClick={ () => { console.log('cancelo'); onCancel();} }
                  > 
                    <img 
                      className="login-img-icon" 
                      src={ heartPixel } 
                      alt="heart pixel emply" 
                    />
                    <Space spaces={ 2 }/>
                    Cancelar
                  </GradientButton>

                  <GradientButton 
                    variant="ligthBlue-purple"
                    type="submit"
                    disabled={ submitting }
                  >
                    <img 
                      className="login-img-icon" 
                      src={ shieldPixel } 
                      alt="shield key" 
                    />
                    <Space spaces={ 2 }/>
                    Recuperar contraseña
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

export const FormRecoverPasswordComponent = reduxForm({
  form: FormRecoverPasswordReducerEnum.FORM_RECOVER_PASSWORD_SUBMIT,
  validate
})(FormRecoverPassword);