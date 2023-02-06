import ProductCategoryRepository from './ProductCategoryRepository';
import ProductCategoryTypeRepository from './ProductCategoryTypeRepository';
import RoleRepository from './RoleRepository';
import TypeRepository from './TypeRepository';
import UserRepository from './UserRepository';

abstract class DatabaseService {
  repositoryList = {
    userRepository: 'UserRepository',
    roleRepository: 'RoleRepository',
    typeRepository: 'TypeRepository',
    productCategoryTypeRepository: 'ProductCategoryTypeRepository',
    ProductCategoryRepository: 'ProductCategoryRepository',
  };
  userRepository!: UserRepository;
  roleRepository!: RoleRepository;
  typeRepository!: TypeRepository;
  productCategoryTypeRepository!: ProductCategoryTypeRepository;
  productCategory!: ProductCategoryRepository;

  abstract initDatabase(): Promise<void>;
  abstract dropDatabase(): Promise<void>;
  abstract dropRepository(repoName: string): Promise<void>;
}

export default DatabaseService;
