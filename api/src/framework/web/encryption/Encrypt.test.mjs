import { jest } from '@jest/globals';
import { Hash, Token } from './Encrypt.mjs';
import DateUtil from '../../../util/DateUtil.mjs';
import Jwt from 'jsonwebtoken';
import config from '../../../../config/config.mjs';

let generateRefreshToken = null;
let refreshToken = null;
let storedRefreshToken = null;

beforeAll(async () => {
  generateRefreshToken = jest.fn();
  generateRefreshToken.mockReturnValue(
    'ZgLl7JG3j1i59FqNud3JAfs0JVV1PsP5bBv5OWLKKCLcRS1JlWNICHn3Qfpyp4OC6uoErMpA2dImHV2x2WU9Jsce0hwJQBItDEO6IF5uvJcunwR1iIDBRgSwRiMbLHfbstJohyAaiRS7lKKG4u8mjt5EGVP7VwEusG1TEmiPOGpykUOjmZ6X5jkaTh2jNKuB58VYwqIo5lzBYpM3BU2ZIzcCHFyNpJrnCak5DcjSWO4ElP4z36k41jAXxLbglEML'
  );
  refreshToken = generateRefreshToken();
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
        earlyExpDate,
        storedRefreshToken
      )
    ).toBe('expired');
  });

  test('validate refresh token valid case', async () => {
    expect(
      await Token.validateRefreshToken(
        refreshToken,
        expDate,
        storedRefreshToken
      )
    ).toBe('valid');
  });

  test('validate refresh token invalid case', async () => {
    expect(
      await Token.validateRefreshToken(
        storedRefreshToken,
        expDate,
        storedRefreshToken
      )
    ).toBe('invalid');
  });

  test('generate access token', async () => {
    const accessToken = await Token.generateAccessToken(1, 2);
    const verifyToken = Jwt.verify(accessToken, config.jwtSecret);
    expect(verifyToken.sub).toBe(1);
    expect(verifyToken.role).toBe(2);
  });

  test('generate refresh token', async () => {
    expect(await Token.generateRefreshToken()).toMatch(/^[a-zA-Z0-9]{256}$/);
  });
});
