import { ConflictError } from '../../../model/Errors';
import { Product, ProductCategory } from '../../../model/Products';
import ProductCategoryRepository from '../../contract/ProductCategoryRepository';
import UseCase from '../UseCase';

export default class CreateProductCategory extends UseCase<
  ProductCategory,
  ProductCategory[]
> {
  private repository: ProductCategoryRepository;

  constructor(repository: ProductCategoryRepository) {
    super();
    this.repository = repository;
  }

  async execute(
    param: ProductCategory,
    ...args: any[]
  ): Promise<ProductCategory[]> {
    const productCat = await this.repository.getOneByProp('name', param.name);

    if (productCat) {
      throw new ConflictError('Product Category');
    } else {
      return [await this.repository.create(param)];
    }
  }
}
