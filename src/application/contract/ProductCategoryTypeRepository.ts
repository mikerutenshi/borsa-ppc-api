import { ProductCategoryType } from '../../model/Types';
import CrudRepository from './CrudRepository';

export default interface ProductCategoryTypeRepository
  extends CrudRepository<ProductCategoryType> {}
