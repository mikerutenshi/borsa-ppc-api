import BaseCRUDRepository from './BaseCRUDRepository.mjs';

export default class UserRepository extends BaseCRUDRepository {
  authenticate(authInstance) {
    return Promise.reject(new Error('not implemented'));
  }
}
