import { ForbiddenError } from '../../../model/Errors';
import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateProductCategoryType extends UpdateUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository) {
    super(repository);
  }

  async execute(param: ProductCategoryType): Promise<ProductCategoryType[]> {
    if (param.parent_id) {
      const parentExists = await this.getRepository().getOneById(
        param.parent_id
      );
      if (parentExists) {
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
