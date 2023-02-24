import { ProductGroup } from '../../../model/Products';
import ProductGroupRepository from '../../contract/ProductGroupRepository';
import GetOneUseCase from '../GetOneUseCase';

export default class GetProductGroup extends GetOneUseCase<ProductGroup> {
  constructor(repository: ProductGroupRepository) {
    super(repository);
  }
}
