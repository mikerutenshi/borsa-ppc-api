import { ForbiddenError, NotFoundError } from '../../../model/Errors';
import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteProductCategoryType extends DeleteUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository) {
    super(repository);
  }

  async execute(ids: number[]): Promise<void> {
    for (const id of ids) {
      const itemFound = await this.getRepository().getOneById(id);

      if (itemFound) {
        const children = await this.getRepository().getOneByProperty({
          parent_id: id.toString(),
        });

        if (children) {
          throw new ForbiddenError(
            `Child table present. Please remove them first.`
          );
        }
      } else {
        throw new NotFoundError(`Product Category Type ${id}`);
      }
    }
    super.execute(ids, new ProductCategoryType('', null));
  }
}
