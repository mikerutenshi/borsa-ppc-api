import ProductCategoryRepository from '../../../application/contract/ProductCategoryRepository';
import { ProductCategory } from '../../../model/Products';
import PgCrudRepository from './PgCrudRepository';
import { ProductCategorySql } from './sql';

export default class PgProductCategoryRepository
  extends PgCrudRepository<ProductCategory>
  implements ProductCategoryRepository
{
  constructor() {
    super(ProductCategorySql);
  }
}
