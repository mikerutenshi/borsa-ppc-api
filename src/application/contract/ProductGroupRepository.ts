import { ProductGroup } from '../../model/Products';
import CrudRepository from './CrudRepository';

export default interface ProductGroupRepository
  extends CrudRepository<ProductGroup> {}
