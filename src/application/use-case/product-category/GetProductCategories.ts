import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetProductCategories extends GetManyUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository);
  }
}
