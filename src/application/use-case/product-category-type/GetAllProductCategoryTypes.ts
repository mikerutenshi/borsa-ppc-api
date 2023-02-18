import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllProductCategoryTypes extends GetAllUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository) {
    super(repository);
  }
}
