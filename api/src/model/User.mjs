class Role {
  constructor(id = null, name) {
    this.id = id;
    this.name = name;
  }
}

class User {
  constructor(
    id = null,
    username,
    firstName,
    lastName,
    password,
    Role,
    isActive,
    refreshToken,
    refreshTokenExp
  ) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.Role = Role;
    this.isActive = isActive;
    this.refreshToken = refreshToken;
    this.refreshTokenExp = refreshTokenExp;
  }
}

export { Role, User };
