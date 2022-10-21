import UserRepository from '../../../application/contract/UserRepository.mjs';
import { validateUser } from '../../validation/UserValidation.mjs';
import { Token } from '../../web/encryption/Encrypt.mjs';
import DateUtil from '../../../util/DateUtil.mjs';
import { Hash } from '../../web/encryption/Encrypt.mjs';
import ValidationError from '../../../model/Error.mjs';

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
    userInstance.id = this.currentUserId;
    userInstance.refresh_token_exp_date = expDate;

    const { value, error } = validateUser(userInstance);

    if (error === undefined) {
      try {
        value.password = await Hash.create(value.password);
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
    for (const user of this.users) {
      if (user.username === username) {
        return user;
      } else {
        return null;
      }
    }
  }

  async getById(id) {
    for (const user of this.users) {
      return user.id === id ? user : null;
    }
  }

  async update(userInstance) {
    this.users.forEach((value, index, array) => {
      if (value.username === userInstance.username) {
        array[index] = userInstance;
      }
    });
    return await this.getByUsername(userInstance.username);
  }

  async delete(userId) {
    this.users.forEach((value, index, array) => {
      if (value.id === userId) {
        array.splice(index, 1);
      }
    });
  }
}
