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
