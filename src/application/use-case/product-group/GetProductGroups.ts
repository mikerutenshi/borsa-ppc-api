import { ProductGroup } from '../../../model/Products';
import ProductGroupRepository from '../../contract/ProductGroupRepository';
import GetManyUseCase from '../GetManyUseCase';

export default class GetProductGroups extends GetManyUseCase<ProductGroup> {
  constructor(repository: ProductGroupRepository) {
    super(repository);
  }
}
