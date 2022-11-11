export default class DatabaseService {
  constructor() {
    this.UserRepository = null;
    this.RoleRepository = null;
  }

  initDatabase() {
    return Promise.reject(new Error('not implemented'));
  }

  dropDatabase() {
    return Promise.reject(new Error('not implemented'));
  }
}
