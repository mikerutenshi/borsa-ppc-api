import { ProductGroup } from '../../../model/Products';
import ProductGroupRepository from '../../contract/ProductGroupRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateProductGroup extends UpdateUseCase<ProductGroup> {
  constructor(repository: ProductGroupRepository) {
    super(repository);
  }
}
