import { Repositories } from '../../../../src/model/Enums';
import {
  female,
  heels,
  male,
  moccasin,
  pumps,
  slipOn,
} from '../../../../src/model/mock/ProductCategory';
import { basicCrudTestSuite } from './BasicCrudTest';
import { productCategoryTestSuite } from './ProductCategoryRoutesTest';
import { productCategoryTypeTestSuite } from './ProductCategoryTypeRoutesTest';
import { roleTestSuite } from './RoleRoutesTest';
import { typeTestSuite } from './TypeRoutesTest';
import { rootTestSuite, userTestSuite } from './UserRoutesTest';

describe('Sequentially run test suites', () => {
  rootTestSuite();
  roleTestSuite();
  //userTestSuite();
  //typeTestSuite();
  //productCategoryTypeTestSuite();
  //const productCategoryDataset = [male, slipOn, moccasin, female, heels, pumps];
  //basicCrudTestSuite(
  //  Repositories.ProductCategoryRepository,
  //  '/v2/product-category',
  //  productCategoryDataset,
  //  'name'
  //);
  //productCategoryTestSuite(productCategoryDataset);
});
