import { ProductGroup } from '../../../model/Products';
import ProductGroupRepository from '../../contract/ProductGroupRepository';
import DeleteUseCase from '../DeleteUseCase';
export default class DeleteProductGroup extends DeleteUseCase<ProductGroup> {
  constructor(repository: ProductGroupRepository) {
    super(repository);
  }
}
