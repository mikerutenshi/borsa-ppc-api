import LabourCostRepository from '../../../application/contract/LabourCostRepository';
import LabourCost from '../../../model/LabourCost';
import PgCrudRepository from './PgCrudRepository';
import { LabourCostSql } from './sql';

export default class PgLabourCostRepository
  extends PgCrudRepository<LabourCost>
  implements LabourCostRepository
{
  constructor() {
    super(LabourCostSql);
  }
}
