import { ForbiddenError, NotFoundError } from '../../../model/Errors';
import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteProductCategory extends DeleteUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository, 'product_category');
  }

  async execute(id: number, tableName?: string | undefined): Promise<void> {
    const param = await this.getRepository().getOneByProp('id', id.toString());
    if (param) {
      const children = await this.getRepository().getOneByProp(
        'parent_id',
        param.id.toString()
      );
      if (!children) {
        super.execute(id, tableName);
      } else {
        throw new ForbiddenError(
          `Child table present. Please remove them first.`
        );
      }
    } else {
      throw new NotFoundError(`Product Category Type ${id}`);
    }
  }
}
