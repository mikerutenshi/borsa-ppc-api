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
    //remove role repository test
    //const { value, error } = validateRole(roleInstance);

    //if (error === undefined) {
    //  try {
    //    value.id = this.currentRoleId;
    //    this.roles.push(value);
    //    this.currentRoleId++;

    //    return value;
    //  } catch (error) {
    //    throw error;
    //  }
    //} else {
    //  handleValidationError(error);
    //}

    try {
      roleInstance.id = this.currentRoleId;
      this.roles.push(roleInstance);
      this.currentRoleId++;

      const result = this.roles.slice(-1);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return this.roles;
  }

  async getById(roleId) {
    const results = [];
    for (let role of this.roles) {
      if (role.id == roleId) {
        results.push(role);
        break;
      }
    }

    return results;
  }

  async getByName(name) {
    const results = [];
    for (let role of this.roles) {
      if (role.name == name) {
        results.push(role);
        break;
      }
    }

    return results;
  }

  async getByProp(property, value) {
    const results = [];
    for (let role of this.roles) {
      if (role[property].toLowerCase().includes(value)) {
        results.push(role);
        break;
      }
    }

    return results;
  }

  async update(roleInstance) {
    for (let role of this.roles) {
      if (role.id == roleInstance.id) {
        role.name = roleInstance.name;
        break;
      }
    }
    return await this.getById(roleInstance.id);
  }

  async delete(roleId) {
    this.roles.forEach((value, index, array) => {
      if (value.id == roleId) {
        array.splice(index, 1);
      }
    });
  }

  async clear() {
    this.roles = [];
    this.currentRoleId = 1;
  }
}
