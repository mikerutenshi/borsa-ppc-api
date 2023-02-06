import ProductCategoryTypeRepository from '../../../application/contract/ProductCategoryTypeRepository';
import { ProductCategoryType } from '../../../model/Types';
import PgCrudRepository from './PgCrudRepository';
import { ProductCategoryTypeSql } from './sql';

export default class PgProductCategoryTypeRepository
  extends PgCrudRepository<ProductCategoryType>
  implements ProductCategoryTypeRepository
{
  constructor() {
    super(ProductCategoryTypeSql);
  }
}
