import ProductCategoryRepository from './ProductCategoryRepository';
import ProductCategoryTypeRepository from './ProductCategoryTypeRepository';
import ProductGroupRepository from './ProductGroupRepository';
import ProductRepository from './ProductRepository';
import RoleRepository from './RoleRepository';
import TypeRepository from './TypeRepository';
import UserRepository from './UserRepository';

abstract class DatabaseService {
  userRepository!: UserRepository;
  roleRepository!: RoleRepository;
  typeRepository!: TypeRepository;
  productCategoryTypeRepository!: ProductCategoryTypeRepository;
  productCategoryRepository!: ProductCategoryRepository;
  productGroupRepository!: ProductGroupRepository;
  productRepository!: ProductRepository;

  abstract initDatabase(): Promise<void>;
  abstract dropDatabase(): Promise<void>;
  abstract dropRepository(repoName: string): Promise<void>;
}

export default DatabaseService;
