import { ForbiddenError, NotFoundError } from '../../../model/Errors';
import { ProductCategoryType } from '../../../model/Types';
import ProductCategoryTypeRepository from '../../contract/ProductCategoryTypeRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteProductCategoryType extends DeleteUseCase<ProductCategoryType> {
  constructor(repository: ProductCategoryTypeRepository) {
    super(repository);
  }

  async execute(params: ProductCategoryType[]): Promise<void> {
    const ids: number[] = [];

    params.forEach(async (p) => {
      const itemFound = await this.getRepository().getOneByProperty(
        'id',
        p.id.toString()
      );

      if (itemFound) {
        const children = await this.getRepository().getOneByProperty(
          'parent_id',
          p.id.toString()
        );

        if (children) {
          throw new ForbiddenError(
            `Child table present. Please remove them first.`
          );
        } else {
          ids.push(p.id);
        }
      } else {
        throw new NotFoundError(`Product Category Type ${p.id}`);
      }

      super.execute(params);
    });
  }
}
