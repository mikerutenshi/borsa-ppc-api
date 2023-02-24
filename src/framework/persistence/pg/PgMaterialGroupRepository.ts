import MaterialGroupRepository from '../../../application/contract/MaterialGroupRepository';
import { MaterialGroup } from '../../../model/Materials';
import PgCrudRepository from './PgCrudRepository';
import { MaterialGroupSql } from './sql';

export default class PgMaterialGroupRepository
  extends PgCrudRepository<MaterialGroup>
  implements MaterialGroupRepository
{
  constructor() {
    super(MaterialGroupSql);
  }
}
