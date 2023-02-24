import {ProductGroup} from '../../../model/Products';
import ProductGroupRepository from '../../contract/ProductGroupRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateProductGroup extends CreateUseCase<ProductGroup> {
  constructor(repository: ProductGroupRepository) {
    super(repository);
  }
}
