import { productCategoryTypeTestSuite } from './ProductCategoryTypeRoutesTest';
import { roleTestSuite } from './RoleRoutesTest';
import { typeTestSuite } from './TypeRoutesTest';
import { rootTestSuite, userTestSuite } from './UserRoutesTest';

describe('Sequentially run test suites', () => {
  //rootTestSuite();
  //roleTestSuite();
  //userTestSuite();
  //typeTestSuite();
  productCategoryTypeTestSuite();
});
