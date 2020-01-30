import React, { Component, ReactElement } from 'react';
import { connect, Header, UserButton, UserOptionItem, Space, Badge } from 'reactive';
import { navMenu } from '../../declarations/nav-menu.declarations';
import { UserModel } from '../../core/models/user.model';

interface Props { 
  userData: UserModel
}

interface State { 
  updateUsers: boolean
}


class HeaderView extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      updateUsers: false
    }
  }

  componentDidMount() {
    const { userData } = this.props;
    if (userData != null) {
      this.setState({ updateUsers: userData.roles.includes('ROLE_ADMIN') });
    }
  }
  private renderRoles(roles: Array<string>): Array<ReactElement> {
    const out: Array<ReactElement> = [];
    
    roles.forEach((element: any) => {
      out.push(
        <>
          <Space />
          <Badge
            variant="info"
          >
            { element.replace('ROLE_', '') }
          </Badge>
          <Space />
        </>  
      );
    });

    return out;
  }

  render() {
    const { userData } = this.props;
    const { updateUsers } = this.state;

    return(
      <Header 
          menuData={ navMenu }
          left={<></>}
          center={<></>}
          right={
            <UserButton 
              src={ userData.imageUrl }
              title={ userData.userName }
              onClick={ () => {} }
            >
              <UserOptionItem
                onClick={ () => {} }
              >
                { `${userData.name} ${userData.lastName}` }                  
                { this.renderRoles(userData.roles) }
              </UserOptionItem>

              {
                updateUsers &&
                  <UserOptionItem
                    onClick={ () => {} }
                  >
                    Administrar usuarios
                  </UserOptionItem>
              }
            </UserButton>
          }
        />
    );
  }

}

const mapStateToProps = (state: any) => ({ 
  userData: state.userData
});

const mapDispatchToProps = (dispatch: Function) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);