import { ForbiddenError } from '../../../model/Errors';
import Table from '../../../model/Table';
import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateProductCategoryType extends UpdateUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository, uniqueVal: string) {
    super(repository, new Table('product_category_type', 'name', uniqueVal));
  }

  async execute(
    param: ProductCategoryType,
    tableName?: string | undefined
  ): Promise<ProductCategoryType[]> {
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
