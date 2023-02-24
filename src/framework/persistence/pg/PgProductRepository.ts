import ProductRepository from '../../../application/contract/ProductRepository';
import { Product } from '../../../model/Products';
import PgCrudRepository from './PgCrudRepository';
import { ProductSql } from './sql';

export default class PgProductRepository
  extends PgCrudRepository<Product>
  implements ProductRepository
{
  constructor() {
    super(ProductSql);
  }
}
