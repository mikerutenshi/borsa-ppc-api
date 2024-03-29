import { ForbiddenError } from '../../../model/Errors';
import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import CreateUseCase from '../CreateUseCase';

export default class CreateProductCategory extends CreateUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository);
  }

  async execute(param: ProductCategory): Promise<ProductCategory[]> {
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
