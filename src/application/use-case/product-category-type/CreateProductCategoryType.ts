import { ForbiddenError } from '../../../model/Errors';
import Table from '../../../model/Table';
import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateProductCategoryType extends CreateUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository, uniqueVal: string) {
    super(repository, new Table('product_category_type', 'name', uniqueVal));
  }

  async execute(
    param: ProductCategoryType,
    tableName?: string | undefined
  ): Promise<ProductCategoryType[]> {
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
