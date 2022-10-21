import { validateRole } from '../../validation/UserValidation.mjs';
import RoleRepository from '../../../application/contract/RoleRepository.mjs';

export default class InMemoryRoleRepository extends RoleRepository {
  constructor() {
    super();
    this.roles = [];
    this.currentRoleId = 1;
  }

  async add(roleInstance) {
    roleInstance.id = this.currentRoleId;
    if (validateRole(roleInstance)) {
      try {
        roleInstance.id = this.currentRoleId;
        this.roles.push(roleInstance);
        this.currentRoleId++;

        return roleInstance;
      } catch (error) {
        throw error;
      }
    }
  }

  async getAll() {
    return this.roles;
  }
}
