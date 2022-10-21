class User {
  constructor(username, first_name, last_name, password, role_id) {
    this.id = null;
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.role_id = role_id;
    this.is_active = false;
    this.access_token = null;
    this.refresh_token = null;
    this.refresh_token_exp_date = null;
  }
}

export default User;
