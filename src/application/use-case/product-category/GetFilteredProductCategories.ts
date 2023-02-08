import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import GetFilteredUseCase from '../GetFilteredUseCase';

export default class GetFilteredProductCategories extends GetFilteredUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository);
  }
}
