import { Repositories } from '../../../../src/model/Enums';
import {
  jupiter,
  jupiterBlack,
  jupiterOlive,
  roselle,
  womenSole1,
  womenSole2,
  womenSoleBlack,
  womenSoleBrown,
} from '../../../../src/model/mock/Materials';
import {
  female,
  heels,
  male,
  moccasin,
  pumps,
  slipOn,
} from '../../../../src/model/mock/ProductCategory';
import { flower, nadine, tazia } from '../../../../src/model/mock/ProductGroup';
import {
  blackMoccasin,
  whiteMoccasin,
  yellowMoccasin,
} from '../../../../src/model/mock/Products';
import { basicCrudTestSuite } from './BasicCrudTest';
import { productCategoryTestSuite } from './ProductCategoryRoutesTest';
import { productCategoryTypeTestSuite } from './ProductCategoryTypeRoutesTest';
import { typeTestSuite } from './TypeRoutesTest';

describe('Sequentially run test suites', () => {
  //rootTestSuite();

  //roleTestSuite();
  //userTestSuite();

  typeTestSuite();

  productCategoryTypeTestSuite();
  const productCategoryDataset = [male, slipOn, moccasin, female, heels, pumps];
  basicCrudTestSuite(
    Repositories.productCategoryRepository,
    '/v2/product-categories',
    productCategoryDataset,
    'name'
  );
  productCategoryTestSuite(productCategoryDataset);

  const productGroupDataset = [tazia, nadine, flower];
  basicCrudTestSuite(
    Repositories.productGroupRepository,
    '/v2/product-groups',
    productGroupDataset,
    'code'
  );
  const productDataset = [blackMoccasin, yellowMoccasin, whiteMoccasin];
  basicCrudTestSuite(
    Repositories.productRepository,
    '/v2/products',
    productDataset,
    'code'
  );

  const materialGroupDataset = [jupiter, roselle, womenSole1, womenSole2];
  basicCrudTestSuite(
    Repositories.materialGroupRepository,
    '/v2/material-groups',
    materialGroupDataset,
    'name'
  );
  const materialDataset = [
    jupiterBlack,
    jupiterOlive,
    womenSoleBlack,
    womenSoleBrown,
  ];
  basicCrudTestSuite(
    Repositories.materialRepository,
    '/v2/materials',
    materialDataset,
    'name'
  );

  //const materialDataset = [
  //  jupiterBlack,
  //  jupiterOlive,
  //  womenSoleBlack,
  //  womenSoleBrown,
  //];
  //basicCrudTestSuite(
  //  Repositories.materialRepository,
  //  '/v2/materials',
  //  materialDataset,
  //  'name'
  //);

  //const materialDataset = [
  //  jupiterBlack,
  //  jupiterOlive,
  //  womenSoleBlack,
  //  womenSoleBrown,
  //];
  //basicCrudTestSuite(
  //  Repositories.materialRepository,
  //  '/v2/materials',
  //  materialDataset,
  //  'name'
  //);
});
