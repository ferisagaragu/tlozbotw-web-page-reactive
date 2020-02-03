import React, { Component, ReactElement } from 'react';
import { connect, Header, UserButton, UserOptionItem, Space, Badge, key } from 'reactive';
import { navMenu } from '../../declarations/nav-menu.declarations';
import { UserModel } from '../../core/models/user.model';
import { logout } from '../../core/actions/login.action';

interface Props { 
  userData: UserModel
  logout: Function;
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
        <span key={ key() }>
          <Space />
          <Badge
            variant="info"
          >
            { element.replace('ROLE_', '') }
          </Badge>
          <Space />
        </span>
      );
    });

    return out;
  }

  render() {
    const { userData, logout } = this.props;
    const { updateUsers } = this.state;

    return(
      <Header 
          menuData={ navMenu }
          left={ <></> }
          center={ <></> }
          right={
            <UserButton 
              src={ userData.imageUrl }
              title={ userData.userName }
              onClick={ () => logout() }
            >
              <UserOptionItem
                link=""
              >
                { `${userData.name} ${userData.lastName}` }                  
                { this.renderRoles(userData.roles) }
              </UserOptionItem>

              {
                updateUsers &&
                  <UserOptionItem
                    link="/admin-user"
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

const mapDispatchToProps = (dispatch: Function) => ({ 
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);