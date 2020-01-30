import React, { Component } from 'react';
import LoginView from './login/login.view';
import { connect, Container } from 'reactive';
import Routing from '../core/routes/routing.routes';
import { UserModel } from '../core/models/user.model';
import HeaderView from './header/header.view';

interface Props {
  userData: UserModel
}

interface State { }

class App extends Component<Props,State> {
  
  render() {
    const { userData } = this.props;
    
    return (
      !userData ?
        <LoginView />
      :
        <>
          <HeaderView />

          <Container className="r-app-container">
            <Routing />
          </Container>
        </>  
    );
  }

}

const mapStateToProps = (state: any) => ({
  userData: state.userData
});

const mapDispatchToProps = (dispatch: Function) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(App);
