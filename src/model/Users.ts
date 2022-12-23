import { BaseModel } from './BaseModel';

class User extends BaseModel {
  username: string;
  first_name: string;
  last_name: string;
  password?: string;
  role_id: number;
  is_active: boolean;
  access_token?: string;
  refresh_token?: string;
  refresh_token_exp_date?: string;

  constructor(
    username: string,
    first_name: string,
    last_name: string,
    password: string,
    role_id: number
  ) {
    super('user', 'username', username);

    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.role_id = role_id;
    this.is_active = false;
  }
}

class Login {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

class AuthParam {
  id: number;
  refresh_token: string;
  refresh_token_exp_date: string;

  constructor(id: number, refreshToken: string, refreshTokenExpDate: string) {
    this.id = id;
    this.refresh_token = refreshToken;
    this.refresh_token_exp_date = refreshTokenExpDate;
  }
}

export { User, Login, AuthParam };
