import { ProductCategory } from '../../model/Products';
import CrudRepository from './CrudRepository';

export default interface ProductCategoryRepository
  extends CrudRepository<ProductCategory> {}
