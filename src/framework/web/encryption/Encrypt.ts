import bcrypt from 'bcryptjs';
import randtoken from 'rand-token';
import jwt from 'jsonwebtoken';
import config from '../../../../config/config';

const Hash = {
  async create(data: string) {
    return await bcrypt.hash(data, 10);
  },

  async compare(data: string, hash: string) {
    return await bcrypt.compare(data, hash);
  },
};

const Token = {
  generateRefreshToken() {
    return randtoken.generate(256);
  },

  async generateAccessToken(username: string, roleId: number) {
    const payload = { username: username, role_id: roleId };
    try {
      return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.accessTokenExpIn,
      });
    } catch (error: any) {
      throw Error(error.message);
    }
  },

  async validateRefreshToken(
    reqToken: string,
    storedToken: string,
    expDate: string
  ): Promise<string> {
    const now = new Date();
    const date = new Date(expDate);

    if (now > date) {
      return 'expired';
    }

    return await Hash.compare(reqToken, storedToken).then(
      (result) => {
        if (result) {
          return 'valid';
        } else {
          return 'invalid';
        }
      },
      (error) => {
        throw Error(error.message);
      }
    );
  },
};

export { Hash, Token };
