import { Product } from '../../model/Products';
import CrudRepository from './CrudRepository';

export default interface ProductRepository extends CrudRepository<Product> {}
