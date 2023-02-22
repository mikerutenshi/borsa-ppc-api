import { ForbiddenError, NotFoundError } from '../../../model/Errors';
import { ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import DeleteUseCase from '../DeleteUseCase';

export default class DeleteProductCategory extends DeleteUseCase<ProductCategory> {
  constructor(repository: ProductCategoryRepository) {
    super(repository);
  }

  async execute(ids: number[], model: ProductCategory): Promise<void> {
    ids.forEach(async (id) => {
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
        throw new NotFoundError(`Product Category ${id}`);
      }
    });
    super.execute(ids, new ProductCategory('', null, 0));
  }
}
