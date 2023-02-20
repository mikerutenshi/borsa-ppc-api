import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetFilteredProductCategories extends GetAllUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository);
  }
}
