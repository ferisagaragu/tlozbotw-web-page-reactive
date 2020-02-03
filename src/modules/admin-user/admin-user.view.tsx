import React, { Component } from 'react';
import { connect } from 'reactive';
import { UserModel } from '../../core/models/user.model';
import { getAllUsers, lockUser, deleteUser } from '../../core/actions/admin.action';
import ListUserComponent from './list-user/list-user.component';

interface Props {
  userData: UserModel;
  allUsers: Array<UserModel>;
  getAllUsers: Function;
  lockUser: Function;
  deleteUser: Function;
}

interface State { }

class AdminUserView extends Component<Props,State> {
  
  componentDidMount() {
    const { userData, getAllUsers } = this.props;
    getAllUsers(userData.id);
    lockUser(userData.id);
  }

  render() {
    const { allUsers, userData, lockUser, deleteUser } = this.props;

    return (
      <ListUserComponent 
        allUsers={ allUsers }
        onDelete={ (userDeleteData: UserModel) => { 
          deleteUser(userDeleteData.id, userData.id) 
        }}
      />
    );
  }

}

const mapStateToProps = (state: any) => ({
  userData: state.userData,
  allUsers: state.allUsers
});

const mapDispatchToProps = (dispatch: Function) => ({
  getAllUsers: (adminId: number) => dispatch(getAllUsers(adminId)),
  lockUser: (adminId: number) => dispatch(lockUser(adminId)),
  deleteUser: (userId: number, adminId: number) => dispatch(deleteUser(userId, adminId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserView);
