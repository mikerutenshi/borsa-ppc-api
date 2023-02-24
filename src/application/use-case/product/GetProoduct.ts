import { Product } from '../../../model/Products';
import ProductRepository from '../../contract/ProductRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetProduct extends GetOneUseCase<Product> {
  constructor(repository: ProductRepository) {
    super(repository);
  }
}
