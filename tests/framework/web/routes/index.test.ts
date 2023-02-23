import { roleTestSuite } from './RoleRoutesTest';
import { rootTestSuite, userTestSuite } from './UserRoutesTest';

describe('Sequentially run test suites', () => {
  rootTestSuite();
  roleTestSuite();
  userTestSuite();
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
