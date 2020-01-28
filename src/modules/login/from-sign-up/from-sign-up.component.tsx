import React, { Component } from 'react';
import { 
  Card, 
  reduxForm, 
  RenderTextField, 
  Field, 
  GradientButton, 
  Col, 
  Space,
  RenderMaskField,
  FileField,
  FontAwesomeIcon
} from 'reactive';
import LoadingComponent from '../../../shared/loading/loading.component';
import { FormSignUpReducerEnum } from '../../../core/enums/form-sign-up-reducer.enum';
import bidKey from '../../../styles/img/big-key.png';
import link from '../../../styles/img/link.png';
import "./from-sign-up.css";


interface Props { 
  initialValues: any;
  handleSubmit: any;
  submitting: any;
  isLoading: boolean;
  submitActions: Function;
  onCancel: Function;
}

interface State { 
  fileLoad: any;
  submit: boolean;
}


class FormSignUp extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      fileLoad: null,
      submit: false
    }
  }

  private submitActions(formValues: any): void {
    const { submitActions } = this.props;
    const { fileLoad } = this.state;

    if (fileLoad && (Math.trunc((fileLoad.size ? fileLoad.size : 0) / 1024) < 3000)) {
      formValues.photoURL = fileLoad; 
      submitActions(formValues);
    }
  }

  render() {
    const { 
      handleSubmit,
      submitting,
      isLoading,
      onCancel
    } = this.props;
    const { fileLoad, submit } = this.state;

    return(
      <Card className="col-md-5 login-principal-container">
        <form onSubmit={ handleSubmit((formValues: any) => this.submitActions(formValues)) }>

          <Col className="mt-4" >
            <FileField
              className={ 
                `mt-3 mb-3 
                btn btn-outline-dark
                ${(!fileLoad && submit) && 'error'} 
                ${(fileLoad && !(Math.trunc((fileLoad.size ? fileLoad.size : 0) / 1024) < 3000)) && 'error'}` 
              }
              onSelectFile={ (file: any) => this.setState({ fileLoad: file }) }
              accept="image/x-png,image/gif,image/jpeg"
              preview={ true }
              classImage="rounded-circle"
              defaultImg={ <FontAwesomeIcon icon="user" size="6x" /> }
            >
              Subir imagen de perfil
            </FileField>

            <>
              {
                (!fileLoad && submit) && 
                  <div className="text-danger text-center mb-3">
                    La imagen de perfil es requerida
                  </div>
              }
              {
                (fileLoad && !(Math.trunc((fileLoad.size ? fileLoad.size : 0) / 1024) < 3000)) &&
                  <div className="text-danger text-center mb-3">
                    El tamaño de la imagen de perfil no puede superar los 3MB
                  </div>
              }
            </>
          </Col>

          <Field 
            className="form-control"
            name="name"
            type="text"
            component={ RenderTextField }
            label="Nombres"
            disabled={ isLoading }
          />

          <Field 
            className="form-control"
            name="lastName"
            type="text"
            component={ RenderTextField }
            label="Apellidos"
            disabled={ isLoading }
          />

          <Field 
            className="form-control"
            name="phoneNumber"
            type="text"
            component={ RenderMaskField }
            label="Numero telefonico"
            disabled={ isLoading }
            mask="+(99) 99-99-99-99-99"
          />

          <Field 
            className="form-control"
            name="userName"
            type="text"
            component={ RenderTextField }
            label="Nombre de usuario"
            disabled={ isLoading }
          />

          <Field 
            className="form-control"
            name="email"
            type="email"
            component={ RenderTextField }
            label="Correo electronico"
            disabled={ isLoading }
          />

          <Col className="text-center login-buttons" md={ 12 }>
            {
              isLoading ? 
                <LoadingComponent />
              :
                <>
                  <GradientButton
                    className="mr-3"
                    variant="ligthBlue-blue"
                    onClick={ () => onCancel() }
                  > 
                    <img 
                      className="login-img-icon" 
                      src={ link } 
                      alt="link zelda" 
                    />
                    <Space spaces={ 2 }/>
                    Cancelar
                  </GradientButton>

                  <GradientButton 
                    variant="green-ligthGreen"
                    type="submit"
                    onClick={ () => this.setState({ submit: true }) }
                    disabled={ submitting }
                  >
                    <img 
                      className="login-img-icon" 
                      src={ bidKey } 
                      alt="big key" 
                    />
                    <Space spaces={ 2 }/>
                    Registrar usuario
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
    name: '',
    lastName: '',
    phoneNumber: '',
    userName: '',
    email: ''
  }

  if (!values.name) {
    errors.name = 'El nombre de usuario es requerido';
  }

  if (!values.lastName) {
    errors.lastName = 'El apellido es requerido';
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = 'El telefono es requerido';
  }

  if (!values.userName) {
    errors.userName = 'El nombre es requerido';
  }

  if (!values.email) {
    errors.email = 'El correo electronico es requerido';
  }

  return errors;
}

export const FormSignUpComponent = reduxForm({
  form: FormSignUpReducerEnum.FORM_SIGN_UP_SUBMIT,
  validate
})(FormSignUp);