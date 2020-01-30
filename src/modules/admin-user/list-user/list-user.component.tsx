import React, { Component } from 'react';
import './list-user.css';


interface Props { }

interface State { }


class ListUserComponent extends Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <>
        ListUserComponent rendered
      </>
    );
  }

}

export default ListUserComponent;