import { ForbiddenError } from '../../../model/Errors';
import Table from '../../../model/Table';
import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateProductCategory extends UpdateUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository, uniqueVal: string) {
    super(repository, new Table('product_category', 'name', uniqueVal));
  }

  async execute(
    param: ProductCategory,
    tableName?: string | undefined
  ): Promise<ProductCategory[]> {
    if (param.parent_id !== null) {
      const parentTable = await this.getRepository().getOneByProp(
        'id',
        param.parent_id.toString()
      );
      if (!parentTable) {
        throw new ForbiddenError(
          'Parent id does not exist. Please create it first'
        );
      } else {
        return super.execute(param, tableName);
      }
    } else {
      return super.execute(param, tableName);
    }
  }
}
