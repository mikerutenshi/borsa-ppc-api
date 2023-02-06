import { ForbiddenError, NotFoundError } from '../../../model/Errors';
import { ProductCategoryType } from '../../../model/Types';
import { logger } from '../../../util/Logger';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteProductCategoryType extends DeleteUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository) {
    super(repository, 'product_category_type');
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
