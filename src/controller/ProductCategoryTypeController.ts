import { Request, Response } from 'express';
import CreateProductCategoryType from '../application/use-case/product-category-type/CreateProductCategoryType';
import DeleteProductCategoryType from '../application/use-case/product-category-type/DeleteProductCategoryType';
import GetAllProductCategoryTypes from '../application/use-case/product-category-type/GetAllProductCategoryTypes';
import GetProductCategoryType from '../application/use-case/product-category-type/GetProductCategoryType';
import GetProductCategoryTypes from '../application/use-case/product-category-type/GetProductCategoryTypes';
import UpdateProductCategoryType from '../application/use-case/product-category-type/UpdateProductCategoryType';
import ProjectDependencies from '../di/ProjectDependencies';
import { CreatedResponse, SuccessfulResponse } from '../model/Responses';
import { ProductCategoryType } from '../model/Types';
import { createParamsFromReq, getIdsFromReq } from '../util/FilterUtil';

export default (dependencies: ProjectDependencies) => {
  const { productCategoryTypeRepository } = dependencies.databaseService;

  const createProductCategoryType = async (req: Request, res: Response) => {
    const newProductCatType = new ProductCategoryType(
      req.body.name,
      req.body.parent_id
    );
    const result = await new CreateProductCategoryType(
      productCategoryTypeRepository
    ).execute(newProductCatType);

    const message = 'New product category type is created';
    res.status(201).json(new CreatedResponse(message, result));
  };

  const getProductCategoryTypes = async (req: Request, res: Response) => {
    const params = createParamsFromReq(req, ['name']);
    if (req.query) {
      const results = await new GetProductCategoryTypes(
        productCategoryTypeRepository
      ).execute(params);
      const message = 'Product category types are loaded';
      res.json(new SuccessfulResponse(message, results));
    } else {
      const results = await new GetAllProductCategoryTypes(
        productCategoryTypeRepository
      ).execute();
      const message = 'All product category types are loaded';
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
      productCategoryTypeRepository
    ).execute(newData);
    const message = 'Product category type is successfully updated';
    res.json(new SuccessfulResponse(message, result));
  };

  const deleteProductCategoryType = async (req: Request, res: Response) => {
    const ids = getIdsFromReq(req);
    await new DeleteProductCategoryType(productCategoryTypeRepository).execute(
      ids
    );
    const message = 'Selected product category types are deleted';
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
