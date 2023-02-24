import { Repositories } from '../../../../src/model/Enums';
import {
  female,
  heels,
  male,
  moccasin,
  pumps,
  slipOn,
} from '../../../../src/model/mock/ProductCategory';
import { flower, nadine, tazia } from '../../../../src/model/mock/ProductGroup';
import { basicCrudTestSuite } from './BasicCrudTest';
import { productCategoryTestSuite } from './ProductCategoryRoutesTest';
import { productCategoryTypeTestSuite } from './ProductCategoryTypeRoutesTest';

describe('Sequentially run test suites', () => {
  //rootTestSuite();

  //roleTestSuite();
  //userTestSuite();

  //typeTestSuite();

  productCategoryTypeTestSuite();
  const productCategoryDataset = [male, slipOn, moccasin, female, heels, pumps];
  basicCrudTestSuite(
    Repositories.ProductCategoryRepository,
    '/v2/product-categories',
    productCategoryDataset,
    'name'
  );
  productCategoryTestSuite(productCategoryDataset);
  const productGroupDataset = [tazia, nadine, flower];
  basicCrudTestSuite(
    Repositories.ProductGroupRepository,
    '/v2/product-groups',
    productGroupDataset,
    'code'
  );
});
