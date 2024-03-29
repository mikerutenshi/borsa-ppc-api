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
      const parentTable = await this.getRepository().getOneById(
        param.parent_id
      );
      if (!parentTable) {
        throw new ForbiddenError(
          'Parent id does not exist. Please create it first'
        );
      }
    }

    return super.execute(param);
  }
}
