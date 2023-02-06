import {
  Color,
  JobType,
  JobStatus,
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

const jobStatusAssigned = new JobStatus('Assigned');
const jobStatusCompleted = new JobStatus('Completed');

const _36Type = new Size('36');
const _36_5Type = new Size('36.5');
const _37Type = new Size('37');

const whiteType = new Color('White');
const blackType = new Color('Black');
const brownType = new Color('Brown');

const genderType = new ProductCategoryType('Gender', null);
const categoryType = new ProductCategoryType('Category', 1);
categoryType.id = 2;
const subCategoryType = new ProductCategoryType('Sub-category', 2);
subCategoryType.id = 3;
const invalidType = { name: '' };

export {
  leatherType,
  outsoleType,
  insoleType,
  drawerType,
  sewerType,
  assemblerType,
  _36Type,
  _36_5Type,
  _37Type,
  whiteType,
  blackType,
  brownType,
  genderType,
  categoryType,
  subCategoryType,
  invalidType,
  jobStatusAssigned,
  jobStatusCompleted,
};
