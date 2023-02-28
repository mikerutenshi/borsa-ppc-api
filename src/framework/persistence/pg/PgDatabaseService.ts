import DatabaseService from '../../../application/contract/DatabaseService';
import { Repositories } from '../../../model/Enums';
import { db } from './db';
import PgBillOfMaterialRepository from './PgBillOfMaterialRepository';
import PgLabourCostRepository from './PgLabourCostRepository';
import PgMaterialGroupRepository from './PgMaterialGroupRepository';
import PgMaterialRepository from './PgMaterialRepository';
import PgProductCategoryRepository from './PgProductCategoryRepository';
import PgProductCategoryTypeRepository from './PgProductCategoryTypeRepository';
import PgProductGroupRepository from './PgProductGroupRepository';
import PgProductRepository from './PgProductRepository';
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
    this.productGroupRepository = new PgProductGroupRepository();
    this.productRepository = new PgProductRepository();
    this.materialGroupRepository = new PgMaterialGroupRepository();
    this.materialRepository = new PgMaterialRepository();
    this.labourCostRepository = new PgLabourCostRepository();
    this.billOfMaterialRepository = new PgBillOfMaterialRepository();
  }

  async initDatabase() {
    db.connect().then((obj) => {
      obj.done();
    });
  }

  async dropDatabase() {
    this.userRepository?.clear();
    this.roleRepository?.clear();
    this.typeRepoTables.forEach((table) => {
      this.typeRepository?.clear(table);
    });
    this.productCategoryTypeRepository?.clear();
    this.productCategoryRepository?.clear();
    this.productGroupRepository?.clear();
    this.productRepository?.clear();
    this.materialGroupRepository?.clear();
    this.materialRepository?.clear();
    this.labourCostRepository.clear();
    this.billOfMaterialRepository.clear();
  }
  async dropRepository(repoName: string): Promise<void> {
    switch (repoName) {
      case Repositories.roleRepository: {
        this.roleRepository.clear();
        break;
      }
      case Repositories.userRepository: {
        this.userRepository.clear();
        break;
      }
      case Repositories.typeRepository: {
        this.typeRepoTables.forEach((table) => {
          this.typeRepository?.clear(table);
        });
        break;
      }
      case Repositories.productCategoryTypeRepository: {
        this.productCategoryTypeRepository.clear();
        break;
      }
      case Repositories.productCategoryRepository: {
        this.productCategoryRepository.clear();
        break;
      }
      case Repositories.productGroupRepository: {
        this.productGroupRepository.clear();
        break;
      }
      case Repositories.productRepository: {
        this.productRepository.clear();
        break;
      }
      case Repositories.materialGroupRepository: {
        this.materialGroupRepository.clear();
        break;
      }
      case Repositories.materialRepository: {
        this.materialRepository.clear();
        break;
      }
      case Repositories.labourCostRepository: {
        this.labourCostRepository.clear();
        break;
      }
      case Repositories.billOfMaterialRepository: {
        this.billOfMaterialRepository.clear();
        break;
      }
      default: {
        throw Error('Repository is not found');
      }
    }
  }
}
