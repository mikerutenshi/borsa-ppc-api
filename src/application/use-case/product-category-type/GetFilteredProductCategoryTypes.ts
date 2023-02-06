import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import GetFilteredUseCase from '../GetFilteredUseCase';

export default class GetFilteredProductCategoryTypes extends GetFilteredUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository) {
    super(repository);
  }
}
