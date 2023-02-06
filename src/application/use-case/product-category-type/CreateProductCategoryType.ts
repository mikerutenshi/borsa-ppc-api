import Table from '../../../model/Table';
import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateProductCategoryType extends CreateUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository, uniqueVal: string) {
    super(repository, new Table('product_category_type', 'name', uniqueVal));
  }
}
