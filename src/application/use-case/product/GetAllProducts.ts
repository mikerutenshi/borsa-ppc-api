import { Product } from '../../../model/Products';
import ProductRepository from '../../contract/ProductRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllProducts extends GetAllUseCase<Product> {
  constructor(repository: ProductRepository) {
    super(repository);
  }
}
