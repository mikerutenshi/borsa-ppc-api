import UserRepository from '../../../application/contract/UserRepository.mjs';
import { validateUser } from '../../validation/UserValidation.mjs';
import { Token } from '../../web/encryption/Encrypt.mjs';
import DateUtil from '../../../util/DateUtil.mjs';
import { Hash } from '../../web/encryption/Encrypt.mjs';
import { ValidationError } from '../../../model/Error.mjs';

export default class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
    this.currentUserId = 1;
  }

  async add(userInstance) {
    const refreshToken = await Token.generateRefreshToken();
    let expDate = new Date();
    expDate = DateUtil.addDays(expDate, 7);

    userInstance.refresh_token = refreshToken;
    userInstance.refresh_token_exp_date = expDate;

    const { value, error } = validateUser(userInstance);

    if (error === undefined) {
      try {
        value.password = await Hash.create(value.password);
        value.id = this.currentUserId;
        this.users.push(value);
        this.currentUserId++;
        return value;
      } catch (error) {
        throw error;
      }
    } else {
      const err = {};
      for (const e of error.details) {
        err[e.path] = e.message;
      }
      throw new ValidationError(err);
    }
  }

  async getAll() {
    return this.users;
  }

  async getByUsername(username) {
    let result = [];
    for (let user of this.users) {
      if (user.username === username) {
        result.push(user);
        break;
      }
    }

    return result;
  }

  async getById(id) {
    let result = [];
    for (let user of this.users) {
      console.log('userid; ', user.id);
      console.log('id; ', id);
      console.log('isSame; ', user.id == id);
      if (user.id == id) {
        result.push(user);
        break;
      }
    }

    return result;
  }

  async update(userInstance) {
    this.users.forEach((value, index, array) => {
      if (value.username === userInstance.username) {
        array[index].username = userInstance.username;
        array[index].password = userInstance.password;
        array[index].first_name = userInstance.first_name;
        array[index].last_name = userInstance.last_name;
        array[index].role_id = userInstance.role_id;
        array[index].is_active = userInstance.is_active;
      }
    });
    return await this.getByUsername(userInstance.username);
  }

  async delete(userId) {
    this.users.forEach((value, index, array) => {
      if (value.id == userId) {
        array.splice(index, 1);
      }
    });
  }

  async clear() {
    this.users = [];
    this.currentUserId = 1;
  }
}
