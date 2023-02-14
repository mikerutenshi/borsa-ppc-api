import ProductCategoryRepository from './ProductCategoryRepository';
import ProductCategoryTypeRepository from './ProductCategoryTypeRepository';
import ProductGroupRepository from './ProductGroupRepository';
import RoleRepository from './RoleRepository';
import TypeRepository from './TypeRepository';
import UserRepository from './UserRepository';

abstract class DatabaseService {
  userRepository!: UserRepository;
  roleRepository!: RoleRepository;
  typeRepository!: TypeRepository;
  productCategoryTypeRepository!: ProductCategoryTypeRepository;
  productCategoryRepository!: ProductCategoryRepository;
  ProductGroupRepository!: ProductGroupRepository;

  abstract initDatabase(): Promise<void>;
  abstract dropDatabase(): Promise<void>;
  abstract dropRepository(repoName: string): Promise<void>;
}

export default DatabaseService;
