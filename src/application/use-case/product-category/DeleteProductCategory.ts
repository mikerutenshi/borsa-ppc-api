import { ForbiddenError, NotFoundError } from '../../../model/Errors';
import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteProductCategory extends DeleteUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository);
  }

  async execute(params: ProductCategory[]): Promise<void> {
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
        throw new NotFoundError(`Product Category ${p.id}`);
      }

      super.execute(params);
    });
  }
}
