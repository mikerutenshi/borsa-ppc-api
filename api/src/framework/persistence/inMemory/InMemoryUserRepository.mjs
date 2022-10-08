import UserRepository from '../../../application/contract/UserRepository.mjs';

export default class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
    this.roles = [];
    this.currentUserId = 1;
    this.currentRoleId = 1;
  }

  async addRole(roleInstance) {
    try {
      roleInstance.id = this.currentRoleId;
      this.currentRoleId++;
      this.roles.push(roleInstance);
    } catch (error) {
      throw new Error('add role fail');
    }

    return roleInstance;
  }

  async add(userInstance) {
    try {
      userInstance.id = this.currentUserId;
      this.currentUserId++;
      this.roles.push(userInstance);
    } catch (error) {
      throw new Error('add user fail');
    }

    return userInstance;
  }
}
