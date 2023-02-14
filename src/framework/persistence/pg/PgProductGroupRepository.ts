import ProductGroupRepository from '../../../application/contract/ProductGroupRepository';
import { ProductGroup } from '../../../model/Products';
import PgCrudPagedRepository from './PgCrudPagedRepository';
import { ProductGroupSql } from './sql';

export default class PgProductGroupRepository
  extends PgCrudPagedRepository<ProductGroup>
  implements ProductGroupRepository
{
  constructor() {
    super(ProductGroupSql);
  }
}
