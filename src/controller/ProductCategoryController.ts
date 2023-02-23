import { Request, Response } from 'express';
import CreateProductCategory from '../application/use-case/product-category/CreateProductCategory';
import DeleteProductCategory from '../application/use-case/product-category/DeleteProductCategory';
import GetAllProductCategories from '../application/use-case/product-category/GetAllProductCategories';
import GetProductCategories from '../application/use-case/product-category/GetProductCategories';
import GetProductCategory from '../application/use-case/product-category/GetProductCategory';
import UpdateProductCategory from '../application/use-case/product-category/UpdateProductCategory';
import ProjectDependencies from '../di/ProjectDependencies';
import { ProductCategory } from '../model/Products';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { productCategoryRepository } = dependencies.databaseService;

  const createProductCategory = async (req: Request, res: Response) => {
    const input = new ProductCategory(
      req.body.name,
      req.body.parent_id,
      req.body.product_category_type_id
    );

    const result = await new CreateProductCategory(
      productCategoryRepository
    ).execute(input);

    const message = 'New product category is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getProductCategories = async (req: Request, res: Response) => {
    if (req.query) {
      const params = createParamsFromReq(req, ['name']);
      const results = await new GetProductCategories(
        productCategoryRepository
      ).execute(params);
      const message = 'Product categories are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const results = await new GetAllProductCategories(
        productCategoryRepository
      ).execute();
      const message = 'All product categories are loaded';
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
      productCategoryRepository
    ).execute(newData);
    const message = 'Product category is updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteProductCategory = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    await new DeleteProductCategory(productCategoryRepository).execute(ids);
    const message = 'Selected product categories are deleted';
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
