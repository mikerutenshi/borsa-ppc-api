import MaterialRepository from '../../../application/contract/MaterialRepository';
import { Material } from '../../../model/Materials';
import PgCrudRepository from './PgCrudRepository';
import { MaterialSql } from './sql';

export default class PgMaterialRepository
  extends PgCrudRepository<Material>
  implements MaterialRepository
{
  constructor() {
    super(MaterialSql);
  }
}
