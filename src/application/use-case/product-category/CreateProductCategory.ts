import { ForbiddenError } from '../../../model/Errors';
import { ProductCategory } from '../../../model/Products';
import Table from '../../../model/Table';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateProductCategory extends CreateUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository, uniqueVal: string) {
    super(repository, new Table('product_category', 'name', uniqueVal));
  }

  async execute(
    param: ProductCategory,
    tableName?: string | undefined
  ): Promise<ProductCategory[]> {
    if (param.parent_id == null) {
      return super.execute(param, tableName);
    } else {
      const parentTable = await this.getRepository().getOneByProp(
        'id',
        param.parent_id.toString()
      );
      if (parentTable) {
        return super.execute(param, tableName);
      } else {
        throw new ForbiddenError(
          'Parent id does not exist. Please create it first'
        );
      }
    }
  }
}
