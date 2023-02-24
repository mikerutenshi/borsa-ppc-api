import { ProductGroup } from '../../../model/Products';
import ProductGroupRepository from '../../contract/ProductGroupRepository';
import GetAllUseCase from '../GetAllUseCase';

export default class GetAllProductGroups extends GetAllUseCase<ProductGroup> {
  constructor(repository: ProductGroupRepository) {
    super(repository);
  }
}
