import { Hash, Token } from './Encrypt.mjs';
import DateUtil from '../../../util/DateUtil.mjs';

describe('Test encryption methods', () => {
  test('validate refresh token expired case', async () => {
    const refreshToken = await Token.generateRefreshToken();
    const storedRefreshToken = await Hash.create(refreshToken);

    let earlyExpDate = new Date();
    earlyExpDate = DateUtil.minusDays(earlyExpDate, 10);
    let expDate = new Date();
    expDate = DateUtil.addDays(expDate, 7);
    expect(
      await Token.validateRefreshToken(
        refreshToken,
        earlyExpDate,
        storedRefreshToken
      )
    ).toBe('expired');
  });
});
