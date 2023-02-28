import BillOfMaterialRepository from './BillOfMaterialRepository';
import LabourCostRepository from './LabourCostRepository';
import MaterialGroupRepository from './MaterialGroupRepository';
import MaterialRepository from './MaterialRepository';
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
  materialGroupRepository!: MaterialGroupRepository;
  materialRepository!: MaterialRepository;
  labourCostRepository!: LabourCostRepository;
  billOfMaterialRepository!: BillOfMaterialRepository;

  abstract initDatabase(): Promise<void>;
  abstract dropDatabase(): Promise<void>;
  abstract dropRepository(repoName: string): Promise<void>;
}

export default DatabaseService;
