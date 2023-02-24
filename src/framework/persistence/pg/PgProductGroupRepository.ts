import ProductGroupRepository from '../../../application/contract/ProductGroupRepository';
import {ProductGroup} from '../../../model/Products';
import PgCrudRepository from './PgCrudRepository';
import {ProductGroupSql} from './sql';

export default class PgProductGroupRepository
  extends PgCrudRepository<ProductGroup>
  implements ProductGroupRepository
{
  constructor() {
    super(ProductGroupSql);
  }
}
