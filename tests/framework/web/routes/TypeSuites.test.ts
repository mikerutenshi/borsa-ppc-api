import { productCategoryTypeTestSuite } from './ProductCategoryTypeRoutesTest';
import { typeTestSuite } from './TypeRoutesTest';

describe('Sequentially run type test suites', () => {
  //typeTestSuite();
  productCategoryTypeTestSuite();
});
