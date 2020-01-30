import React, { Component } from 'react';
import { connect } from 'reactive';

interface Props { }

interface State { }

class AdminUserView extends Component<Props,State> {
  
  render() {
    return (
      <>
      hola
      </>  
    );
  }

}

const mapStateToProps = (state: any) => ({ });

const mapDispatchToProps = (dispatch: Function) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserView);
