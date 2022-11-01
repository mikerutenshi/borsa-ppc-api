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
    const { value, error } = validateUser(userInstance);

    console.log('add Error', error);
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
      handleValidationError(error);
    }
  }

  async getAll() {
    return this.users;
  }

  async getByProp(property, value) {
    let result = [];
    for (let user of this.users) {
      if (user[property].toLowerCase().includes(value)) {
        result.push(user);
        break;
      }
    }

    return result;
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

  async authenticate(username, password) {
    let userExist = null;
    let users = [];

    for (let user of this.users) {
      if (user.username == username) {
        userExist = user;
        break;
      }
    }

    if (userExist.is_active == false) {
      const err = new Error('User is not yet activated');
      err.status = 403;
      throw err;
    }

    if (userExist) {
      if (await Hash.compare(password, userExist.password)) {
        const refreshToken = await Token.generateRefreshToken();
        let expDate = new Date();
        expDate = DateUtil.addDays(expDate, 7);

        userExist.refresh_token = await Hash.create(refreshToken);
        userExist.refresh_token_exp_date = expDate;
        userExist.access_token = await Token.generateAccessToken(
          userExist.username,
          userExist.username
        );

        const returnUser = new User(
          userExist.username,
          userExist.first_name,
          userExist.last_name,
          userExist.password,
          userExist.role_id
        );
        returnUser.refresh_token = refreshToken;
        users.push(returnUser);

        return users;
      } else {
        throw new ValidationError({
          password: 'Incorrect password',
        });
      }
    } else {
      throw new ValidationError({
        username: 'User not found',
      });
    }
  }

  async refreshAccessToken(username, refreshToken) {
    let userExist = null;

    for (let user of this.users) {
      if (user.username == username) {
        userExist = user;
        break;
      }
    }

    if (!userExist) {
      const userNotFoundError = new Error('User not found');
      userNotFoundError.status = 403;
      throw userNotFoundError;
    }

    const tokenValid = await Token.validateRefreshToken(
      refreshToken,
      userExist.refresh_token_exp_date,
      userExist.refresh_token
    );

    console.log('tokenValid', tokenValid);
    switch (tokenValid) {
      case 'expired':
        const expiredError = new Error('Refresh token has expired');
        expiredError.status = 403;
      case 'valid':
        return await Token.generateAccessToken(
          userExist.username,
          userExist.role_id
        );
      case 'invalid':
        const invalidError = new Error('Refresh token does not match');
        invalidError.status = 403;
        throw invalidError;
    }
  }
}
