export class UserModel {

  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  imageUrl: string;
  userName: string;
  email: string;
  firstSession: boolean;
  locked: boolean;
  enabled: boolean;
  roles: Array<String>;

  constructor(data: any | UserModel) {
    this.id = 0;
    this.name = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.imageUrl = '';
    this.userName = '';
    this.email = '';
    this.firstSession = false;
    this.locked = false;
    this.enabled = false;
    this.roles = [];

    Object.assign(this, data);
  }
}