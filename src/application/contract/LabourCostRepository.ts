import LabourCost from '../../model/LabourCost';
import CrudRepository from './CrudRepository';

export default interface LabourCostRepository
  extends CrudRepository<LabourCost> {}
