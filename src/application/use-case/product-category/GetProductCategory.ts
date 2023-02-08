import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetProductCategory extends GetOneUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository);
  }
}
