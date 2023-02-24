import { Product } from '../../../model/Products';
import ProductRepository from '../../contract/ProductRepository';
import DeleteUseCase from '../DeleteUseCase';
export default class DeleteProduct extends DeleteUseCase<Product> {
  constructor(repository: ProductRepository) {
    super(repository);
  }
}
