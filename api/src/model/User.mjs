class Role {
  constructor(id, name) {
    this.id = id || 1;
    this.name = name;
  }
}

class User {
  constructor(
    id,
    username,
    firstName,
    lastName,
    password,
    role,
    isActive,
    refreshToken,
    refreshTokenExp
  ) {
    this.id = id || 1;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.role = role;
    this.isActive = isActive;
    this.refreshToken = refreshToken;
    this.refreshTokenExp = refreshTokenExp;
  }
}

export { Role, User };
