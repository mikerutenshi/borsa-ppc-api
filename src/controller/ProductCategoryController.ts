import { Request, Response } from 'express';
import CreateProductCategory from '../application/use-case/product-category/CreateProductCategory';
import DeleteProductCategory from '../application/use-case/product-category/DeleteProductCategory';
import GetFilteredProductCategories from '../application/use-case/product-category/GetFilteredProductCategories';
import GetProductCategories from '../application/use-case/product-category/GetProductCategories';
import GetProductCategory from '../application/use-case/product-category/GetProductCategory';
import UpdateProductCategory from '../application/use-case/product-category/UpdateProductCategory';
import ProjectDependencies from '../di/ProjectDependencies';
import { ProductCategory } from '../model/Products';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';

export default (dependencies: ProjectDependencies) => {
  const { productCategoryRepository } = dependencies.databaseService;

  const createProductCategory = async (req: Request, res: Response) => {
    const input = new ProductCategory(
      req.body.name,
      req.body.parent_id,
      req.body.product_category_type_id
    );

    const result = await new CreateProductCategory(
      productCategoryRepository,
      input.name
    ).execute(input);

    const message = 'New product category is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getProductCategories = async (req: Request, res: Response) => {
    if (req.query.search_key === undefined) {
      const results = await new GetProductCategories(
        productCategoryRepository
      ).execute();
      const message = 'All product categories are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const key = req.query.search_key;
      const value = req.query.search_value;
      const results = await new GetFilteredProductCategories(
        productCategoryRepository
      ).execute(key as string, value as string);
      const message = 'Filtered product categories are loaded';
      res.json(new SuccessfulResponse(message, results));
    }
  };

  const getProductCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await new GetProductCategory(
      productCategoryRepository
    ).execute(id);
    const message = 'Product category is loaded';
    res.json(new SuccessfulResponse(message, result));
  };

  const updateProductCategory = async (req: Request, res: Response) => {
    const newData = new ProductCategory(
      req.body.name,
      req.body.parent_id,
      req.body.product_category_type_id
    );
    newData.id = parseInt(req.params.id);
    const result = await new UpdateProductCategory(
      productCategoryRepository,
      newData.name
    ).execute(newData);
    const message = 'Product category is updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteProductCategory = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await new DeleteProductCategory(productCategoryRepository).execute(id);
    const message = 'Product category is deleted';
    res.json(new SuccessfulResponse(message));
  };

  return {
    createProductCategory,
    getProductCategories,
    getProductCategory,
    updateProductCategory,
    deleteProductCategory,
  };
};
