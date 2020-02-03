import React, { Component, ReactElement } from 'react';
import { UserModel } from '../../../core/models/user.model';
import ItemUserComponent from '../item-user/item-user.component';
import { key, Row } from 'reactive';
import './list-user.css';

interface Props { 
  allUsers: Array<UserModel>;
  onDelete: Function;
}

interface State { }


class ListUserComponent extends Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  private renderItems(allUsers: Array<UserModel>): Array<ReactElement> {
    const listOut: Array<ReactElement> = [];

    allUsers.forEach((data: UserModel) => listOut.push(
      <ItemUserComponent 
        key={ key() }
        userData={ data }
        onDelete={ () => this.props.onDelete(data) }
      />
    ));

    return listOut;
  }

  render() {
    const { allUsers } = this.props;

    return (
      <Row className="justify-content-center">
        {
          allUsers && 
            this.renderItems(allUsers)
        }
      </Row>
    );
  }

}

export default ListUserComponent;