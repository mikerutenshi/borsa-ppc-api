import DatabaseService from '../../../application/contract/DatabaseService';
import { Repositories } from '../../../model/Enums';
import { db } from './db';
import PgProductCategoryRepository from './PgProductCategoryRepository';
import PgProductCategoryTypeRepository from './PgProductCategoryTypeRepository';
import PgRoleRepository from './PgRoleRepository';
import PgTypeRepository from './PgTypeRepository';
import PgUserRepository from './PgUserRepository';

export default class PgDatabaseService extends DatabaseService {
  private typeRepoTables = [
    'material_type',
    'job_type',
    'job_status',
    'size',
    'color',
  ];

  constructor() {
    super();
    this.userRepository = new PgUserRepository();
    this.roleRepository = new PgRoleRepository();
    this.typeRepository = new PgTypeRepository();
    this.productCategoryTypeRepository = new PgProductCategoryTypeRepository();
    this.productCategoryRepository = new PgProductCategoryRepository();
    //this.ProductGroupRepository = new PgProductGroupRepository();
  }

  async initDatabase() {
    db.connect().then((obj) => {
      obj.done();
    });
  }

  async dropDatabase() {
    this.userRepository?.clear();
    this.roleRepository?.clear();
    this.productCategoryTypeRepository?.clear();
    this.typeRepoTables.forEach((table) => {
      this.typeRepository?.clear(table);
    });
    this.ProductGroupRepository?.clear();
  }
  async dropRepository(repoName: string): Promise<void> {
    switch (repoName) {
      case Repositories.productCategoryTypeRepository: {
        this.productCategoryTypeRepository.clear();
        break;
      }
      case Repositories.ProductCategoryRepository: {
        this.productCategoryRepository.clear();
        break;
      }
      default: {
        throw Error('Repository is not found');
      }
    }
  }
}
