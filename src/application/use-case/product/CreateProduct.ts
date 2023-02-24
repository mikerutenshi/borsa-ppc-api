import { Product } from '../../../model/Products';
import ProductRepository from '../../contract/ProductRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateProduct extends CreateUseCase<Product> {
  constructor(repository: ProductRepository) {
    super(repository);
  }
}
