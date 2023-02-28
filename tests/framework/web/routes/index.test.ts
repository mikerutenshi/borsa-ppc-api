import ProjectDependencies from '../../../../src/di/ProjectDependencies';
import { Repositories } from '../../../../src/model/Enums';
import { bom1, bom2, bom3 } from '../../../../src/model/mock/BillOfMaterial';
import {
  labourFlowerAssemble,
  labourFlowerDraw,
  labourNadineAssemble,
  labourNadineDraw,
  labourTaziaAssemble,
  labourTaziaDraw,
} from '../../../../src/model/mock/LabourCost';
import {
  chf,
  jupiter,
  jupiterBlack,
  jupiterOlive,
  milling,
  millingViolet,
  nubuck,
  nubuckBlack,
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
import {
  flower,
  miki,
  nadine,
  tazia,
} from '../../../../src/model/mock/ProductGroup';
import {
  blackMoccasin,
  violetFlower,
  whiteMoccasin,
  yellowMoccasin,
} from '../../../../src/model/mock/Products';
import {
  assemblerType,
  beigeType,
  blackType,
  brownType,
  drawerType,
  finishingType,
  insoleType,
  jobStatusAssigned,
  jobStatusCanceled,
  jobStatusCompleted,
  jobStatusPending,
  leatherType,
  outsoleType,
  redType,
  sewerType,
  soleStitcherType,
  violetType,
  whiteType,
  _36Type,
  _36_5Type,
  _37Type,
  _38Type,
  _39Type,
} from '../../../../src/model/mock/Types';
import { basicCrudTestSuite } from './BasicCrudTest';
import { productCategoryTestSuite } from './ProductCategoryRoutesTest';
import { productCategoryTypeTestSuite } from './ProductCategoryTypeRoutesTest';

describe('Sequentially run test suites', () => {
  beforeAll(async () => {
    const { databaseService } = new ProjectDependencies();
    await databaseService.dropDatabase();
  });
  //rootTestSuite();

  //roleTestSuite();
  //userTestSuite();

  //typeTestSuite();
  const materialTypeDataset = [leatherType, outsoleType, insoleType];
  basicCrudTestSuite(
    Repositories.typeRepository,
    '/v2/material-types',
    materialTypeDataset,
    'name'
  );
  const colorDataset = [
    whiteType,
    blackType,
    brownType,
    redType,
    violetType,
    beigeType,
  ];
  basicCrudTestSuite(
    Repositories.typeRepository,
    '/v2/colors',
    colorDataset,
    'name'
  );

  const jobDataset = [
    drawerType,
    sewerType,
    assemblerType,
    finishingType,
    soleStitcherType,
  ];
  basicCrudTestSuite(
    Repositories.typeRepository,
    '/v2/job-types',
    jobDataset,
    'name'
  );

  const jobStatusDataset = [
    jobStatusCompleted,
    jobStatusAssigned,
    jobStatusPending,
    jobStatusCanceled,
  ];
  basicCrudTestSuite(
    Repositories.typeRepository,
    '/v2/job-statuses',
    jobStatusDataset,
    'name'
  );

  const sizeDataset = [_36Type, _36_5Type, _37Type, _38Type, _39Type];
  basicCrudTestSuite(
    Repositories.typeRepository,
    '/v2/sizes',
    sizeDataset,
    'name'
  );

  productCategoryTypeTestSuite();

  const productCategoryDataset = [male, slipOn, moccasin, female, heels, pumps];
  basicCrudTestSuite(
    Repositories.productCategoryRepository,
    '/v2/product-categories',
    productCategoryDataset,
    'name'
  );
  productCategoryTestSuite(productCategoryDataset);

  const productGroupDataset = [tazia, nadine, flower, miki];
  basicCrudTestSuite(
    Repositories.productGroupRepository,
    '/v2/product-groups',
    productGroupDataset,
    'code'
  );
  const productDataset = [
    blackMoccasin,
    yellowMoccasin,
    violetFlower,
    whiteMoccasin,
  ];
  basicCrudTestSuite(
    Repositories.productRepository,
    '/v2/products',
    productDataset,
    'code'
  );

  const materialGroupDataset = [
    jupiter,
    roselle,
    womenSole1,
    nubuck,
    milling,
    chf,
    womenSole2,
  ];
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
    nubuckBlack,
    millingViolet,
    womenSoleBrown,
  ];
  basicCrudTestSuite(
    Repositories.materialRepository,
    '/v2/materials',
    materialDataset,
    'name'
  );

  const labourCostDataset = [
    labourNadineDraw,
    labourTaziaDraw,
    labourFlowerDraw,
    labourTaziaAssemble,
    labourNadineAssemble,
    labourFlowerAssemble,
  ];
  basicCrudTestSuite(
    Repositories.labourCostRepository,
    '/v2/labour-costs',
    labourCostDataset,
    'job_type_id'
  );

  const billOfMaterialDataset = [bom1, bom2, bom3];
  basicCrudTestSuite(
    Repositories.billOfMaterialRepository,
    '/v2/bill-of-materials',
    billOfMaterialDataset,
    'material_id'
  );
});
