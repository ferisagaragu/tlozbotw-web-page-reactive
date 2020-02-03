import React, { Component, ReactElement } from 'react';
import { Card, Row, Col, Badge, key, GradientButton } from 'reactive';
import { UserModel } from '../../../core/models/user.model';
import { resourceEnum } from '../../../core/enums/resource.enum';
import './item-user.css';

interface Props { 
  userData: UserModel;
  onDelete: Function;
}

interface State { }


class ItemUserComponent extends Component<Props,State> {

  constructor(props: Props) {
    super(props);
  }

  private getRoles(roles: Array<string>): Array<ReactElement> {
    return roles.map((role: any) => {
      const roleName: string = role.replace('ROLE_', '');

      return (
        <Badge
          key={ key() }
          className="mr-2"
          variant={ 
            roleName === 'ADMIN' ? 
              "danger" 
            : 
              "info" 
          }
        >
          { role.replace('ROLE_', '') }
        </Badge>
      )
    });
  }

  render() {
    const { userData, onDelete } = this.props;

    return (
      <Card className="mb-4 ml-4 col-md-5">
        <Row className="mt-3 mb-3">
          <Col className="text-center" md={ 12 }>
            <img 
              className="rounded-circle user-image" 
              src={
                userData.imageUrl ?
                  userData.imageUrl
                :
                  resourceEnum.DEFAULT_USER_IMAGE
              }
            />

            <h5 className="mt-3">
              ({ userData.userName })
            </h5>

            {
              this.getRoles(userData.roles)
            }
          </Col>

          <Col className="mt-4 text-center" md={ 12 }>
            <h5>{ `${userData.name} ${userData.lastName}` }</h5>
            <h5>{ `${userData.phoneNumber}` }</h5>
            <h5>{ userData.email }</h5>
          </Col>

          <Col className="mt-4 mb-2 text-center" md={ 12 }>
            <GradientButton 
              variant="yellow-orange"
            >
              Bloquear
            </GradientButton>

            <GradientButton
              className="ml-3"
              variant="red-lightRed"
              onClick={ () => onDelete() }
            >
              Eliminar
            </GradientButton>
          </Col>
        </Row>
      </Card>
    );
  }

}

export default ItemUserComponent;