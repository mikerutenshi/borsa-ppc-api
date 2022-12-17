import { jest } from '@jest/globals';
import Jwt, { UserJwtPayload } from 'jsonwebtoken';
import config from '../../../../config/config';
import { Hash, Token } from '../../../../src/framework/web/encryption/Encrypt';
import DateUtil from '../../../../src/util/DateUtil';

declare module 'jsonwebtoken' {
  export interface UserJwtPayload extends Jwt.JwtPayload {
    username: string;
    role_id: number;
  }
}

let generateRefreshToken = null;
let refreshToken: string;
let storedRefreshToken: string;

beforeAll(async () => {
  generateRefreshToken = jest.fn();
  generateRefreshToken.mockReturnValue(
    'ZgLl7JG3j1i59FqNud3JAfs0JVV1PsP5bBv5OWLKKCLcRS1JlWNICHn3Qfpyp4OC6uoErMpA2dImHV2x2WU9Jsce0hwJQBItDEO6IF5uvJcunwR1iIDBRgSwRiMbLHfbstJohyAaiRS7lKKG4u8mjt5EGVP7VwEusG1TEmiPOGpykUOjmZ6X5jkaTh2jNKuB58VYwqIo5lzBYpM3BU2ZIzcCHFyNpJrnCak5DcjSWO4ElP4z36k41jAXxLbglEML'
  );
  refreshToken = generateRefreshToken() as string;
  storedRefreshToken = await Hash.create(refreshToken);
});

describe('Test encryption methods', () => {
  let earlyExpDate = new Date();
  earlyExpDate = DateUtil.minusDays(earlyExpDate, 10);
  let expDate = new Date();
  expDate = DateUtil.addDays(expDate, 7);

  test('validate refresh token expired case', async () => {
    expect(
      await Token.validateRefreshToken(
        refreshToken,
        storedRefreshToken,
        earlyExpDate.toUTCString()
      )
    ).toBe('expired');
  });

  test('validate refresh token valid case', async () => {
    expect(
      await Token.validateRefreshToken(
        refreshToken,
        storedRefreshToken,
        expDate.toUTCString()
      )
    ).toBe('valid');
  });

  test('validate refresh token invalid case', async () => {
    expect(
      await Token.validateRefreshToken(
        storedRefreshToken,
        storedRefreshToken,
        expDate.toUTCString()
      )
    ).toBe('invalid');
  });

  test('generate access token', async () => {
    const accessToken = await Token.generateAccessToken('christopher', 2);
    const verifyToken: UserJwtPayload = Jwt.verify(
      accessToken,
      config.jwtSecret
    ) as UserJwtPayload;
    expect(verifyToken.username).toMatch('christopher');
    expect(verifyToken.role_id).toBe(2);
  });

  test('generate refresh token', async () => {
    expect(Token.generateRefreshToken()).toMatch(/^[a-zA-Z0-9]{256}$/);
  });
});
