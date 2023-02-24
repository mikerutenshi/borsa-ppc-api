import { Product } from '../../../model/Products';
import ProductRepository from '../../contract/ProductRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateProduct extends UpdateUseCase<Product> {
  constructor(repository: ProductRepository) {
    super(repository);
  }
}
