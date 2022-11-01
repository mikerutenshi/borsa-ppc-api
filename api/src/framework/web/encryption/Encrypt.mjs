import bcrypt from 'bcryptjs';
import randtoken from 'rand-token';
import jwt from 'jsonwebtoken';
import config from '../../../../config/config.mjs';

const Hash = {
  async create(string) {
    return await bcrypt.hash(string, 10);
  },

  async compare(string, hash) {
    return await bcrypt.compare(string, hash);
  },
};

const Token = {
  async generateRefreshToken() {
    return await randtoken.generate(256);
  },

  async generateAccessToken(username, roleId) {
    const payload = { sub: username, role: roleId };
    try {
      return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.accessTokenExpIn,
      });
    } catch (error) {
      throw Error(error.message);
    }
  },

  async validateRefreshToken(askToken, expDate, storedToken) {
    const now = new Date();

    if (now > expDate) {
      return 'expired';
    }

    console.log('askToken', askToken);
    console.log('storedToken', storedToken);
    return await Hash.compare(askToken, storedToken).then(
      (result) => {
        if (result) {
          return 'valid';
        } else {
          return 'invalid';
        }
      },
      (error) => {
        console.log('validateError', error);
        throw Error(error.message);
      }
    );
  },
};

export { Hash, Token };
