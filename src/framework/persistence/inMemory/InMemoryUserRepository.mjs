import UserRepository from '../../../application/contract/UserRepository.mjs';
import { validateUser } from '../../validation/UserValidation.mjs';
import { Token } from '../../web/encryption/Encrypt.mjs';
import DateUtil from '../../../util/DateUtil.mjs';
import { Hash } from '../../web/encryption/Encrypt.mjs';
import { handleValidationError } from '../../validation/HandleValidationError.mjs';
import { ValidationError } from '../../../model/Error.mjs';
import User from '../../../model/User.mjs';

export default class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
    this.currentUserId = 1;
  }

  async add(userInstance) {
    //const { value, error } = validateUser(userInstance);

    //if (error === undefined) {
    //  try {
    //    value.password = await Hash.create(value.password);
    //    value.id = this.currentUserId;
    //    this.users.push(value);
    //    this.currentUserId++;
    //    return value;
    //  } catch (error) {
    //    throw error;
    //  }
    //} else {
    //  handleValidationError(error);
    //}

    try {
      //value.password = await Hash.create(value.password);
      userInstance.id = this.currentUserId;
      this.users.push(userInstance);
      this.currentUserId++;
      return userInstance;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return this.users;
  }

  async getByProp(property, value) {
    let result = [];
    if (property == 'username') {
      for (let user of this.users) {
        if (user.username == value) {
          result.push(user);
        }
      }
    } else {
      for (let user of this.users) {
        if (user[property].toLowerCase().includes(value)) {
          result.push(user);
        }
      }
    }

    return result;
  }

  async getByUsername(username) {
    let results = [];
    for (let user of this.users) {
      if (user.username == username) {
        results.push(user);
        break;
      }
    }

    return results;
  }

  async getById(id) {
    let result = [];
    for (let user of this.users) {
      if (user.id == id) {
        result.push(user);
        break;
      }
    }

    return result;
  }

  async update(userInstance) {
    this.users.forEach((value, index, array) => {
      if (value.id == userInstance.id) {
        array[index].first_name = userInstance.first_name;
        array[index].last_name = userInstance.last_name;
        array[index].role_id = userInstance.role_id;
        array[index].is_active = userInstance.is_active;
      }
    });
    return await this.getById(userInstance.id);
  }

  async delete(userId) {
    let result = false;
    this.users.forEach((value, index, array) => {
      if (value.id == userId) {
        array.splice(index, 1);
        result = true;
      }
    });

    return result;
  }

  async clear() {
    this.users = [];
    this.currentUserId = 1;
  }

  async authenticate(authInstance) {
    const results = [];

    for (let user of this.users) {
      if (user.id == authInstance.id) {
        user.refresh_token = authInstance.refresh_token;
        user.refresh_token_exp_date = authInstance.refresh_token_exp_date;
        results.push(user);
      }
    }

    return results;
  }
}
