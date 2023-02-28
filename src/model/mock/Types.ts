import {
  Color,
  JobStatus,
  JobType,
  MaterialType,
  ProductCategoryType,
  Size,
} from '../Types';

const leatherType = new MaterialType('Leather');
const outsoleType = new MaterialType('Outsole');
const insoleType = new MaterialType('Insole');

const drawerType = new JobType('Drawer');
const sewerType = new JobType('Sewer');
const assemblerType = new JobType('Assembler');
const finishingType = new JobType('Finishing');
const soleStitcherType = new JobType('SoleStitcher');

const jobStatusAssigned = new JobStatus('Assigned');
const jobStatusCompleted = new JobStatus('Completed');
const jobStatusPending = new JobStatus('Pending');
const jobStatusCanceled = new JobStatus('Cancelled');

const _36Type = new Size('36');
const _36_5Type = new Size('36.5');
const _37Type = new Size('37');
const _38Type = new Size('38');
const _39Type = new Size('39');

const whiteType = new Color('White');
const blackType = new Color('Black');
const brownType = new Color('Brown');
const redType = new Color('Red');
const violetType = new Color('Violet');
const beigeType = new Color('Beige');

const genderType = new ProductCategoryType('Gender', null);
const categoryType = new ProductCategoryType('Category', 1);
categoryType.id = 2;
const subCategoryType = new ProductCategoryType('Sub-category', 2);
subCategoryType.id = 3;
const extraCategoryType = new ProductCategoryType('Extra-category', 3);
const subExtraCategoryType = new ProductCategoryType('Sub-Extra-Category', 4);
const invalidType = { name: '' };

export {
  leatherType,
  outsoleType,
  insoleType,
  drawerType,
  sewerType,
  assemblerType,
  finishingType,
  soleStitcherType,
  _36Type,
  _36_5Type,
  _37Type,
  _38Type,
  _39Type,
  whiteType,
  blackType,
  brownType,
  redType,
  violetType,
  beigeType,
  genderType,
  categoryType,
  subCategoryType,
  extraCategoryType,
  subExtraCategoryType,
  invalidType,
  jobStatusAssigned,
  jobStatusCompleted,
  jobStatusPending,
  jobStatusCanceled,
};
