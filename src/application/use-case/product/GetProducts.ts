import { Product } from '../../../model/Products';
import ProductRepository from '../../contract/ProductRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetProducts extends GetManyUseCase<Product> {
  constructor(repository: ProductRepository) {
    super(repository);
  }
}
