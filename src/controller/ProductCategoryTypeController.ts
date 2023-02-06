import { Request, Response } from 'express';
import CreateProductCategoryType from '../application/use-case/product-category-type/CreateProductCategoryType';
import DeleteProductCategoryType from '../application/use-case/product-category-type/DeleteProductCategoryType';
import GetFilteredProductCategoryTypes from '../application/use-case/product-category-type/GetFilteredProductCategoryTypes';
import GetProductCategoryType from '../application/use-case/product-category-type/GetProductCategoryType';
import GetProductCategoryTypes from '../application/use-case/product-category-type/GetProductCategoryTypes';
import UpdateProductCategoryType from '../application/use-case/product-category-type/UpdateProductCategoryType';
import ProjectDependencies from '../di/ProjectDependencies';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';
import { ProductCategoryType } from '../model/Types';

export default (dependencies: ProjectDependencies) => {
  const { productCategoryTypeRepository } = dependencies.databaseService;

  const createProductCategoryType = async (req: Request, res: Response) => {
    const newProductCatType = new ProductCategoryType(
      req.body.name,
      req.body.parent_id
    );
    const result = await new CreateProductCategoryType(
      productCategoryTypeRepository,
      newProductCatType.name
    ).execute(newProductCatType);

    const message = 'New product category is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getProductCategoryTypes = async (req: Request, res: Response) => {
    if (req.query.search_key === undefined) {
      const results = await new GetProductCategoryTypes(
        productCategoryTypeRepository
      ).execute();
      const message = 'All product category types are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const key = req.query.search_key;
      const value = req.query.search_value;
      const results = await new GetFilteredProductCategoryTypes(
        productCategoryTypeRepository
      ).execute(key as string, value as string);
      const message = 'Filtered product category types are loaded';
      res.json(new SuccessfulResponse(message, results));
    }
  };

  const getProductCategoryType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await new GetProductCategoryType(
      productCategoryTypeRepository
    ).execute(id);
    const message = 'Product category type is loaded';
    res.json(new SuccessfulResponse(message, result));
  };

  const updateProductCategoryType = async (req: Request, res: Response) => {
    const newData = new ProductCategoryType(req.body.name, req.body.parent_id);
    newData.id = parseInt(req.params.id);
    const result = await new UpdateProductCategoryType(
      productCategoryTypeRepository,
      newData.name
    ).execute(newData);
    const message = 'Product category type is successfully updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteProductCategoryType = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await new DeleteProductCategoryType(productCategoryTypeRepository).execute(
      id
    );
    const message = 'Product category type is deleted';
    res.json(new SuccessfulResponse(message));
  };
  return {
    createProductCategoryType,
    getProductCategoryTypes,
    getProductCategoryType,
    updateProductCategoryType,
    deleteProductCategoryType,
  };
};
