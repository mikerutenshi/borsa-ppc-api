import { ForbiddenError } from '../../../model/Errors';
import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateProductCategoryType extends CreateUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository) {
    super(repository);
  }

  async execute(param: ProductCategoryType): Promise<ProductCategoryType[]> {
    if (param.parent_id) {
      const parentTable = await this.getRepository().getOneByProperty(
        'id',
        param.parent_id.toString()
      );
      if (parentTable) {
        return super.execute(param);
      } else {
        throw new ForbiddenError(
          'Parent id does not exist. Please create it first'
        );
      }
    } else {
      return super.execute(param);
    }
  }
}
