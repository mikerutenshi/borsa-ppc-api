import DatabaseService from '../../../application/contract/DatabaseService.mjs';
import { Role, User } from '../../../model/User.mjs';
import InMemoryUserRepository from '../inMemory/InMemoryUserRepository.mjs';
import DateUtil from '../../../util/DateUtil.mjs';
import { Hash, Token } from '../../web/encryption/Encrypt.mjs';

export default class InMemoryDatabaseService extends DatabaseService {
  constructor() {
    super();
    this.userRepository = new InMemoryUserRepository();
  }

  async initDatabase() {
    this.seedData();
  }

  async seedData() {
    let mockRole = new Role(null, 'superuser');
    mockRole = await this.userRepository.addRole(mockRole);
    let expDate = new Date();
    expDate = DateUtil.addDays(expDate, 7);
    const user = new User(
      null,
      'michaelhs',
      'Michael',
      'Susanto',
      null,
      mockRole,
      'false',
      null,
      expDate
    );
    const hashPassword = await Hash.create('katakunci');
    user.password = hashPassword;
    const accessToken = await Token.generateAccessToken(user);
    const refreshToken = await Token.generateRefreshToken();
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await this.userRepository.add(user);
  }
}
