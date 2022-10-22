import { validateRole } from '../../validation/UserValidation.mjs';
import RoleRepository from '../../../application/contract/RoleRepository.mjs';
import { handleValidationError } from '../../validation/HandleValidationError.mjs';

export default class InMemoryRoleRepository extends RoleRepository {
  constructor() {
    super();
    this.roles = [];
    this.currentRoleId = 1;
  }

  async add(roleInstance) {
    const { value, error } = validateRole(roleInstance);

    if (error === undefined) {
      try {
        value.id = this.currentRoleId;
        this.roles.push(value);
        this.currentRoleId++;

        return value;
      } catch (error) {
        throw error;
      }
    } else {
      handleValidationError(error);
    }
  }

  async getAll() {
    return this.roles;
  }

  async clear() {
    this.roles = [];
    this.currentRoleId = 1;
  }
}
