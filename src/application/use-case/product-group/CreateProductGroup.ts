import { ProductGroup } from '../../../model/Products';
import Table from '../../../model/Table';
import ProductGroupRepository from '../../contract/ProductGroupRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateProductGroup extends CreateUseCase<ProductGroup> {
  constructor(repository: ProductGroupRepository, uniqueVal: string) {
    const tableDetail = new Table('product_group', 'code', uniqueVal);
    super(repository, tableDetail);
  }
}
