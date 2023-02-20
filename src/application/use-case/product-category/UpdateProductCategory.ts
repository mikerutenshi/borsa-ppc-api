import { ForbiddenError } from '../../../model/Errors';
import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import UpdateUseCase from '../UpdateUseCase';

export default class UpdateProductCategory extends UpdateUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository);
  }

  async execute(param: ProductCategory): Promise<ProductCategory[]> {
    if (param.parent_id) {
      const parentExists = await this.getRepository().getOneByProperty(
        'id',
        param.parent_id.toString()
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
