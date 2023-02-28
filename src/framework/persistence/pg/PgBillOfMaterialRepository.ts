import BillOfMaterialRepository from '../../../application/contract/BillOfMaterialRepository';
import BillOfMaterial from '../../../model/BillOfMaterial';
import PgCrudRepository from './PgCrudRepository';
import { BillOfMaterialSql } from './sql';

export default class PgBillOfMaterialRepository
  extends PgCrudRepository<BillOfMaterial>
  implements BillOfMaterialRepository
{
  constructor() {
    super(BillOfMaterialSql);
  }
}
